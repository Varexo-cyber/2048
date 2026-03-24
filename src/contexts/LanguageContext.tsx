import { createContext, useContext, useState, FC, ReactNode } from 'react'

type Language = 'nl' | 'en' | 'de'

type Translations = {
  [key in Language]: {
    // Navigation
    home: string
    reportVacancy: string
    dashboard: string
    about: string
    contact: string
    
    // Hero
    heroTitle: string
    heroSubtitle: string
    reportVacancyBtn: string
    viewDashboardBtn: string
    
    // Stats
    vacantHomes: string
    housingShortage: string
    reportingPoint: string
    municipalities: string
    
    // Features
    whyLeegstandsloket: string
    professionalPartner: string
    discretion: string
    discretionDesc: string
    expertise: string
    expertiseDesc: string
    resultOriented: string
    resultOrientedDesc: string
    propertyOwnerHelp: string
    propertyOwnerHelpDesc: string
    reward100: string
    reward100Desc: string
    
    // Process
    howItWorks: string
    processSubtitle: string
    step1Title: string
    step1Desc: string
    step2Title: string
    step2Desc: string
    step3Title: string
    step3Desc: string
    step4Title: string
    step4Desc: string
    
    // CTA
    ctaTitle: string
    ctaSubtitle: string
    reportVacancyCTA: string
    contactCTA: string
    
    // Report Form
    reportTitle: string
    reportSubtitle: string
    address: string
    propertyType: string
    vacancyDuration: string
    description: string
    reportBtn: string
    
    // Footer
    footerDescription: string
    quickLinks: string
    services: string
    legalExpertise: string
    fiscalKnowledge: string
    propertyManagement: string
    rights: string
    privacy: string
    cookies: string
    
    // Contact
    contactTitle: string
    contactSubtitle: string
    contactData: string
    sendMessage: string
    name: string
    email: string
    subject: string
    message: string
    sendBtn: string
    
    // Contact Page Extra
    chooseCategory: string
    categoryGeneral: string
    categoryVacancy: string
    categoryCooperation: string
    categoryProperty: string
    categoryOther: string
    messagePlaceholder: string
    phone: string
    openingHours: string
    monFri: string
    saturday: string
    sunday: string
    closed: string
    fillRequired: string
    messageSent: string
    
    // About Page
    aboutTitle: string
    aboutSubtitle: string
    ourMission: string
    ourMissionDesc: string
    ourVision: string
    ourVisionDesc: string
    ourValues: string
    ourValuesDesc: string
    
    // Report Page Extra
    propertyDetails: string
    addressLabel: string
    addressPlaceholder: string
    propertyTypeLabel: string
    optionHome: string
    optionApartment: string
    optionShop: string
    optionOffice: string
    optionCommercial: string
    optionOther: string
    vacancyDurationLabel: string
    selectDuration: string
    duration0to3: string
    duration3to6: string
    duration6to12: string
    duration1to2y: string
    durationOver2y: string
    durationUnknown: string
    postalCodeLabel: string
    postalCodePlaceholder: string
    cityLabel: string
    cityPlaceholder: string
    descriptionLabel: string
    descriptionPlaceholder: string
    reportTypeTitle: string
    anonymousReport: string
    anonymousReportDesc: string
    namedReport: string
    namedReportDesc: string
    yourDetails: string
    nameLabel: string
    namePlaceholder: string
    emailLabel: string
    phoneLabel: string
    anonymousNoticeTitle: string
    anonymousNoticeText: string
    attachmentsTitle: string
    uploadText: string
    uploadFormats: string
    uploadedFiles: string
    privacyTitle: string
    privacyStatementTitle: string
    privacyText1: string
    privacyText2: string
    privacyText3: string
    privacyAgree: string
    requiredFields: string
    submitSuccess: string
  }
}

const translations: Translations = {
  nl: {
    // Navigation
    home: 'Home',
    reportVacancy: 'Leegstand Melden',
    dashboard: 'Dashboard',
    about: 'Over Ons',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Samen Tegen Leegstand,',
    heroSubtitle: 'Meld leegstaand vastgoed en help het woningtekort in Nederland op te lossen. Als melder ontvangt u een vergoeding van €100 wanneer uw melding leidt tot een succesvolle activering.',
    reportVacancyBtn: 'Leegstand Melden',
    viewDashboardBtn: 'Bekijk Dashboard',
    
    // Stats
    vacantHomes: 'Leegstaande woningen',
    housingShortage: 'Woningtekort',
    reportingPoint: 'Meldpunt beschikbaar',
    municipalities: 'Gemeenten samenwerking',
    
    // Features
    whyLeegstandsloket: 'Waarom Leegstandmeldpunt?',
    professionalPartner: 'Het officiële meldpunt voor leegstaand vastgoed in Nederland. Wij werken samen met gemeenten en vastgoedeigenaren om het woningtekort op te lossen.',
    discretion: 'Discretie & Vertrouwen',
    discretionDesc: 'Uw gegevens zijn veilig bij ons. We werken strikt vertrouwelijk en AVG-proof.',
    expertise: 'Professionele Expertise',
    expertiseDesc: 'Juridische, fiscale en vastgoedkundige kennis onder één dak voor optimale resultaten.',
    resultOriented: 'Resultaatgericht',
    resultOrientedDesc: 'We focussen op daadwerkelijke activering van vastgoed, niet op rapporteren.',
    propertyOwnerHelp: 'Eigenaar? Wij Helpen!',
    propertyOwnerHelpDesc: 'Heeft u een leegstaande woning? Wij helpen met verhuur, verkoop of tijdelijke bewoning. Snel en professioneel.',
    reward100: '€100 Beloning',
    reward100Desc: 'Meld leegstand en ontvang €100. Of als eigenaar: vind snel huurders/kopers en verdien terug!',
    
    // Process
    howItWorks: 'Hoe het Werkt',
    processSubtitle: 'Van melding tot activering in vier duidelijke stappen',
    step1Title: 'Melding',
    step1Desc: 'Iedereen kan leegstand melden via ons platform, anoniem of met contactgegevens.',
    step2Title: 'Analyse',
    step2Desc: 'Onze experts beoordelen de situatie en mogelijkheden voor activering.',
    step3Title: 'Activering',
    step3Desc: 'We activeren het vastgoed met passende oplossingen en nieuwe bewoners.',
    step4Title: 'Beheer',
    step4Desc: 'Het pand wordt bewoond, de buurt leefbaarder en het woningtekort verkleind.',
    
    // CTA
    ctaTitle: 'Draag Bij aan een Leefbare Buurt',
    ctaSubtitle: 'Samen kunnen we leegstand terugdringen en bijdragen aan meer beschikbare woningen in Nederland. Melders ontvangen een vergoeding van €100 bij succesvolle activering.',
    reportVacancyCTA: 'Meld Leegstand',
    contactCTA: 'Neem Contact Op',
    
    // Report Form
    reportTitle: 'Leegstand Melden',
    reportSubtitle: 'Help leegstand terug te dringen en het woningtekort op te lossen. Meld anoniem of met uw contactgegevens. Melders ontvangen een vergoeding van €100 wanneer de melding leidt tot een succesvolle activering.',
    address: 'Adres',
    propertyType: 'Type pand',
    vacancyDuration: 'Hoe lang staat het pand al leeg?',
    description: 'Omschrijving (optioneel)',
    reportBtn: 'Leegstand Melden',
    
    // Footer
    footerDescription: 'Samen tegen leegstand, voor meer woningen. Wij maken leegstaand vastgoed zichtbaar en activeren het voor bewoning. Melders ontvangen een vergoeding bij succesvolle activering.',
    quickLinks: 'Snelle Links',
    services: 'Diensten',
    legalExpertise: 'Juridische Expertise',
    fiscalKnowledge: 'Fiscale Kennis',
    propertyManagement: 'Vastgoedbeheer',
    rights: 'Alle rechten voorbehouden.',
    privacy: 'Privacybeleid',
    cookies: 'Cookiebeleid',
    
    // Contact
    contactTitle: 'Neem Contact Op',
    contactSubtitle: 'Heeft u vragen over leegstand, wilt u vastgoed melden of zoekt u samenwerking? We staan klaar om u te helpen.',
    contactData: 'Contactgegevens',
    sendMessage: 'Stuur ons een bericht',
    name: 'Uw naam',
    email: 'Uw e-mail',
    subject: 'Onderwerp',
    message: 'Uw bericht',
    sendBtn: 'Verstuur Bericht',
    
    // Contact Page Extra
    chooseCategory: 'Kies een categorie',
    categoryGeneral: 'Algemeen',
    categoryVacancy: 'Leegstand melden',
    categoryCooperation: 'Samenwerking',
    categoryProperty: 'Eigendom',
    categoryOther: 'Overig',
    messagePlaceholder: 'Reden van uw bericht (gelieve duidelijk te omschrijven waarom u contact opneemt)',
    phone: 'Telefoon',
    openingHours: 'Openingstijden',
    monFri: 'Maandag - Vrijdag',
    saturday: 'Zaterdag',
    sunday: 'Zondag',
    closed: 'Gesloten',
    fillRequired: 'Vul alle verplichte velden in (naam, email, bericht)',
    messageSent: 'Bericht succesvol verzonden! We nemen zo spoedig mogelijk contact met u op.',
    
    // About Page
    aboutTitle: 'Over Leegstandmeldpunt',
    aboutSubtitle: 'Wij zijn het officiële meldpunt voor leegstaand vastgoed in Nederland. Met juridische, fiscale en vastgoedkundige expertise dragen we bij aan het oplossen van het woningtekort.',
    ourMission: 'Onze Missie',
    ourMissionDesc: 'Leegstandmeldpunt is opgericht om het dubbele probleem van leegstand en woningtekort in Nederland aan te pakken. Wij ondersteunen melders met een vergoeding van €100 bij succesvolle activering.',
    ourVision: 'Onze Visie',
    ourVisionDesc: 'Een Nederland zonder leegstand, waar elk vastgoed zijn functie vervult en bijdraagt aan leefbare buurten.',
    ourValues: 'Onze Waarden',
    ourValuesDesc: 'Discretie, vertrouwen, professionaliteit en resultaatgerichtheid staan bij ons centraal.',
    
    // Report Page Extra
    propertyDetails: 'Eigendomsgegevens',
    addressLabel: 'Adres',
    addressPlaceholder: 'Straatnaam + huisnummer',
    propertyTypeLabel: 'Type pand',
    optionHome: 'Woning',
    optionApartment: 'Appartement',
    optionShop: 'Winkelpand',
    optionOffice: 'Kantoor',
    optionCommercial: 'Bedrijfsruimte',
    optionOther: 'Anders',
    vacancyDurationLabel: 'Hoe lang staat het pand al leeg?',
    selectDuration: 'Selecteer duur',
    duration0to3: '0-3 maanden',
    duration3to6: '3-6 maanden',
    duration6to12: '6-12 maanden',
    duration1to2y: '1-2 jaar',
    durationOver2y: 'Meer dan 2 jaar',
    durationUnknown: 'Ik weet het niet',
    postalCodeLabel: 'Postcode',
    postalCodePlaceholder: '1234 AB',
    cityLabel: 'Plaats',
    cityPlaceholder: 'Amsterdam',
    descriptionLabel: 'Omschrijving (optioneel)',
    descriptionPlaceholder: 'Geef extra informatie over de situatie...',
    reportTypeTitle: 'Melding Type',
    anonymousReport: 'Anoniem Melden',
    anonymousReportDesc: 'Meld leegstand zonder uw naam te geven',
    namedReport: 'Met Contactgegevens',
    namedReportDesc: 'Meld met uw gegevens voor follow-up',
    yourDetails: 'Uw Gegevens',
    nameLabel: 'Naam',
    namePlaceholder: 'Uw naam',
    emailLabel: 'E-mail',
    phoneLabel: 'Telefoonnummer',
    anonymousNoticeTitle: 'Anonieme melding:',
    anonymousNoticeText: 'Uw identiteit wordt niet bekendgemaakt. We kunnen u geen terugkoppeling geven over de status van uw melding.',
    attachmentsTitle: 'Bijlagen (optioneel)',
    uploadText: 'Klik hier om bestanden te uploaden of sleep ze hierheen',
    uploadFormats: 'Ondersteunde formaten: JPG, PNG, PDF, DOC, DOCX (max 10MB per bestand)',
    uploadedFiles: 'Geüploade bestanden:',
    privacyTitle: 'Privacy & Algemene Voorwaarden',
    privacyStatementTitle: 'Privacyverklaring en Algemene Voorwaarden',
    privacyText1: 'Door dit formulier in te dienen, gaat u akkoord met onze privacyverklaring en algemene voorwaarden. Wij verwerken uw gegevens strikt vertrouwelijk en in overeenstemming met de AVG. Uw gegevens worden alleen gebruikt voor het verwerken van deze melding en worden niet gedeeld met derden zonder uw expliciete toestemming.',
    privacyText2: 'Belangrijke punten:\n• Uw persoonsgegevens worden veilig opgeslagen\n• U heeft recht op inzage, correctie en verwijdering van uw gegevens\n• Meldingen kunnen anoniem worden gedaan (laat persoonlijke velden leeg)\n• Wij bewaren gegevens maximaal 2 jaar voor administratieve doeleinden',
    privacyText3: 'Lees onze volledige',
    privacyAgree: 'Ik ga akkoord met de privacyverklaring en algemene voorwaarden. Ik begrijp dat mijn gegevens worden verwerkt in overeenstemming met de AVG.',
    requiredFields: '* Verplichte velden',
    submitSuccess: 'Leegstandmelding succesvol ingediend! We nemen zo spoedig mogelijk contact met u op. Bij succesvolle activering ontvangt u een vergoeding van €100.',
  },
  
  en: {
    // Navigation
    home: 'Home',
    reportVacancy: 'Report Vacancy',
    dashboard: 'Dashboard',
    about: 'About',
    contact: 'Contact',
    
    // Hero
    heroTitle: 'Together Against Vacancy,',
    heroSubtitle: 'Report vacant property and help solve the housing shortage in the Netherlands. Reporters receive a €100 compensation when their report leads to successful activation.',
    reportVacancyBtn: 'Report Vacancy',
    viewDashboardBtn: 'View Dashboard',
    
    // Stats
    vacantHomes: 'Vacant homes',
    housingShortage: 'Housing shortage',
    reportingPoint: 'Reporting point available',
    municipalities: 'Municipalities cooperation',
    
    // Features
    whyLeegstandsloket: 'Why Leegstandmeldpunt?',
    professionalPartner: 'The official reporting point for vacant property in the Netherlands. We work with municipalities and property owners to solve the housing shortage.',
    discretion: 'Discretion & Trust',
    discretionDesc: 'Your data is safe with us. We work strictly confidentially and GDPR-proof.',
    expertise: 'Professional Expertise',
    expertiseDesc: 'Legal, fiscal and real estate knowledge under one roof for optimal results.',
    resultOriented: 'Result-Oriented',
    resultOrientedDesc: 'We focus on actual activation of real estate, not just reporting.',
    propertyOwnerHelp: 'Property Owner? We Help!',
    propertyOwnerHelpDesc: 'Do you have a vacant property? We help with rental, sale or temporary occupation. Fast and professional.',
    reward100: '€100 Reward',
    reward100Desc: 'Report vacancy and receive €100. Or as owner: find tenants/buyers quickly and earn back!',
    
    // Process
    howItWorks: 'How It Works',
    processSubtitle: 'From report to activation in four clear steps',
    step1Title: 'Report',
    step1Desc: 'Anyone can report vacancy through our platform, anonymously or with contact details.',
    step2Title: 'Analysis',
    step2Desc: 'Our experts assess the situation and opportunities for activation.',
    step3Title: 'Activation',
    step3Desc: 'We activate the property with suitable solutions and new residents.',
    step4Title: 'Management',
    step4Desc: 'The property becomes occupied, the neighborhood more livable and the housing shortage reduced.',
    
    // CTA
    ctaTitle: 'Contribute to a Livable Neighborhood',
    ctaSubtitle: 'Together we can reduce vacancy and contribute to more available housing in the Netherlands. Reporters receive a €100 compensation upon successful activation.',
    reportVacancyCTA: 'Report Vacancy',
    contactCTA: 'Contact Us',
    
    // Report Form
    reportTitle: 'Report Vacancy',
    reportSubtitle: 'Help reduce vacancy and solve the housing shortage. Report anonymously or with your contact details. Reporters receive a €100 compensation when the report leads to successful activation.',
    address: 'Address',
    propertyType: 'Property Type',
    vacancyDuration: 'How long has the property been vacant?',
    description: 'Description (optional)',
    reportBtn: 'Report Vacancy',
    
    // Footer
    footerDescription: 'Together against vacancy, for more housing. We make vacant properties visible and activate them for occupancy. Reporters receive a compensation upon successful activation.',
    quickLinks: 'Quick Links',
    services: 'Services',
    legalExpertise: 'Legal Expertise',
    fiscalKnowledge: 'Fiscal Knowledge',
    propertyManagement: 'Property Management',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    
    // Contact
    contactTitle: 'Contact Us',
    contactSubtitle: 'Do you have questions about vacancy, want to report property or looking for cooperation? We are ready to help you.',
    contactData: 'Contact Information',
    sendMessage: 'Send us a message',
    name: 'Your name',
    email: 'Your email',
    subject: 'Subject',
    message: 'Your message',
    sendBtn: 'Send Message',
    
    // Contact Page Extra
    chooseCategory: 'Choose a category',
    categoryGeneral: 'General',
    categoryVacancy: 'Report vacancy',
    categoryCooperation: 'Cooperation',
    categoryProperty: 'Property',
    categoryOther: 'Other',
    messagePlaceholder: 'Reason for your message (please clearly describe why you are contacting us)',
    phone: 'Phone',
    openingHours: 'Opening Hours',
    monFri: 'Monday - Friday',
    saturday: 'Saturday',
    sunday: 'Sunday',
    closed: 'Closed',
    fillRequired: 'Please fill in all required fields (name, email, message)',
    messageSent: 'Message sent successfully! We will contact you as soon as possible.',
    
    // About Page
    aboutTitle: 'About Leegstandmeldpunt',
    aboutSubtitle: 'We are the official reporting point for vacant property in the Netherlands. With legal, fiscal and real estate expertise, we contribute to solving the housing shortage.',
    ourMission: 'Our Mission',
    ourMissionDesc: 'Leegstandmeldpunt was founded to tackle the dual problem of vacancy and housing shortage in the Netherlands. We support reporters with a €100 compensation upon successful activation.',
    ourVision: 'Our Vision',
    ourVisionDesc: 'A Netherlands without vacancy, where every property fulfills its function and contributes to livable neighborhoods.',
    ourValues: 'Our Values',
    ourValuesDesc: 'Discretion, trust, professionalism and result-orientation are at our core.',
    
    // Report Page Extra
    propertyDetails: 'Property Details',
    addressLabel: 'Address',
    addressPlaceholder: 'Street name + house number',
    propertyTypeLabel: 'Property type',
    optionHome: 'House',
    optionApartment: 'Apartment',
    optionShop: 'Retail space',
    optionOffice: 'Office',
    optionCommercial: 'Commercial space',
    optionOther: 'Other',
    vacancyDurationLabel: 'How long has the property been vacant?',
    selectDuration: 'Select duration',
    duration0to3: '0-3 months',
    duration3to6: '3-6 months',
    duration6to12: '6-12 months',
    duration1to2y: '1-2 years',
    durationOver2y: 'More than 2 years',
    durationUnknown: "I don't know",
    postalCodeLabel: 'Postal Code',
    postalCodePlaceholder: '1234 AB',
    cityLabel: 'City',
    cityPlaceholder: 'Amsterdam',
    descriptionLabel: 'Description (optional)',
    descriptionPlaceholder: 'Provide additional information about the situation...',
    reportTypeTitle: 'Report Type',
    anonymousReport: 'Report Anonymously',
    anonymousReportDesc: 'Report vacancy without giving your name',
    namedReport: 'With Contact Details',
    namedReportDesc: 'Report with your details for follow-up',
    yourDetails: 'Your Details',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    emailLabel: 'Email',
    phoneLabel: 'Phone number',
    anonymousNoticeTitle: 'Anonymous report:',
    anonymousNoticeText: 'Your identity will not be disclosed. We cannot provide you with feedback on the status of your report.',
    attachmentsTitle: 'Attachments (optional)',
    uploadText: 'Click here to upload files or drag them here',
    uploadFormats: 'Supported formats: JPG, PNG, PDF, DOC, DOCX (max 10MB per file)',
    uploadedFiles: 'Uploaded files:',
    privacyTitle: 'Privacy & Terms of Service',
    privacyStatementTitle: 'Privacy Statement and Terms of Service',
    privacyText1: 'By submitting this form, you agree to our privacy statement and terms of service. We process your data strictly confidentially and in accordance with GDPR. Your data will only be used for processing this report and will not be shared with third parties without your explicit consent.',
    privacyText2: 'Important points:\n• Your personal data is stored securely\n• You have the right to access, correct and delete your data\n• Reports can be made anonymously (leave personal fields empty)\n• We retain data for a maximum of 2 years for administrative purposes',
    privacyText3: 'Read our full',
    privacyAgree: 'I agree to the privacy statement and terms of service. I understand that my data will be processed in accordance with GDPR.',
    requiredFields: '* Required fields',
    submitSuccess: 'Vacancy report submitted successfully! We will contact you as soon as possible. Upon successful activation, you will receive a €100 compensation.'
  },
  
  de: {
    // Navigation
    home: 'Startseite',
    reportVacancy: 'Leerstand Melden',
    dashboard: 'Dashboard',
    about: 'Über Uns',
    contact: 'Kontakt',
    
    // Hero
    heroTitle: 'Gemeinsam Gegen Leerstand,',
    heroSubtitle: 'Melden Sie leerstehende Immobilien und helfen Sie, das Wohnungsdefizit in den Niederlanden zu lösen. Melder erhalten eine Vergütung von €100, wenn ihre Meldung zu einer erfolgreichen Aktivierung führt.',
    reportVacancyBtn: 'Leerstand Melden',
    viewDashboardBtn: 'Dashboard Ansehen',
    
    // Stats
    vacantHomes: 'Leerstehende Wohnungen',
    housingShortage: 'Wohnungsdefizit',
    reportingPoint: 'Meldestelle verfügbar',
    municipalities: 'Gemeinden Zusammenarbeit',
    
    // Features
    whyLeegstandsloket: 'Warum Leegstandmeldpunt?',
    professionalPartner: 'Die offizielle Meldestelle für leerstehende Immobilien in den Niederlanden. Wir arbeiten mit Gemeinden und Immobilieneigentümern zusammen, um das Wohnungsdefizit zu lösen.',
    discretion: 'Diskretion & Vertrauen',
    discretionDesc: 'Ihre Daten sind bei uns sicher. Wir arbeiten streng vertraulich und DSGVO-konform.',
    expertise: 'Professionelle Expertise',
    expertiseDesc: 'Rechtliche, steuerliche und immobilienwirtschaftliche Kenntnisse unter einem Dach für optimale Ergebnisse.',
    resultOriented: 'Ergebnisorientiert',
    resultOrientedDesc: 'Wir konzentrieren uns auf die tatsächliche Aktivierung von Immobilien, nicht nur auf Berichterstattung.',
    propertyOwnerHelp: 'Eigentümer? Wir Helfen!',
    propertyOwnerHelpDesc: 'Haben Sie eine leerstehende Immobilie? Wir helfen bei Vermietung, Verkauf oder vorübergehender Bewohnung. Schnell und professionell.',
    reward100: '€100 Vergütung',
    reward100Desc: 'Leerstand melden und €100 erhalten. Oder als Eigentümer: Mieter/Käufer schnell finden und zurückverdienen!',
    
    // Process
    howItWorks: 'Wie Es Funktioniert',
    processSubtitle: 'Von Meldung bis Aktivierung in vier klaren Schritten',
    step1Title: 'Meldung',
    step1Desc: 'Jeder kann Leerstand über unsere Plattform melden, anonym oder mit Kontaktdaten.',
    step2Title: 'Analyse',
    step2Desc: 'Unsere Experten bewerten die Situation und Möglichkeiten für Aktivierung.',
    step3Title: 'Aktivierung',
    step3Desc: 'Wir aktivieren die Immobilie mit passenden Lösungen und neuen Bewohnern.',
    step4Title: 'Management',
    step4Desc: 'Die Immobilie wird bewohnt, der Nachbarschaft lebenswerter und das Wohnungsdefizit reduziert.',
    
    // CTA
    ctaTitle: 'Tragen Sie zu einem Lebenswerten Viertel Bei',
    ctaSubtitle: 'Gemeinsam können wir Leerstand reduzieren und zu mehr verfügbaren Wohnungen in den Niederlanden beitragen. Melder erhalten bei erfolgreicher Aktivierung eine Vergütung von €100.',
    reportVacancyCTA: 'Leerstand Melden',
    contactCTA: 'Kontaktieren Sie Uns',
    
    // Report Form
    reportTitle: 'Leerstand Melden',
    reportSubtitle: 'Helfen Sie, Leerstand zu reduzieren und das Wohnungsdefizit zu lösen. Melden Sie anonym oder mit Ihren Kontaktdaten. Melder erhalten eine Vergütung von €100, wenn die Meldung zu einer erfolgreichen Aktivierung führt.',
    address: 'Adresse',
    propertyType: 'Immobilientyp',
    vacancyDuration: 'Wie lange steht die Immobilie leer?',
    description: 'Beschreibung (optional)',
    reportBtn: 'Leerstand Melden',
    
    // Footer
    footerDescription: 'Gemeinsam gegen Leerstand, für mehr Wohnungen. Wir machen leerstehende Immobilien sichtbar und aktivieren sie für Bewohnung. Melder erhalten bei erfolgreicher Aktivierung eine Vergütung.',
    quickLinks: 'Schnelle Links',
    services: 'Dienstleistungen',
    legalExpertise: 'Rechtliche Expertise',
    fiscalKnowledge: 'Steuerliche Kenntnisse',
    propertyManagement: 'Immobilienmanagement',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutzerklärung',
    cookies: 'Cookie-Richtlinie',
    
    // Contact
    contactTitle: 'Kontakt',
    contactSubtitle: 'Haben Sie Fragen zu Leerstand, möchten eine Immobilie melden oder suchen Zusammenarbeit? Wir sind bereit, Ihnen zu helfen.',
    contactData: 'Kontaktinformationen',
    sendMessage: 'Senden Sie uns eine Nachricht',
    name: 'Ihr Name',
    email: 'Ihre E-Mail',
    subject: 'Betreff',
    message: 'Ihre Nachricht',
    sendBtn: 'Nachricht Senden',
    
    // Contact Page Extra
    chooseCategory: 'Wählen Sie eine Kategorie',
    categoryGeneral: 'Allgemein',
    categoryVacancy: 'Leerstand melden',
    categoryCooperation: 'Zusammenarbeit',
    categoryProperty: 'Eigentum',
    categoryOther: 'Sonstiges',
    messagePlaceholder: 'Grund Ihrer Nachricht (bitte beschreiben Sie klar, warum Sie uns kontaktieren)',
    phone: 'Telefon',
    openingHours: 'Öffnungszeiten',
    monFri: 'Montag - Freitag',
    saturday: 'Samstag',
    sunday: 'Sonntag',
    closed: 'Geschlossen',
    fillRequired: 'Bitte füllen Sie alle Pflichtfelder aus (Name, E-Mail, Nachricht)',
    messageSent: 'Nachricht erfolgreich gesendet! Wir werden Sie so schnell wie möglich kontaktieren.',
    
    // About Page
    aboutTitle: 'Über Leegstandmeldpunt',
    aboutSubtitle: 'Wir sind die offizielle Meldestelle für leerstehende Immobilien in den Niederlanden. Mit rechtlicher, steuerlicher und immobilienwirtschaftlicher Expertise tragen wir zur Lösung des Wohnungsdefizits bei.',
    ourMission: 'Unsere Mission',
    ourMissionDesc: 'Leegstandmeldpunt wurde gegründet, um das doppelte Problem von Leerstand und Wohnungsmangel in den Niederlanden anzugehen. Wir unterstützen Melder mit einer Vergütung von €100 bei erfolgreicher Aktivierung.',
    ourVision: 'Unsere Vision',
    ourVisionDesc: 'Ein Niederlande ohne Leerstand, wo jede Immobilie ihre Funktion erfüllt und zu lebenswerten Nachbarschaften beiträgt.',
    ourValues: 'Unsere Werte',
    ourValuesDesc: 'Diskretion, Vertrauen, Professionalität und Ergebnisorientierung stehen bei uns im Mittelpunkt.',
    
    // Report Page Extra
    propertyDetails: 'Immobiliendetails',
    addressLabel: 'Adresse',
    addressPlaceholder: 'Straßenname + Hausnummer',
    propertyTypeLabel: 'Immobilientyp',
    optionHome: 'Wohnhaus',
    optionApartment: 'Wohnung',
    optionShop: 'Einzelhandel',
    optionOffice: 'Büro',
    optionCommercial: 'Gewerberaum',
    optionOther: 'Sonstiges',
    vacancyDurationLabel: 'Wie lange steht die Immobilie leer?',
    selectDuration: 'Dauer auswählen',
    duration0to3: '0-3 Monate',
    duration3to6: '3-6 Monate',
    duration6to12: '6-12 Monate',
    duration1to2y: '1-2 Jahre',
    durationOver2y: 'Mehr als 2 Jahre',
    durationUnknown: 'Ich weiß es nicht',
    postalCodeLabel: 'Postleitzahl',
    postalCodePlaceholder: '12345',
    cityLabel: 'Stadt',
    cityPlaceholder: 'Berlin',
    descriptionLabel: 'Beschreibung (optional)',
    descriptionPlaceholder: 'Geben Sie zusätzliche Informationen zur Situation an...',
    reportTypeTitle: 'Meldungstyp',
    anonymousReport: 'Anonym melden',
    anonymousReportDesc: 'Leerstand melden ohne Ihren Namen anzugeben',
    namedReport: 'Mit Kontaktdaten',
    namedReportDesc: 'Melden Sie mit Ihren Daten für Nachverfolgung',
    yourDetails: 'Ihre Daten',
    nameLabel: 'Name',
    namePlaceholder: 'Ihr Name',
    emailLabel: 'E-Mail',
    phoneLabel: 'Telefonnummer',
    anonymousNoticeTitle: 'Anonyme Meldung:',
    anonymousNoticeText: 'Ihre Identität wird nicht offengelegt. Wir können Ihnen keine Rückmeldung zum Status Ihrer Meldung geben.',
    attachmentsTitle: 'Anhänge (optional)',
    uploadText: 'Klicken Sie hier, um Dateien hochzuladen oder ziehen Sie sie hierher',
    uploadFormats: 'Unterstützte Formate: JPG, PNG, PDF, DOC, DOCX (max 10MB pro Datei)',
    uploadedFiles: 'Hochgeladene Dateien:',
    privacyTitle: 'Datenschutz & AGB',
    privacyStatementTitle: 'Datenschutzerklärung und AGB',
    privacyText1: 'Durch das Absenden dieses Formulars stimmen Sie unserer Datenschutzerklärung und den AGB zu. Wir verarbeiten Ihre Daten streng vertraulich und in Übereinstimmung mit der DSGVO. Ihre Daten werden nur zur Bearbeitung dieser Meldung verwendet und nicht ohne Ihre ausdrückliche Zustimmung an Dritte weitergegeben.',
    privacyText2: 'Wichtige Punkte:\n• Ihre persönlichen Daten werden sicher gespeichert\n• Sie haben das Recht auf Einsicht, Korrektur und Löschung Ihrer Daten\n• Meldungen können anonym erfolgen (lassen Sie persönliche Felder leer)\n• Wir bewahren Daten maximal 2 Jahre für Verwaltungszwecke auf',
    privacyText3: 'Lesen Sie unsere vollständige',
    privacyAgree: 'Ich stimme der Datenschutzerklärung und den AGB zu. Ich verstehe, dass meine Daten in Übereinstimmung mit der DSGVO verarbeitet werden.',
    requiredFields: '* Pflichtfelder',
    submitSuccess: 'Leerstandsmeldung erfolgreich eingereicht! Wir werden Sie so schnell wie möglich kontaktieren. Bei erfolgreicher Aktivierung erhalten Sie eine Vergütung von €100.'
  }
}

const LanguageContext = createContext<{
  language: Language
  setLanguage: (lang: Language) => void
  t: Translations[Language]
} | null>(null)

export const useLanguage = () => {
  const context = useContext(LanguageContext)
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider')
  }
  return context
}

export const LanguageProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('nl')

  const value = {
    language,
    setLanguage,
    t: translations[language]
  }

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}
