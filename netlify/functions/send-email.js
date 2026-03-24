const nodemailer = require('nodemailer')

// Nodemailer transporter configuratie voor varexo.nl
const transporter = nodemailer.createTransporter({
  host: process.env.SMTP_HOST || 'mail.varexo.nl',
  port: process.env.SMTP_PORT || 587,
  secure: false,
  auth: {
    user: process.env.SMTP_USER || 'info@varexo.nl',
    pass: process.env.SMTP_PASSWORD
  },
  tls: {
    rejectUnauthorized: false
  }
})

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' }
  }

  try {
    const melding = JSON.parse(event.body)
    
    // Email opstellen
    const mailOptions = {
      from: '"Leegstandmeldpunt" <info@varexo.nl>',
      to: 'mohammed81310@gmail.com',
      subject: '🚨 Nieuwe Leegstand Melding - Leegstandmeldpunt.nl',
      html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 600px; margin: 0 auto; padding: 20px; }
    .header { background: #0047AB; color: white; padding: 20px; text-align: center; }
    .content { background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; }
    .detail-row { margin: 10px 0; padding: 8px 0; border-bottom: 1px solid #eee; }
    .label { font-weight: bold; color: #0047AB; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>🚨 Nieuwe Leegstand Melding</h1>
    </div>
    <div class="content">
      <div class="detail-row"><span class="label">🏠 Adres:</span> ${melding.address}</div>
      <div class="detail-row"><span class="label">📍 Postcode:</span> ${melding.postalCode || 'Niet verstrekt'}</div>
      <div class="detail-row"><span class="label">🏙️ Plaats:</span> ${melding.city || 'Niet verstrekt'}</div>
      <div class="detail-row"><span class="label">🏢 Type:</span> ${melding.type}</div>
      <div class="detail-row"><span class="label">⏰ Duur:</span> ${melding.vacancyDuration || 'Onbekend'}</div>
      <div class="detail-row"><span class="label">👤 Melder:</span> ${melding.reporterName || 'Anoniem'}</div>
      <div class="detail-row"><span class="label">📧 Email:</span> ${melding.reporterEmail || 'Niet verstrekt'}</div>
      <div class="detail-row"><span class="label">📞 Telefoon:</span> ${melding.reporterPhone || 'Niet verstrekt'}</div>
      <div class="detail-row"><span class="label">📝 Omschrijving:</span> ${melding.description || 'Geen omschrijving'}</div>
      <div class="detail-row"><span class="label">📅 Datum:</span> ${melding.date}</div>
      <div class="detail-row"><span class="label">🔢 ID:</span> #${melding.id}</div>
    </div>
    <div style="text-align: center;">
      <a href="https://leegstandmeldpunt.nl/portaal" style="background: #0047AB; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px;">Bekijk in Portaal</a>
    </div>
  </div>
</body>
</html>`,
    }
    
    // Email versturen
    await transporter.sendMail(mailOptions)
    
    return {
      statusCode: 200,
      body: JSON.stringify({ success: true })
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    }
  }
}
