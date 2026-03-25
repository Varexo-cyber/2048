import { useState, useEffect, useCallback } from 'react'
import {
  Mail,
  Inbox,
  Send,
  Trash2,
  AlertOctagon,
  Star,
  Search,
  RefreshCw,
  PenSquare,
  X,
  Paperclip,
  Clock,
  LogIn,
  LogOut,
  Loader2,
  MailOpen,
  Reply,
  ChevronLeft
} from 'lucide-react'
import Toast from '../components/Toast'
import * as Gmail from '../services/gmailService'
import type { GmailMessage, GmailLabel } from '../services/gmailService'

type Folder = 'INBOX' | 'SENT' | 'DRAFT' | 'SPAM' | 'TRASH' | 'STARRED'

interface ComposeData {
  to: string
  subject: string
  body: string
}

const MailboxPage = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isInitializing, setIsInitializing] = useState(true)
  const [userEmail, setUserEmail] = useState('')
  
  const [currentFolder, setCurrentFolder] = useState<Folder>('INBOX')
  const [messages, setMessages] = useState<GmailMessage[]>([])
  const [selectedMessage, setSelectedMessage] = useState<GmailMessage | null>(null)
  const [labels, setLabels] = useState<GmailLabel[]>([])
  const [searchQuery, setSearchQuery] = useState('')
  
  const [showCompose, setShowCompose] = useState(false)
  const [showReply, setShowReply] = useState(false)
  const [composeData, setComposeData] = useState<ComposeData>({ to: '', subject: '', body: '' })
  const [isSending, setIsSending] = useState(false)
  
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null)
  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type })
  }

  // Initialize Google API
  useEffect(() => {
    const init = async () => {
      try {
        await Gmail.initGapiClient()
        await Gmail.initTokenClient()
      } catch (error) {
        console.error('Failed to initialize Google API:', error)
      } finally {
        setIsInitializing(false)
      }
    }
    init()
  }, [])

  // Fetch messages when folder changes
  const loadMessages = useCallback(async () => {
    if (!isAuthenticated) return
    setIsLoading(true)
    try {
      const msgs = await Gmail.fetchMessages(currentFolder, 30, searchQuery)
      setMessages(msgs)
      const lbls = await Gmail.fetchLabels()
      setLabels(lbls)
    } catch (error) {
      console.error('Error loading messages:', error)
      showToast('Fout bij laden van berichten', 'error')
    } finally {
      setIsLoading(false)
    }
  }, [isAuthenticated, currentFolder, searchQuery])

  useEffect(() => {
    loadMessages()
  }, [loadMessages])

  // Sign in
  const handleSignIn = async () => {
    try {
      setIsLoading(true)
      await Gmail.signIn()
      setIsAuthenticated(true)
      const profile = await Gmail.getUserProfile()
      setUserEmail(profile.email)
      showToast(`Ingelogd als ${profile.email}`, 'success')
    } catch (error) {
      console.error('Sign in error:', error)
      showToast('Inloggen mislukt. Probeer opnieuw.', 'error')
    } finally {
      setIsLoading(false)
    }
  }

  // Sign out
  const handleSignOut = () => {
    Gmail.signOut()
    setIsAuthenticated(false)
    setUserEmail('')
    setMessages([])
    setSelectedMessage(null)
    setLabels([])
    showToast('Uitgelogd', 'info')
  }

  // Open message
  const handleOpenMessage = async (msg: GmailMessage) => {
    setSelectedMessage(msg)
    if (!msg.isRead) {
      await Gmail.markAsRead(msg.id)
      setMessages(prev => prev.map(m => m.id === msg.id ? { ...m, isRead: true } : m))
    }
  }

  // Trash message
  const handleTrash = async (msgId: string) => {
    await Gmail.trashMessage(msgId)
    setMessages(prev => prev.filter(m => m.id !== msgId))
    if (selectedMessage?.id === msgId) setSelectedMessage(null)
    showToast('Bericht verwijderd', 'success')
  }

  // Send email
  const handleSend = async () => {
    if (!composeData.to.trim()) {
      showToast('Vul een ontvanger in', 'warning')
      return
    }
    if (!composeData.subject.trim()) {
      showToast('Vul een onderwerp in', 'warning')
      return
    }
    
    setIsSending(true)
    const success = await Gmail.sendEmail(composeData.to, composeData.subject, composeData.body)
    setIsSending(false)
    
    if (success) {
      showToast('E-mail verzonden!', 'success')
      setShowCompose(false)
      setComposeData({ to: '', subject: '', body: '' })
      if (currentFolder === 'SENT') loadMessages()
    } else {
      showToast('Verzenden mislukt', 'error')
    }
  }

  // Reply to email
  const handleReply = async () => {
    if (!selectedMessage || !composeData.body.trim()) {
      showToast('Schrijf een antwoord', 'warning')
      return
    }
    
    setIsSending(true)
    const success = await Gmail.replyToEmail(selectedMessage, composeData.body)
    setIsSending(false)
    
    if (success) {
      showToast('Antwoord verzonden!', 'success')
      setShowReply(false)
      setComposeData({ to: '', subject: '', body: '' })
    } else {
      showToast('Verzenden mislukt', 'error')
    }
  }

  // Search
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    loadMessages()
  }

  // Format date
  const formatDate = (dateStr: string): string => {
    try {
      const date = new Date(dateStr)
      const now = new Date()
      const isToday = date.toDateString() === now.toDateString()
      
      if (isToday) {
        return date.toLocaleTimeString('nl-NL', { hour: '2-digit', minute: '2-digit' })
      }
      return date.toLocaleDateString('nl-NL', { day: 'numeric', month: 'short' })
    } catch {
      return dateStr
    }
  }

  // Format sender name
  const formatSender = (from: string): string => {
    const match = from.match(/^"?([^"<]+)"?\s*</)
    return match ? match[1].trim() : from.split('@')[0]
  }

  // Get label count
  const getLabelCount = (id: string): number => {
    const label = labels.find(l => l.id === id)
    return label?.messagesUnread || 0
  }

  const folders: { id: Folder; label: string; icon: any }[] = [
    { id: 'INBOX', label: 'Inbox', icon: Inbox },
    { id: 'STARRED', label: 'Belangrijk', icon: Star },
    { id: 'SENT', label: 'Verzonden', icon: Send },
    { id: 'DRAFT', label: 'Concepten', icon: PenSquare },
    { id: 'SPAM', label: 'Spam', icon: AlertOctagon },
    { id: 'TRASH', label: 'Prullenbak', icon: Trash2 }
  ]

  // ============ NOT AUTHENTICATED VIEW ============
  if (!isAuthenticated) {
    return (
      <div style={{ padding: '2rem', minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
        
        <div style={{
          background: 'var(--bg-primary)',
          borderRadius: '16px',
          padding: '3rem',
          boxShadow: 'var(--shadow-xl)',
          textAlign: 'center',
          maxWidth: '500px',
          width: '100%'
        }}>
          <div style={{
            width: '80px',
            height: '80px',
            background: 'linear-gradient(135deg, #4285f4, #34a853)',
            borderRadius: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.5rem'
          }}>
            <Mail size={40} color="white" />
          </div>
          
          <h2 style={{ fontSize: '1.75rem', fontWeight: '700', color: 'var(--text-primary)', marginBottom: '0.75rem' }}>
            Gmail Mailbox
          </h2>
          <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem', lineHeight: '1.6' }}>
            Verbind je Gmail account om je e-mails te bekijken, versturen en beheren vanuit het portaal.
          </p>
          
          <button
            onClick={handleSignIn}
            disabled={isInitializing || isLoading}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '0.75rem',
              width: '100%',
              padding: '1rem 2rem',
              background: isInitializing ? '#ccc' : 'linear-gradient(135deg, #4285f4, #3367d6)',
              color: 'white',
              border: 'none',
              borderRadius: '12px',
              fontSize: '1.1rem',
              fontWeight: '600',
              cursor: isInitializing ? 'wait' : 'pointer',
              transition: 'all 0.3s',
              boxShadow: '0 4px 15px rgba(66, 133, 244, 0.3)'
            }}
          >
            {isInitializing ? (
              <><Loader2 size={22} className="spin" /> Google API laden...</>
            ) : isLoading ? (
              <><Loader2 size={22} className="spin" /> Verbinden...</>
            ) : (
              <><LogIn size={22} /> Inloggen met Google</>
            )}
          </button>
          
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1.5rem' }}>
            Je gegevens worden veilig verwerkt via Google OAuth2.
            <br />Wij slaan geen wachtwoorden op.
          </p>
        </div>
      </div>
    )
  }

  // ============ AUTHENTICATED MAILBOX VIEW ============
  return (
    <div style={{ margin: '-1rem -2rem -2rem -2rem', padding: '0' }}>
      {toast && <Toast message={toast.message} type={toast.type} onClose={() => setToast(null)} />}
      
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
        gap: '0',
        background: 'var(--bg-primary)',
        overflow: 'hidden',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-md)',
        minHeight: 'calc(100vh - 180px)'
      }}>
        
        {/* ========== SIDEBAR ========== */}
        <div className="mailbox-sidebar" style={{
          background: 'var(--bg-secondary)',
          borderRight: '1px solid var(--border)',
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem 0',
          overflow: 'auto'
        }}>
          {/* Compose Button */}
          <div style={{ padding: '0 1rem', marginBottom: '1rem' }}>
            <button
              onClick={() => { setShowCompose(true); setComposeData({ to: '', subject: '', body: '' }) }}
              style={{
                width: '100%',
                padding: '0.875rem 1.25rem',
                background: 'linear-gradient(135deg, var(--accent-primary), #3367d6)',
                color: 'white',
                border: 'none',
                borderRadius: '12px',
                fontSize: '0.95rem',
                fontWeight: '600',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.3s',
                boxShadow: '0 2px 8px rgba(66, 133, 244, 0.3)'
              }}
            >
              <PenSquare size={18} />
              Nieuw bericht
            </button>
          </div>
          
          {/* Folders */}
          <div style={{ flex: 1 }}>
            {folders.map(folder => {
              const Icon = folder.icon
              const isActive = currentFolder === folder.id
              const unread = getLabelCount(folder.id)
              return (
                <button
                  key={folder.id}
                  onClick={() => { setCurrentFolder(folder.id); setSelectedMessage(null) }}
                  style={{
                    width: '100%',
                    padding: '0.75rem 1.25rem',
                    background: isActive ? 'var(--accent-primary-light)' : 'transparent',
                    color: isActive ? 'var(--accent-primary)' : 'var(--text-secondary)',
                    border: 'none',
                    borderLeft: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.75rem',
                    fontSize: '0.9rem',
                    fontWeight: isActive ? '600' : '500',
                    transition: 'all 0.2s',
                    textAlign: 'left'
                  }}
                >
                  <Icon size={18} />
                  <span style={{ flex: 1 }}>{folder.label}</span>
                  {unread > 0 && (
                    <span style={{
                      background: folder.id === 'SPAM' ? '#ef4444' : 'var(--accent-primary)',
                      color: 'white',
                      fontSize: '0.75rem',
                      fontWeight: '700',
                      padding: '0.15rem 0.5rem',
                      borderRadius: '10px',
                      minWidth: '20px',
                      textAlign: 'center'
                    }}>
                      {unread}
                    </span>
                  )}
                </button>
              )
            })}
          </div>
          
          {/* User Info */}
          <div style={{ padding: '1rem', borderTop: '1px solid var(--border)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <div style={{
                width: '32px',
                height: '32px',
                background: 'linear-gradient(135deg, #4285f4, #34a853)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0
              }}>
                <Mail size={16} color="white" />
              </div>
              <div style={{ overflow: 'hidden' }}>
                <p style={{ margin: 0, fontSize: '0.8rem', fontWeight: '600', color: 'var(--text-primary)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {userEmail}
                </p>
              </div>
            </div>
            <button
              onClick={handleSignOut}
              style={{
                width: '100%',
                padding: '0.5rem',
                background: 'transparent',
                color: 'var(--text-secondary)',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                fontSize: '0.8rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              <LogOut size={14} />
              Uitloggen
            </button>
          </div>
        </div>
        
        {/* ============ MAIN CONTENT ============ */}
        <div style={{ display: 'flex', flexDirection: 'column', minHeight: 0, height: '100%' }}>
          
          {/* Toolbar */}
          <div style={{
            padding: '0.75rem 1.25rem',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            background: 'var(--bg-primary)'
          }}>
            {selectedMessage && (
              <button
                onClick={() => setSelectedMessage(null)}
                style={{
                  padding: '0.5rem',
                  background: 'transparent',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <ChevronLeft size={20} />
              </button>
            )}
            
            <form onSubmit={handleSearch} style={{ flex: 1, display: 'flex', gap: '0.5rem' }}>
              <div style={{ flex: 1, position: 'relative' }}>
                <Search size={18} style={{ position: 'absolute', left: '0.75rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
                <input
                  type="text"
                  placeholder="Zoeken in e-mails..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.6rem 0.75rem 0.6rem 2.5rem',
                    border: '1px solid var(--border)',
                    borderRadius: '8px',
                    fontSize: '0.9rem',
                    background: 'var(--bg-secondary)',
                    color: 'var(--text-primary)',
                    outline: 'none'
                  }}
                />
              </div>
            </form>
            
            <button
              onClick={loadMessages}
              disabled={isLoading}
              style={{
                padding: '0.6rem',
                background: 'transparent',
                border: '1px solid var(--border)',
                borderRadius: '8px',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex',
                alignItems: 'center'
              }}
              title="Vernieuwen"
            >
              <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
            </button>
          </div>

          {/* Content Area */}
          <div style={{ flex: 1, overflow: 'auto', minHeight: 0 }}>
            
            {/* Loading */}
            {isLoading && messages.length === 0 && (
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <Loader2 size={24} className="spin" style={{ marginRight: '0.75rem' }} />
                E-mails laden...
              </div>
            )}

            {/* Empty state */}
            {!isLoading && messages.length === 0 && !selectedMessage && (
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '4rem', color: 'var(--text-secondary)' }}>
                <MailOpen size={48} style={{ marginBottom: '1rem', opacity: 0.5 }} />
                <p style={{ fontSize: '1.1rem', fontWeight: '500' }}>Geen berichten</p>
                <p style={{ fontSize: '0.9rem' }}>Er zijn geen e-mails in deze map</p>
              </div>
            )}
            
            {/* ============ MESSAGE LIST ============ */}
            {!selectedMessage && messages.length > 0 && (
              <div>
                {messages.map(msg => (
                  <div
                    key={msg.id}
                    onClick={() => handleOpenMessage(msg)}
                    style={{
                      padding: '0.875rem 1.25rem',
                      borderBottom: '1px solid var(--border)',
                      cursor: 'pointer',
                      background: msg.isRead ? 'var(--bg-primary)' : 'var(--accent-primary-light)',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '0.5rem',
                      transition: 'background 0.15s'
                    }}
                    onMouseEnter={e => {
                      if (msg.isRead) e.currentTarget.style.background = 'var(--bg-secondary)'
                    }}
                    onMouseLeave={e => {
                      e.currentTarget.style.background = msg.isRead ? 'var(--bg-primary)' : 'var(--accent-primary-light)'
                    }}
                  >
                    {/* Sender */}
                    <div style={{
                      fontWeight: msg.isRead ? '400' : '700',
                      color: 'var(--text-primary)',
                      fontSize: '0.9rem',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap'
                    }}>
                      {currentFolder === 'SENT' ? `Aan: ${formatSender(msg.to)}` : formatSender(msg.from)}
                    </div>
                    
                    {/* Subject + Snippet */}
                    <div style={{ overflow: 'hidden', display: 'flex', gap: '0.5rem' }}>
                      <span style={{
                        fontWeight: msg.isRead ? '400' : '600',
                        color: 'var(--text-primary)',
                        fontSize: '0.9rem',
                        whiteSpace: 'nowrap'
                      }}>
                        {msg.subject}
                      </span>
                      <span style={{
                        color: 'var(--text-secondary)',
                        fontSize: '0.85rem',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap'
                      }}>
                        — {msg.snippet}
                      </span>
                    </div>
                    
                    {/* Date + Icons */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexShrink: 0 }}>
                      {msg.hasAttachments && <Paperclip size={14} style={{ color: 'var(--text-secondary)' }} />}
                      <span style={{
                        fontSize: '0.8rem',
                        fontWeight: msg.isRead ? '400' : '600',
                        color: msg.isRead ? 'var(--text-secondary)' : 'var(--text-primary)',
                        whiteSpace: 'nowrap'
                      }}>
                        {formatDate(msg.date)}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            {/* ============ MESSAGE DETAIL ============ */}
            {selectedMessage && (
              <div style={{ padding: '2rem' }}>
                {/* Subject */}
                <h2 style={{ fontSize: '1.5rem', fontWeight: '600', color: 'var(--text-primary)', marginBottom: '1.5rem' }}>
                  {selectedMessage.subject}
                </h2>
                
                {/* Meta */}
                <div style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  justifyContent: 'space-between',
                  marginBottom: '1.5rem',
                  paddingBottom: '1.5rem',
                  borderBottom: '1px solid var(--border)'
                }}>
                  <div>
                    <p style={{ margin: '0 0 0.25rem 0', fontWeight: '600', color: 'var(--text-primary)', fontSize: '0.95rem' }}>
                      {formatSender(selectedMessage.from)}
                    </p>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      {selectedMessage.from}
                    </p>
                    <p style={{ margin: '0.25rem 0 0 0', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      Aan: {selectedMessage.to}
                    </p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                      <Clock size={14} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                      {formatDate(selectedMessage.date)}
                    </span>
                    <button
                      onClick={() => handleTrash(selectedMessage.id)}
                      style={{
                        padding: '0.5rem',
                        background: 'transparent',
                        border: '1px solid var(--border)',
                        borderRadius: '6px',
                        cursor: 'pointer',
                        color: '#ef4444',
                        display: 'flex'
                      }}
                      title="Verwijderen"
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                
                {/* Body */}
                <div
                  style={{
                    color: 'var(--text-primary)',
                    lineHeight: '1.7',
                    fontSize: '0.95rem',
                    maxWidth: '100%',
                    overflow: 'auto',
                    wordBreak: 'break-word'
                  }}
                  dangerouslySetInnerHTML={{ __html: selectedMessage.body }}
                />
                
                {/* Reply Button */}
                <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--border)' }}>
                  <button
                    onClick={() => {
                      setShowReply(true)
                      setComposeData({ to: selectedMessage.from, subject: `Re: ${selectedMessage.subject}`, body: '' })
                    }}
                    style={{
                      padding: '0.75rem 1.5rem',
                      background: 'transparent',
                      border: '1px solid var(--border)',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      color: 'var(--text-primary)',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontSize: '0.9rem',
                      fontWeight: '500',
                      transition: 'all 0.2s'
                    }}
                  >
                    <Reply size={18} />
                    Beantwoorden
                  </button>
                </div>
                
                {/* Reply Form */}
                {showReply && (
                  <div style={{
                    marginTop: '1rem',
                    padding: '1.5rem',
                    background: 'var(--bg-secondary)',
                    borderRadius: '12px',
                    border: '1px solid var(--border)'
                  }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                      <h4 style={{ margin: 0, color: 'var(--text-primary)' }}>Antwoord</h4>
                      <button onClick={() => setShowReply(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--text-secondary)' }}>
                        <X size={18} />
                      </button>
                    </div>
                    <textarea
                      value={composeData.body}
                      onChange={e => setComposeData(prev => ({ ...prev, body: e.target.value }))}
                      placeholder="Typ je antwoord..."
                      rows={6}
                      style={{
                        width: '100%',
                        padding: '0.875rem',
                        border: '1px solid var(--border)',
                        borderRadius: '8px',
                        fontSize: '0.9rem',
                        background: 'var(--bg-primary)',
                        color: 'var(--text-primary)',
                        resize: 'vertical',
                        fontFamily: 'inherit',
                        marginBottom: '1rem'
                      }}
                    />
                    <button
                      onClick={handleReply}
                      disabled={isSending}
                      style={{
                        padding: '0.75rem 1.5rem',
                        background: 'var(--accent-primary)',
                        color: 'white',
                        border: 'none',
                        borderRadius: '8px',
                        cursor: 'pointer',
                        fontSize: '0.9rem',
                        fontWeight: '600',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                      }}
                    >
                      {isSending ? <><Loader2 size={16} className="spin" /> Verzenden...</> : <><Send size={16} /> Verstuur antwoord</>}
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* ============ COMPOSE MODAL ============ */}
      {showCompose && (
        <div style={{
          position: 'fixed',
          bottom: '1rem',
          right: '1rem',
          width: 'min(520px, calc(100vw - 2rem))',
          maxWidth: '100%',
          background: 'var(--bg-primary)',
          borderRadius: '12px',
          boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
          zIndex: 9000,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          animation: 'slideIn 0.3s ease-out'
        }}>
          {/* Header */}
          <div style={{
            padding: '0.875rem 1.25rem',
            background: 'linear-gradient(135deg, #1a1a2e, #16213e)',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <span style={{ fontWeight: '600' }}>Nieuw bericht</span>
            <button onClick={() => setShowCompose(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'white', display: 'flex' }}>
              <X size={18} />
            </button>
          </div>
          
          {/* Form */}
          <div style={{ padding: '1rem 1.25rem' }}>
            <input
              type="email"
              placeholder="Aan"
              value={composeData.to}
              onChange={e => setComposeData(prev => ({ ...prev, to: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.9rem',
                background: 'transparent',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <input
              type="text"
              placeholder="Onderwerp"
              value={composeData.subject}
              onChange={e => setComposeData(prev => ({ ...prev, subject: e.target.value }))}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                borderBottom: '1px solid var(--border)',
                fontSize: '0.9rem',
                background: 'transparent',
                color: 'var(--text-primary)',
                outline: 'none'
              }}
            />
            <textarea
              placeholder="Bericht schrijven..."
              value={composeData.body}
              onChange={e => setComposeData(prev => ({ ...prev, body: e.target.value }))}
              rows={10}
              style={{
                width: '100%',
                padding: '0.75rem',
                border: 'none',
                fontSize: '0.9rem',
                background: 'transparent',
                color: 'var(--text-primary)',
                resize: 'vertical',
                fontFamily: 'inherit',
                outline: 'none',
                minHeight: '200px'
              }}
            />
          </div>
          
          {/* Footer */}
          <div style={{
            padding: '0.875rem 1.25rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center'
          }}>
            <button
              onClick={handleSend}
              disabled={isSending}
              style={{
                padding: '0.75rem 2rem',
                background: 'linear-gradient(135deg, #4285f4, #3367d6)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontSize: '0.9rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                transition: 'all 0.2s'
              }}
            >
              {isSending ? <><Loader2 size={16} className="spin" /> Verzenden...</> : <><Send size={16} /> Versturen</>}
            </button>
            <button
              onClick={() => setShowCompose(false)}
              style={{
                padding: '0.5rem',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                color: 'var(--text-secondary)',
                display: 'flex'
              }}
              title="Verwijderen"
            >
              <Trash2 size={18} />
            </button>
          </div>
        </div>
      )}

      {/* Spinner animation */}
      <style>{`
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  )
}

export default MailboxPage
