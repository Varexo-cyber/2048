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
    
    // Email versturen
    console.log('Sending email...')
    const result = await transporter.sendMail(mailOptions)
    console.log('Email sent successfully:', result.messageId)
    
    return {
      statusCode: 200,
      body: JSON.stringify({ 
        success: true, 
        message: 'Email verstuurd naar info@varexo.nl',
        messageId: result.messageId
      })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
