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
      to: 'mohammed81310@gmail.com',
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
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
      line-height: 1.6; 
      color: #1a1a1a; 
      background: #f8f9fa;
    }
    .container { 
      max-width: 600px; 
      margin: 20px auto; 
      background: white;
      border-radius: 12px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      overflow: hidden;
    }
    .header { 
      background: linear-gradient(135deg, #0047AB 0%, #003d8f 100%);
      color: white; 
      padding: 30px 20px; 
      text-align: center;
    }
    .header h1 { 
      font-size: 24px; 
      font-weight: 600;
      margin-bottom: 8px;
      letter-spacing: -0.5px;
    }
    .header p { 
      font-size: 14px; 
      opacity: 0.9;
      font-weight: 400;
    }
    .content { 
      padding: 30px 20px; 
      background: #ffffff;
    }
    .section-title {
      font-size: 18px;
      font-weight: 600;
      color: #0047AB;
      margin-bottom: 20px;
      padding-bottom: 8px;
      border-bottom: 2px solid #0047AB;
    }
    .detail-grid {
      display: grid;
      grid-template-columns: 140px 1fr;
      gap: 15px;
      margin-bottom: 8px;
      padding: 16px;
      border-bottom: 1px solid #e9ecef;
      background: #f8f9fa;
      border-radius: 8px;
      transition: all 0.2s ease;
    }
    .detail-grid:hover {
      background: #e9ecef;
      transform: translateY(-1px);
    }
    .detail-grid:last-child {
      border-bottom: none;
    }
    .label { 
      font-weight: 600; 
      color: #0047AB;
      font-size: 14px;
    }
    .value {
      color: #2c3e50;
      font-size: 14px;
      font-weight: 500;
    }
    .cta-section {
      text-align: center; 
      margin: 30px 0;
      padding: 25px;
      background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
      border-radius: 12px;
      border: 1px solid #dee2e6;
    }
    .cta-button {
      display: inline-block;
      background: linear-gradient(135deg, #0047AB 0%, #003d8f 100%);
      color: white; 
      padding: 14px 28px; 
      text-decoration: none; 
      border-radius: 8px;
      font-weight: 600;
      font-size: 15px;
      transition: all 0.3s ease;
      box-shadow: 0 4px 8px rgba(0, 71, 171, 0.2);
    }
    .cta-button:hover {
      transform: translateY(-2px);
      box-shadow: 0 6px 12px rgba(0, 71, 171, 0.3);
    }
    .footer { 
      text-align: center; 
      color: #6c757d; 
      font-size: 12px; 
      padding: 25px 20px;
      background: #f8f9fa;
      border-top: 1px solid #e9ecef;
    }
    .footer p { 
      margin: 4px 0;
    }
    .priority-badge {
      display: inline-block;
      background: #dc3545;
      color: white;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 11px;
      font-weight: 600;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Nieuwe Vastgoed Melding</h1>
      <p>Leegstandmeldpunt.nl - Professioneel Vastgoed Platform</p>
    </div>
    
    <div class="content">
      <h2 class="section-title">Melding Details</h2>
      
      <div class="detail-grid">
        <span class="label">Adres:</span>
        <span class="value">${melding.address}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Postcode:</span>
        <span class="value">${melding.postalCode || 'Niet verstrekt'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Plaats:</span>
        <span class="value">${melding.city || 'Niet verstrekt'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Type Vastgoed:</span>
        <span class="value">${melding.type}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Duur Leegstand:</span>
        <span class="value">${melding.vacancyDuration || 'Onbekend'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Melder:</span>
        <span class="value">${melding.reporterName || 'Anoniem'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Email:</span>
        <span class="value">${melding.reporterEmail || 'Niet verstrekt'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Telefoon:</span>
        <span class="value">${melding.reporterPhone || 'Niet verstrekt'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Omschrijving:</span>
        <span class="value">${melding.description || 'Geen omschrijving'}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Datum:</span>
        <span class="value">${melding.date}</span>
      </div>
      
      <div class="detail-grid">
        <span class="label">Referentie ID:</span>
        <span class="value">#${melding.id}</span>
      </div>
    </div>
    
    <div class="cta-section">
      <h3 style="margin-bottom: 12px; color: #1a1a1a; font-size: 16px;">Bekijk Details in Portaal</h3>
      <a href="https://leegstandmeldpunt.nl/portaal" class="cta-button">
        Naar Portaal
      </a>
    </div>
    
    <div class="footer">
      <p><strong>Leegstandmeldpunt.nl</strong></p>
      <p>Professioneel Vastgoed Platform Nederland</p>
      <p>© 2024 Alle rechten voorbehouden</p>
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
        message: 'Email verstuurd naar mohammed81310@gmail.com',
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
