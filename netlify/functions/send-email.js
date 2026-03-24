const nodemailer = require('nodemailer')

// Configureren van email transporter
const transporter = nodemailer.createTransporter({
  host: 'smtp.gmail.com', // of je email provider
  port: 587,
  secure: false,
  auth: {
    user: 'mohammed81310@gmail.com',
    pass: process.env.EMAIL_PASSWORD // App password
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
      from: 'noreply@leegstandmeldpunt.nl',
      to: 'mohammed81310@gmail.com',
      subject: '🚨 Nieuwe Leegstand Melding - Leegstandmeldpunt.nl',
      text: `
Hallo Admin,

Er is een nieuwe leegstand melding binnengekomen!

Adres: ${melding.address}
Postcode: ${melding.postcode || 'Niet verstrekt'}
Plaats: ${melding.city || 'Niet verstrekt'}
Type: ${melding.type}
Duur: ${melding.vacancyDuration || 'Onbekend'}
Melder: ${melding.reporterName || 'Anoniem'}
Email: ${melding.reporterEmail || 'Niet verstrekt'}
Telefoon: ${melding.reporterPhone || 'Niet verstrekt'}
Omschrijving: ${melding.description || 'Geen omschrijving'}
Datum: ${melding.date}
ID: #${melding.id}

Bekijk in portaal: https://leegstandmeldpunt.nl/portaal
      `
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
