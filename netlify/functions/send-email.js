const nodemailer = require('nodemailer')

// Nodemailer transporter configuratie voor Gmail
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@varexo.nl',
    pass: process.env.SMTP_PASSWORD
  }
})

// Twilio configuratie voor WhatsApp
const twilio = require('twilio')
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
)

// WhatsApp ontvangers (jouw twee nummers)
const WHATSAPP_RECIPIENTS = [
  'whatsapp:+31636075966',
  'whatsapp:+31641375900'
]

// WhatsApp bericht formatteren
const formatWhatsAppMessage = (melding) => {
  const reporter = melding.reporterName || 'Anoniem'
  const email = melding.reporterEmail || 'Niet verstrekt'
  const phone = melding.reporterPhone || 'Niet verstrekt'
  
  return `🚨 *NIEUWE LEEGSTAND MELDING*

📍 *Adres:* ${melding.address}
🏙️ *Plaats:* ${melding.city || 'Niet verstrekt'}
🏠 *Type:* ${melding.type || melding.propertyType}
⏱️ *Leegstand:* ${melding.vacancyDuration || 'Onbekend'}

👤 *Melder:* ${reporter}
📧 *Email:* ${email}
📞 *Telefoon:* ${phone}

📝 *Omschrijving:*
${melding.description || 'Geen omschrijving'}

🔢 *Referentie:* #${melding.id || 'Nog niet toegewezen'}
📅 *Datum:* ${melding.date}

Bekijk in portaal: https://leegstandmeldpunt.nl/portaal`
}

exports.handler = async (event, context) => {
  console.log('Function called with:', event.httpMethod)
  
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const melding = JSON.parse(event.body)
    console.log('Melding data:', melding)
    
    // Test SMTP connection
    console.log('Testing SMTP connection...')
    await transporter.verify()
    console.log('SMTP connection successful!')
    
    // Email opstellen
    const mailOptions = {
      from: '"Leegstandmeldpunt" <info@varexo.nl>',
      to: ['info@varexo.nl', 'info@nationaalbeheer.nl'],
      subject: 'Nieuwe Vastgoed Melding - Leegstandmeldpunt.nl',
      html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Nieuwe Vastgoed Melding</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.5; 
      color: #2d3748; 
      background: #f7fafc;
    }
    .wrapper {
      max-width: 600px; 
      margin: 40px auto; 
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header { 
      background: #1a202c;
      color: white; 
      padding: 40px 30px; 
      text-align: center;
    }
    .header h1 { 
      font-size: 28px; 
      font-weight: 600;
      margin-bottom: 8px;
      color: #ffffff;
    }
    .header p { 
      font-size: 14px; 
      color: #a0aec0;
      font-weight: 400;
    }
    .content { 
      padding: 40px 30px; 
      background: #ffffff;
    }
    .intro {
      margin-bottom: 30px;
    }
    .intro p {
      color: #4a5568;
      font-size: 15px;
      line-height: 1.6;
    }
    .detail-box {
      background: #f0fff4;
      border-left: 4px solid #0047AB;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      align-items: flex-start;
      padding: 12px 0;
      border-bottom: 1px solid #e2e8f0;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .label { 
      font-weight: 600; 
      color: #0047AB;
      font-size: 14px;
      min-width: 120px;
    }
    .value {
      color: #2d3748;
      font-size: 14px;
      text-align: right;
      flex: 1;
      margin-left: 20px;
    }
    .highlight {
      background: #ebf8ff;
      padding: 20px;
      border-radius: 8px;
      margin: 24px 0;
    }
    .highlight-title {
      font-size: 16px;
      font-weight: 600;
      color: #0047AB;
      margin-bottom: 12px;
    }
    .cta-section {
      text-align: center; 
      margin: 40px 0 20px;
      padding: 30px;
      background: #f7fafc;
      border-radius: 12px;
    }
    .cta-text {
      font-size: 15px;
      color: #4a5568;
      margin-bottom: 16px;
    }
    .cta-button {
      display: inline-block;
      background: #ffffff;
      color: #0047AB; 
      padding: 14px 32px; 
      text-decoration: none; 
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.2s ease;
      border: 2px solid #0047AB;
    }
    .cta-button:hover {
      background: #f7fafc;
      transform: translateY(-1px);
    }
    .footer { 
      text-align: center; 
      color: #718096; 
      font-size: 13px; 
      padding: 30px;
      background: #f7fafc;
      border-top: 1px solid #e2e8f0;
    }
    .footer-brand {
      font-weight: 600;
      color: #0047AB;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .footer p { 
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Nieuwe Vastgoed Melding</h1>
      <p>Leegstandmeldpunt.nl - Professioneel Vastgoed Platform</p>
    </div>
    
    <div class="content">
      <div class="intro">
        <p>Er is een nieuwe vastgoed melding binnengekomen via het Leegstandmeldpunt platform. Hieronder vindt u alle details van deze melding.</p>
      </div>
      
      <div class="detail-box">
        <div class="detail-row">
          <span class="label">Adres</span>
          <span class="value">${melding.address}</span>
        </div>
        <div class="detail-row">
          <span class="label">Postcode</span>
          <span class="value">${melding.postalCode || 'Niet verstrekt'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Plaats</span>
          <span class="value">${melding.city || 'Niet verstrekt'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Type Vastgoed</span>
          <span class="value">${melding.type}</span>
        </div>
        <div class="detail-row">
          <span class="label">Duur Leegstand</span>
          <span class="value">${melding.vacancyDuration || 'Onbekend'}</span>
        </div>
      </div>
      
      <div class="highlight">
        <div class="highlight-title">Contactgegevens Melder</div>
        <div class="detail-row">
          <span class="label">Naam</span>
          <span class="value">${melding.reporterName || 'Anoniem'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Email</span>
          <span class="value">${melding.reporterEmail || 'Niet verstrekt'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Telefoon</span>
          <span class="value">${melding.reporterPhone || 'Niet verstrekt'}</span>
        </div>
      </div>
      
      <div class="detail-box">
        <div class="detail-row">
          <span class="label">Omschrijving</span>
          <span class="value">${melding.description || 'Geen omschrijving'}</span>
        </div>
        <div class="detail-row">
          <span class="label">Datum</span>
          <span class="value">${melding.date}</span>
        </div>
        <div class="detail-row">
          <span class="label">Referentie ID</span>
          <span class="value">#${melding.id}</span>
        </div>
      </div>
      
      <div class="cta-section">
        <p class="cta-text">Bekijk alle details en beheer deze melding in het portaal</p>
        <a href="https://leegstandmeldpunt.nl/portaal" class="cta-button">
          Bekijk in Portaal
        </a>
      </div>
    </div>
    
    <div class="footer">
      <p class="footer-brand">Leegstandmeldpunt.nl</p>
      <p>Leegstand Melden Platform</p>
      <p>© 2026 Alle rechten voorbehouden</p>
    </div>
  </div>
</body>
</html>`,
    }
    
    // 1. Admin email versturen
    console.log('Sending admin email...')
    const adminResult = await transporter.sendMail(mailOptions)
    console.log('Admin email sent successfully:', adminResult.messageId)
    
    // 2. Bevestigings-email naar melder (alleen als email is opgegeven)
    let reporterResult = null
    if (melding.reporterEmail && melding.reporterEmail.trim() !== '') {
      console.log('Sending confirmation email to reporter:', melding.reporterEmail)
      
      const confirmationMailOptions = {
        from: '"Leegstandmeldpunt" <info@varexo.nl>',
        to: melding.reporterEmail,
        subject: 'Bevestiging van uw leegstand melding - Leegstandmeldpunt.nl',
        html: `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Bevestiging Melding Leegstand</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { 
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      line-height: 1.6; 
      color: #2d3748; 
      background: #f7fafc;
    }
    .wrapper {
      max-width: 600px; 
      margin: 40px auto; 
      background: #ffffff;
      border-radius: 16px;
      box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
      overflow: hidden;
    }
    .header { 
      background: #0047AB;
      color: white; 
      padding: 40px 30px; 
      text-align: center;
    }
    .header h1 { 
      font-size: 26px; 
      font-weight: 600;
      margin-bottom: 8px;
      color: #ffffff;
    }
    .header p { 
      font-size: 14px; 
      color: #e2e8f0;
      font-weight: 400;
    }
    .content { 
      padding: 40px 30px; 
      background: #ffffff;
    }
    .intro {
      margin-bottom: 30px;
      text-align: center;
    }
    .intro h2 {
      color: #0047AB;
      font-size: 22px;
      margin-bottom: 16px;
    }
    .intro p {
      color: #4a5568;
      font-size: 15px;
      line-height: 1.7;
    }
    .highlight-box {
      background: #f0fff4;
      border-left: 4px solid #0047AB;
      border-radius: 8px;
      padding: 24px;
      margin: 24px 0;
    }
    .highlight-box h3 {
      color: #0047AB;
      font-size: 18px;
      margin-bottom: 12px;
    }
    .highlight-box p {
      color: #2d3748;
      font-size: 14px;
      line-height: 1.6;
      margin-bottom: 8px;
    }
    .timeline {
      background: #ebf8ff;
      border-radius: 12px;
      padding: 24px;
      margin: 24px 0;
    }
    .timeline h3 {
      color: #0047AB;
      font-size: 16px;
      margin-bottom: 16px;
      text-align: center;
    }
    .timeline-item {
      display: flex;
      align-items: flex-start;
      margin-bottom: 16px;
      padding: 12px;
      background: white;
      border-radius: 8px;
    }
    .timeline-number {
      background: #0047AB;
      color: white;
      width: 28px;
      height: 28px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      font-size: 14px;
      margin-right: 12px;
      flex-shrink: 0;
    }
    .timeline-text {
      color: #2d3748;
      font-size: 14px;
      line-height: 1.5;
    }
    .compensation-box {
      background: linear-gradient(135deg, #0047AB 0%, #0066CC 100%);
      color: white;
      border-radius: 12px;
      padding: 28px;
      margin: 24px 0;
      text-align: center;
    }
    .compensation-box h3 {
      font-size: 20px;
      margin-bottom: 12px;
    }
    .compensation-amount {
      font-size: 42px;
      font-weight: 700;
      margin: 16px 0;
    }
    .compensation-box p {
      font-size: 14px;
      opacity: 0.95;
      line-height: 1.6;
    }
    .detail-summary {
      background: #f7fafc;
      border-radius: 8px;
      padding: 20px;
      margin: 24px 0;
    }
    .detail-summary h4 {
      color: #2d3748;
      font-size: 14px;
      margin-bottom: 12px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
    .detail-row {
      display: flex;
      justify-content: space-between;
      padding: 8px 0;
      border-bottom: 1px solid #e2e8f0;
      font-size: 14px;
    }
    .detail-row:last-child {
      border-bottom: none;
    }
    .detail-label {
      color: #718096;
    }
    .detail-value {
      color: #2d3748;
      font-weight: 500;
    }
    .contact-section {
      text-align: center;
      margin: 32px 0 20px;
      padding: 24px;
      background: #f7fafc;
      border-radius: 12px;
    }
    .contact-section h4 {
      color: #2d3748;
      font-size: 16px;
      margin-bottom: 12px;
    }
    .contact-section p {
      color: #4a5568;
      font-size: 14px;
      line-height: 1.6;
    }
    .contact-email {
      color: #0047AB;
      font-weight: 600;
      text-decoration: none;
    }
    .footer { 
      text-align: center; 
      color: #718096; 
      font-size: 13px; 
      padding: 30px;
      background: #f7fafc;
      border-top: 1px solid #e2e8f0;
    }
    .footer-brand {
      font-weight: 600;
      color: #0047AB;
      font-size: 14px;
      margin-bottom: 8px;
    }
    .footer p { 
      margin: 4px 0;
    }
  </style>
</head>
<body>
  <div class="wrapper">
    <div class="header">
      <h1>Bedankt voor uw melding!</h1>
      <p>Leegstandmeldpunt.nl - Samen maken we Nederland beter</p>
    </div>
    
    <div class="content">
      <div class="intro">
        <h2>Beste ${melding.reporterName || 'melder'},</h2>
        <p>Hartelijk dank voor het melden van leegstaand vastgoed via Leegstandmeldpunt.nl. Uw melding is succesvol ontvangen en in behandeling genomen. Samen dragen we bij aan een efficiënter gebruik van vastgoed in Nederland.</p>
      </div>
      
      <div class="highlight-box">
        <h3>Wat gebeurt er nu?</h3>
        <p>Ons team gaat direct aan de slag met uw melding. We nemen contact op met de eigenaar van het pand en bekijken de mogelijkheden voor herbestemming of verhuur.</p>
      </div>
      
      <div class="timeline">
        <h3>Uw melding in 3 stappen</h3>
        <div class="timeline-item">
          <div class="timeline-number">1</div>
          <div class="timeline-text">
            <strong>Ontvangst bevestigd</strong><br>
            Uw melding is veilig geregistreerd in ons systeem
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-number">2</div>
          <div class="timeline-text">
            <strong>In behandeling</strong><br>
            Binnen <strong>4 weken</strong> ontvangt u bericht over de status en eventuele vervolgstappen
          </div>
        </div>
        <div class="timeline-item">
          <div class="timeline-number">3</div>
          <div class="timeline-text">
            <strong>Vergoeding</strong><br>
            Bij een succesvolle melding ontvangt u meer informatie over uw €100 vergoeding
          </div>
        </div>
      </div>
      
      <div class="compensation-box">
        <h3>Uw Vergoeding</h3>
        <div class="compensation-amount">€100</div>
        <p>Als uw melding leidt tot een succesvolle match met een nieuwe huurder of eigenaar, ontvangt u een vergoeding van €100. Dit is onze manier om u te bedanken voor uw bijdrage aan een betere vastgoedmarkt.</p>
      </div>
      
      <div class="detail-summary">
        <h4>Samenvatting van uw melding</h4>
        <div class="detail-row">
          <span class="detail-label">Adres:</span>
          <span class="detail-value">${melding.address}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Plaats:</span>
          <span class="detail-value">${melding.city || 'Niet verstrekt'}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Type:</span>
          <span class="detail-value">${melding.type || melding.propertyType}</span>
        </div>
        <div class="detail-row">
          <span class="detail-label">Referentie:</span>
          <span class="detail-value">#${melding.id || 'Nog niet toegewezen'}</span>
        </div>
      </div>
      
      <div class="contact-section">
        <h4>Vragen of opmerkingen?</h4>
        <p>Bij vragen kunt u contact opnemen met<br>
        <a href="mailto:info@leegstandmeldpunt.nl" class="contact-email">info@leegstandmeldpunt.nl</a></p>
      </div>
    </div>
    
    <div class="footer">
      <p class="footer-brand">Leegstandmeldpunt.nl</p>
      <p>Bedankt voor uw bijdrage aan een beter Nederland</p>
      <p>© 2026 Alle rechten voorbehouden</p>
    </div>
  </div>
</body>
</html>`
      }
      
      reporterResult = await transporter.sendMail(confirmationMailOptions)
      console.log('Confirmation email sent successfully:', reporterResult.messageId)
    }
    
    // 3. WhatsApp berichten versturen naar beide nummers
    let whatsappResults = []
    if (process.env.TWILIO_ACCOUNT_SID && process.env.TWILIO_AUTH_TOKEN) {
      try {
        const whatsappMessage = formatWhatsAppMessage(melding)
        
        for (const recipient of WHATSAPP_RECIPIENTS) {
          try {
            const message = await twilioClient.messages.create({
              from: 'whatsapp:+14155238886', // Twilio sandbox nummer (of je eigen verified nummer)
              to: recipient,
              body: whatsappMessage
            })
            console.log('WhatsApp sent to', recipient, ':', message.sid)
            whatsappResults.push({ recipient, sid: message.sid, status: 'sent' })
          } catch (waError) {
            console.error('WhatsApp failed for', recipient, ':', waError.message)
            whatsappResults.push({ recipient, error: waError.message, status: 'failed' })
          }
        }
      } catch (twilioError) {
        console.error('Twilio error:', twilioError.message)
        whatsappResults.push({ error: twilioError.message, status: 'failed' })
      }
    } else {
      console.log('Twilio credentials not configured, skipping WhatsApp')
      whatsappResults.push({ status: 'skipped', reason: 'No credentials' })
    }
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Melding verwerkt',
        adminMessageId: adminResult.messageId,
        reporterMessageId: reporterResult?.messageId || null,
        whatsapp: whatsappResults
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
