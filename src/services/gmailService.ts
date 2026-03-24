/* global google, gapi */

const CLIENT_ID = import.meta.env.VITE_GMAIL_CLIENT_ID
const SCOPES = 'https://www.googleapis.com/auth/gmail.readonly https://www.googleapis.com/auth/gmail.send https://www.googleapis.com/auth/gmail.modify https://www.googleapis.com/auth/gmail.labels'

declare global {
  interface Window {
    google: any
    gapi: any
  }
}

export interface GmailMessage {
  id: string
  threadId: string
  from: string
  to: string
  subject: string
  snippet: string
  body: string
  date: string
  isRead: boolean
  labels: string[]
  hasAttachments: boolean
}

export interface GmailLabel {
  id: string
  name: string
  messagesTotal: number
  messagesUnread: number
  type: string
}

let tokenClient: any = null
let accessToken: string | null = null

// Wait for a script to load
const waitForScript = (check: () => boolean, timeout = 10000): Promise<void> => {
  return new Promise((resolve, reject) => {
    const start = Date.now()
    const interval = setInterval(() => {
      if (check()) {
        clearInterval(interval)
        resolve()
      } else if (Date.now() - start > timeout) {
        clearInterval(interval)
        reject(new Error('Script load timeout'))
      }
    }, 100)
  })
}

// Initialize the Google API client
export const initGapiClient = async (): Promise<void> => {
  await waitForScript(() => !!window.gapi)
  
  return new Promise((resolve, reject) => {
    window.gapi.load('client', async () => {
      try {
        await window.gapi.client.init({
          discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/gmail/v1/rest'],
        })
        resolve()
      } catch (error) {
        reject(error)
      }
    })
  })
}

// Initialize the token client for OAuth2
export const initTokenClient = async (): Promise<void> => {
  await waitForScript(() => !!window.google?.accounts?.oauth2)
  
  return new Promise((resolve) => {
    tokenClient = window.google.accounts.oauth2.initTokenClient({
      client_id: CLIENT_ID,
      scope: SCOPES,
      callback: () => {}, // will be overwritten on each request
    })
    resolve()
  })
}

// Request an access token (triggers Google sign-in popup)
export const signIn = (): Promise<string> => {
  return new Promise((resolve, reject) => {
    if (!tokenClient) {
      reject(new Error('Token client not initialized'))
      return
    }
    
    tokenClient.callback = (response: any) => {
      if (response.error) {
        reject(new Error(response.error))
        return
      }
      accessToken = response.access_token
      resolve(response.access_token)
    }
    
    tokenClient.error_callback = (error: any) => {
      reject(new Error(error.message || 'Sign in failed'))
    }
    
    tokenClient.requestAccessToken({ prompt: 'consent' })
  })
}

// Sign out
export const signOut = (): void => {
  if (accessToken) {
    window.google.accounts.oauth2.revoke(accessToken)
    accessToken = null
  }
}

// Check if signed in
export const isSignedIn = (): boolean => {
  return accessToken !== null
}

// Get user profile
export const getUserProfile = async (): Promise<{ email: string; name: string }> => {
  const response = await window.gapi.client.gmail.users.getProfile({ userId: 'me' })
  return {
    email: response.result.emailAddress,
    name: response.result.emailAddress.split('@')[0]
  }
}

// Helper: decode base64url
const decodeBase64Url = (str: string): string => {
  try {
    const base64 = str.replace(/-/g, '+').replace(/_/g, '/')
    return decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    )
  } catch {
    return str
  }
}

// Helper: get header value from message
const getHeader = (headers: any[], name: string): string => {
  const header = headers.find((h: any) => h.name.toLowerCase() === name.toLowerCase())
  return header ? header.value : ''
}

// Helper: extract body from message parts
const getBody = (payload: any): string => {
  if (payload.body?.data) {
    return decodeBase64Url(payload.body.data)
  }
  
  if (payload.parts) {
    // Prefer HTML
    const htmlPart = payload.parts.find((p: any) => p.mimeType === 'text/html')
    if (htmlPart?.body?.data) {
      return decodeBase64Url(htmlPart.body.data)
    }
    
    // Fallback to plain text
    const textPart = payload.parts.find((p: any) => p.mimeType === 'text/plain')
    if (textPart?.body?.data) {
      const text = decodeBase64Url(textPart.body.data)
      return text.replace(/\n/g, '<br>')
    }
    
    // Check nested parts (multipart/alternative inside multipart/mixed)
    for (const part of payload.parts) {
      if (part.parts) {
        const nested = getBody(part)
        if (nested) return nested
      }
    }
  }
  
  return '<p>Kan inhoud niet weergeven</p>'
}

// Parse a Gmail message into our format
const parseMessage = (message: any): GmailMessage => {
  const headers = message.payload?.headers || []
  const labels = message.labelIds || []
  
  const hasAttachments = message.payload?.parts?.some(
    (p: any) => p.filename && p.filename.length > 0
  ) || false
  
  return {
    id: message.id,
    threadId: message.threadId,
    from: getHeader(headers, 'From'),
    to: getHeader(headers, 'To'),
    subject: getHeader(headers, 'Subject') || '(Geen onderwerp)',
    snippet: message.snippet || '',
    body: getBody(message.payload),
    date: getHeader(headers, 'Date'),
    isRead: !labels.includes('UNREAD'),
    labels,
    hasAttachments
  }
}

// Fetch messages from a label/folder
export const fetchMessages = async (
  labelId: string = 'INBOX',
  maxResults: number = 30,
  query: string = ''
): Promise<GmailMessage[]> => {
  try {
    const params: any = {
      userId: 'me',
      maxResults,
      labelIds: labelId !== 'ALL' ? [labelId] : undefined,
      q: query || undefined
    }
    
    const listResponse = await window.gapi.client.gmail.users.messages.list(params)
    const messages = listResponse.result.messages || []
    
    // Fetch full message details in parallel (batches of 10)
    const results: GmailMessage[] = []
    for (let i = 0; i < messages.length; i += 10) {
      const batch = messages.slice(i, i + 10)
      const details = await Promise.all(
        batch.map((msg: any) =>
          window.gapi.client.gmail.users.messages.get({
            userId: 'me',
            id: msg.id,
            format: 'full'
          })
        )
      )
      results.push(...details.map((d: any) => parseMessage(d.result)))
    }
    
    return results
  } catch (error) {
    console.error('Error fetching messages:', error)
    return []
  }
}

// Fetch a single message by ID
export const fetchMessage = async (messageId: string): Promise<GmailMessage | null> => {
  try {
    const response = await window.gapi.client.gmail.users.messages.get({
      userId: 'me',
      id: messageId,
      format: 'full'
    })
    return parseMessage(response.result)
  } catch (error) {
    console.error('Error fetching message:', error)
    return null
  }
}

// Mark message as read
export const markAsRead = async (messageId: string): Promise<void> => {
  try {
    await window.gapi.client.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      resource: {
        removeLabelIds: ['UNREAD']
      }
    })
  } catch (error) {
    console.error('Error marking as read:', error)
  }
}

// Mark message as unread
export const markAsUnread = async (messageId: string): Promise<void> => {
  try {
    await window.gapi.client.gmail.users.messages.modify({
      userId: 'me',
      id: messageId,
      resource: {
        addLabelIds: ['UNREAD']
      }
    })
  } catch (error) {
    console.error('Error marking as unread:', error)
  }
}

// Trash a message
export const trashMessage = async (messageId: string): Promise<void> => {
  try {
    await window.gapi.client.gmail.users.messages.trash({
      userId: 'me',
      id: messageId
    })
  } catch (error) {
    console.error('Error trashing message:', error)
  }
}

// Send an email
export const sendEmail = async (
  to: string,
  subject: string,
  body: string
): Promise<boolean> => {
  try {
    const email = [
      `To: ${to}`,
      `Subject: ${subject}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      body
    ].join('\r\n')
    
    const encodedEmail = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
    
    await window.gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: encodedEmail
      }
    })
    
    return true
  } catch (error) {
    console.error('Error sending email:', error)
    return false
  }
}

// Reply to an email
export const replyToEmail = async (
  originalMessage: GmailMessage,
  replyBody: string
): Promise<boolean> => {
  try {
    const email = [
      `To: ${originalMessage.from}`,
      `Subject: Re: ${originalMessage.subject}`,
      `In-Reply-To: ${originalMessage.id}`,
      `References: ${originalMessage.id}`,
      'Content-Type: text/html; charset=utf-8',
      'MIME-Version: 1.0',
      '',
      replyBody
    ].join('\r\n')
    
    const encodedEmail = btoa(unescape(encodeURIComponent(email)))
      .replace(/\+/g, '-')
      .replace(/\//g, '_')
      .replace(/=+$/, '')
    
    await window.gapi.client.gmail.users.messages.send({
      userId: 'me',
      resource: {
        raw: encodedEmail,
        threadId: originalMessage.threadId
      }
    })
    
    return true
  } catch (error) {
    console.error('Error replying to email:', error)
    return false
  }
}

// Get labels with message counts
export const fetchLabels = async (): Promise<GmailLabel[]> => {
  try {
    const response = await window.gapi.client.gmail.users.labels.list({ userId: 'me' })
    const labels = response.result.labels || []
    
    // Fetch details for system labels
    const systemLabels = ['INBOX', 'SENT', 'DRAFT', 'SPAM', 'TRASH', 'STARRED']
    const details = await Promise.all(
      labels
        .filter((l: any) => systemLabels.includes(l.id))
        .map((l: any) =>
          window.gapi.client.gmail.users.labels.get({
            userId: 'me',
            id: l.id
          })
        )
    )
    
    return details.map((d: any) => ({
      id: d.result.id,
      name: d.result.name,
      messagesTotal: d.result.messagesTotal || 0,
      messagesUnread: d.result.messagesUnread || 0,
      type: d.result.type
    }))
  } catch (error) {
    console.error('Error fetching labels:', error)
    return []
  }
}
