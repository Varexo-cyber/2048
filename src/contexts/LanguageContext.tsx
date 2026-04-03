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
    vacancyManagement: string
    rights: string
    privacy: string
    cookies: string
    legalExpertiseShort: string
    legalExpertiseFull: string
    fiscalKnowledgeShort: string
    fiscalKnowledgeFull: string
    propertyManagementShort: string
    propertyManagementFull: string
    vacancyManagementShort: string
    vacancyManagementFull: string
    showMore: string
    showLess: string
    governmentLogin: string
    legalPolicy: string
    terms: string
    gdprCompliance: string
    policyDocs: string
    disclaimerTitle: string
    disclaimerText: string
    
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
    
    // Help Widget
    helpNeeded: string
    minimize: string
    helpQuestion: string
    needHelp: string
    helpContact: string
    contactUs: string
    faq1Question: string
    faq1Answer: string
    faq2Question: string
    faq2Answer: string
    faq3Question: string
    faq3Answer: string
    faq4Question: string
    faq4Answer: string
    faq5Question: string
    faq5Answer: string
    faq6Question: string
    faq6Answer: string
    
    // Admin Portal
    adminPortal: string
    welcomeBack: string
    totalReports: string
    inProgress: string
    completed: string
    propertyCalculator: string
    mailbox: string
    messages: string
    allReports: string
    noReports: string
    reportDetails: string
    close: string
    viewOnGoogleMaps: string
    reporter: string
    notProvided: string
    noDescription: string
    markUrgent: string
    totalMessages: string
    unread: string
    reply: string
    urgent: string
    
    // Navbar
    login: string
    closeMenu: string
    openMenu: string
    language: string
    theme: string
    
    // Services Page
    ourServices: string
    servicesSubtitle: string
    legalExpertiseSubtitle: string
    legalExpertiseDesc: string
    fiscalKnowledgeSubtitle: string
    fiscalKnowledgeDesc: string
    propertyManagementSubtitle: string
    propertyManagementDesc: string
    vacancyManagementSubtitle: string
    vacancyManagementDesc: string
    contactFor: string
    readyToWork: string
    servicesCTADesc: string
    contactCTABtn: string
    reportVacancyCTABtn: string
    scrollNext: string
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
    heroSubtitle: 'Het nationaal meldpunt voor leegstaande woningen en panden. Meld anoniem of met beloning, samen brengen we leegstand in kaart en helpen we het woningtekort te verkleinen.',
    reportVacancyBtn: 'Leegstand Melden',
    viewDashboardBtn: 'Bekijk Dashboard',
    
    // Stats
    vacantHomes: 'Leegstaande woningen',
    housingShortage: 'Woningtekort',
    reportingPoint: 'Meldpunt beschikbaar',
    municipalities: 'Gemeenten samenwerking',
    
    // Features
    whyLeegstandsloket: 'Waarom Leegstandmeldpunt?',
    professionalPartner: 'Een initiatief om leegstand tegen te gaan. Wij brengen leegstaande woningen in kaart en werken samen met gemeenten om deze weer bewoonbaar te maken.',
    discretion: 'Discretie & Vertrouwen',
    discretionDesc: 'Uw gegevens zijn veilig bij ons. We werken strikt vertrouwelijk en AVG-proof.',
    expertise: 'Marktkennis & Analyse',
    expertiseDesc: 'Onze experts analyseren leegstandspatronen en werken samen met woningcorporaties en gemeenten om oplossingen te creëren voor het woningtekort.',
    resultOriented: 'Maatschappelijk Impact',
    resultOrientedDesc: 'Wij richten ons op het daadwerkelijk verminderen van leegstand. Elke melding draagt bij aan een betere woon situatie voor iedereen.',
    propertyOwnerHelp: 'Eigenaar? Meld Leegstand',
    propertyOwnerHelpDesc: 'Heeft u een leegstaande woning? Meld deze via ons meldpunt. Wij helpen bij het vinden van geschikte huurders of kopers en dragen bij aan een leefbare buurt.',
    reward100: '€100 Melders Beloning',
    reward100Desc: 'Help ons leegstaande woningen in kaart te brengen en ontvang €100 als uw melding leidt tot een nieuwe bewoner.',
    
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
    ctaTitle: 'Doe Mee aan de Aanpak van Leegstand',
    ctaSubtitle: 'Samen met u, gemeenten en woningcorporaties brengen wij leegstaande panden weer in gebruik. Elke melding helpt om het woningtekort te verkleinen.',
    reportVacancyCTA: 'Meld Leegstand',
    contactCTA: 'Neem Contact Op',
    
    // Report Form
    reportTitle: 'Leegstand Melden',
    reportSubtitle: 'Kent u een leegstaande woning of pand? Meld dit anoniem of met contactgegevens. Wij onderzoeken elke melding en werken samen met gemeenten om passende oplossingen te vinden.',
    address: 'Adres',
    propertyType: 'Type pand',
    vacancyDuration: 'Hoe lang staat het pand al leeg?',
    description: 'Omschrijving (optioneel)',
    reportBtn: 'Leegstand Melden',
    footerDescription: 'Een nationaal initiatief ter bestrijding van leegstand. Wij werken samen met overheden, woningcorporaties en maatschappelijke partners om leegstaande woningen weer bewoonbaar te maken.',
    quickLinks: 'Snelle Links',
    services: 'Diensten',
    legalExpertise: 'Juridische Expertise',
    fiscalKnowledge: 'Fiscale Kennis',
    propertyManagement: 'Vastgoedbeheer',
    privacy: 'Privacybeleid',
    cookies: 'Cookiebeleid',
    legalExpertiseShort: 'Begeleiding bij leegstandswetgeving en regelgeving voor eigenaren en gemeenten.',
    legalExpertiseFull: 'Onze juridische experts bieden uitgebreide begeleiding bij alle aspecten van leegstandswetgeving. Dit omvat:\n\n• Advies over de Leegstandswet en bestemmingsplannen\n• Begeleiding bij het opstellen van huurovereenkomsten\n• Ondersteuning bij geschillen met huurders of eigenaren\n• Juridische risico-analyse voor vastgoedbezitters\n• Consultatie over anti-kraak maatregelen\n• Opzegging van huurovereenkomsten conform wetgeving',
    fiscalKnowledgeShort: 'Advies over belastingvoordelen en fiscale aspecten van leegstand en herbestemming.',
    fiscalKnowledgeFull: 'Onze fiscale specialisten adviseren over alle fiscale aspecten van leegstand:\n\n• BTW-vrijstellingen bij herbestemming\n• Fiscale voordelen van anti-kraak bewoning\n• Belastingaftrek voor onderhoudskosten\n• WOZ-waarde optimalisatie\n• Investeringsaftrek en subsidies\n• Fiscale structurering van vastgoedportefeuilles',
    propertyManagementShort: 'Professioneel beheer van leegstaande panden tot ze weer bewoond worden.',
    propertyManagementFull: 'Professioneel vastgoedbeheer voor leegstaande panden:\n\n• Periodieke inspecties en onderhoud\n• Coördinatie van reparaties en renovaties\n• Verzekeringsbeheer en schadeafhandeling\n• Relatiebeheer met buren en gemeente\n• Voorbereiding op nieuwe verhuur\n• Energieprestatie optimalisatie',
    vacancyManagement: 'Leegstandsbeheer',
    vacancyManagementShort: 'Bewaking, onderhoud en beveiliging van leegstaande panden tegen kraken en verval.',
    vacancyManagementFull: 'Compleet leegstandsbeheer om uw pand veilig te houden:\n\n• 24/7 bewaking en alarmmonitoring\n• Anti-kraak bewoning regeling\n• Wekelijkse rondes en inspecties\n• Directe melding bij calamiteiten\n• Onderhoud van tuin en buitenruimtes\n• Voorbereiding op herverhuur of verkoop',
    showMore: '▶ Meer info',
    showLess: '▼ Minder info',
    governmentLogin: 'Inloggen Overheden',
    legalPolicy: 'Wetgeving & Beleid',
    terms: 'Algemene Voorwaarden',
    gdprCompliance: 'AVG Compliance',
    policyDocs: 'Beleidsdocumenten',
    disclaimerTitle: 'Disclaimer en Aansprakelijkheidsbeperking:',
    disclaimerText: 'Leegstandmeldpunt is een onafhankelijk platform en geen onderdeel van de Nederlandse overheid. Wij faciliteren meldingen van leegstaand vastgoed, maar zijn niet verantwoordelijk voor de gevolgen of resultaten van meldingen. De verstrekte informatie is met zorg samengesteld, maar we geven geen garantie over volledigheid, juistheid of actualiteit. Gebruikers zijn zelf verantwoordelijk voor de juistheid van hun meldingen. Wij zijn niet aansprakelijk voor directe of indirecte schade voortvloeiend uit het gebruik van onze diensten. Voor juridisch bindende informatie verwijzen wij u naar officiële overheidsinstanties. Aanmelding voor de €100 vergoeding geschiedt onder de voorwaarden zoals vermeld in onze Algemene Voorwaarden. We behouden ons het recht voor om meldingen te weigeren of verwijderen die in strijd zijn met wetgeving of onze voorwaarden.',
    rights: 'Alle rechten voorbehouden.',
    
    // Contact
    contactTitle: 'Neem Contact Op',
    contactSubtitle: 'Heeft u vragen over leegstand of wilt u een leegstaande woning melden? We staan klaar om u te helpen.',
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
    aboutSubtitle: 'Een nationaal initiatief in de strijd tegen leegstand. Wij brengen leegstaande woningen en panden in kaart en werken samen met overheden, woningcorporaties en maatschappelijke partners om deze weer bewoonbaar te maken.',
    ourMission: 'Onze Missie',
    ourMissionDesc: 'Leegstandmeldpunt is opgericht om leegstand structureel aan te pakken. Wij identificeren leegstaande panden, analyseren de situatie en brengen eigenaren in contact met partijen die deze woningen weer beschikbaar kunnen maken voor woningzoekers.',
    ourVision: 'Onze Visie',
    ourVisionDesc: 'Een Nederland waarin elk huis zijn bestemming krijgt en waarin leegstand geen onnodig maatschappelijk probleem meer vormt.',
    ourValues: 'Onze Waarden',
    ourValuesDesc: 'Transparantie, betrouwbaarheid, samenwerking en maatschappelijk engagement staan bij ons centraal.',
    
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
    submitSuccess: 'Melding succesvol ingediend! We nemen zo spoedig mogelijk contact met u op.',
    
    // Help Widget
    helpNeeded: 'Hulp nodig?',
    minimize: 'Verkleinen',
    helpQuestion: 'Waarover wilt u meer informatie?',
    needHelp: 'Komt u er niet uit?',
    helpContact: 'Neem direct contact met ons op. We helpen u graag persoonlijk met uw vragen over leegstand of vastgoed.',
    contactUs: 'Neem contact op',
    faq1Question: 'Wat is Leegstandmeldpunt?',
    faq1Answer: 'Leegstandmeldpunt is het officiële meldpunt voor leegstaand vastgoed in Nederland. Wij werken samen met gemeenten, vastgoedeigenaren en woningzoekers om het woningtekort te verminderen door leegstand te signaleren en te activeren voor bewoning.',
    faq2Question: 'Hoe meld ik een leegstaande woning of pand?',
    faq2Answer: 'U kunt eenvoudig een melding doen via ons online formulier. Vul het adres in, geef aan hoe lang het pand leegstaat, en voeg eventueel foto\'s toe. Dit kan anoniem of met uw contactgegevens. Onze experts analyseren de melding en nemen zo nodig contact op met de eigenaar.',
    faq3Question: 'Hoe helpt dit mijn buurt?',
    faq3Answer: 'Door leegstand te melden en activeren, brengen we meer woningen terug op de markt. Dit betekent minder huisjagers, meer levendigheid in de straat, en minder kans op vandalisme of criminaliteit in leegstaande panden. U helpt mee aan leefbare buurten en oplossing van het woningtekort.',
    faq4Question: 'Wordt er een vergoeding gegeven voor meldingen?',
    faq4Answer: 'Ja, als melder ontvangt u een vergoeding van €100 wanneer uw melding leidt tot een succesvolle activering van het pand. Deze vergoeding wordt uitgekeerd nadat het project daadwerkelijk is gestart en de bewoning is gerealiseerd.',
    faq5Question: 'Wat gebeurt er na het melden van leegstand?',
    faq5Answer: 'Na uw melding analyseren wij de situatie binnen 2-4 weken. We controleren de eigendomssituatie en beoordelen de mogelijkheden voor activering. Bij een geschikte melding nemen we contact op met de eigenaar om een plan te bespreken voor verhuur, renovatie of herbestemming.',
    faq6Question: 'Welke type panden kunnen worden gemeld?',
    faq6Answer: 'Alle soorten vastgoed kunnen worden gemeld: woningen, appartementen, winkelpanden, kantoren, bedrijfsruimtes, en zelfs grond. Zolang het pand leegstaat en potentieel heeft voor bewoning of herbestemming, nemen wij de melding in behandeling.',
    
    // Admin Portal
    adminPortal: 'Admin Portaal',
    welcomeBack: 'Welkom terug',
    totalReports: 'Totaal Meldingen',
    inProgress: 'In Behandeling',
    completed: 'Afgehandeld',
    propertyCalculator: 'Vastgoed Calculator',
    mailbox: 'Mailbox',
    messages: 'Berichten',
    allReports: 'Alle Meldingen',
    noReports: 'Geen Meldingen',
    reportDetails: 'Melding Details',
    close: 'Sluiten',
    viewOnGoogleMaps: 'Bekijk op Google Maps',
    reporter: 'Melder',
    notProvided: 'Niet verstrekt',
    noDescription: 'Geen beschrijving',
    markUrgent: 'Markeer Urgent',
    totalMessages: 'Totaal Berichten',
    unread: 'Ongelezen',
    reply: 'Beantwoorden',
    urgent: 'Urgent',
    
    // Navbar
    login: 'Inloggen',
    closeMenu: 'Menu sluiten',
    openMenu: 'Menu openen',
    language: 'Taal',
    theme: 'Thema',
    
    // Services Page
    ourServices: 'Onze Diensten',
    servicesSubtitle: 'Van juridische ondersteuning tot volledig vastgoedbeheer. Wij regelen alles, zodat u zich geen zorgen hoeft te maken.',
    legalExpertiseSubtitle: 'Wij regelen alles juridisch, van A tot Z',
    legalExpertiseDesc: 'Onze juridische experts begeleiden u bij alle aspecten van leegstandswetgeving. Wij zorgen ervoor dat u geen zorgen heeft over juridische zaken.',
    fiscalKnowledgeSubtitle: 'Optimale fiscale voordelen voor uw situatie',
    fiscalKnowledgeDesc: 'Onze fiscale specialisten adviseren over alle fiscale aspecten van leegstand. Wij zorgen dat u maximaal profiteert van beschikbare voordelen.',
    propertyManagementSubtitle: 'Professioneel beheer van uw pand',
    propertyManagementDesc: 'Professioneel vastgoedbeheer voor leegstaande panden. Wij zorgen dat uw pand in topconditie blijft tot het weer bewoond wordt.',
    vacancyManagementSubtitle: 'Veiligheid en bewaking van uw pand',
    vacancyManagementDesc: 'Compleet leegstandsbeheer om uw pand veilig te houden. Geen zorgen over kraken, vandalisme of verval.',
    contactFor: 'Neem contact op voor',
    readyToWork: 'Klaar om samen te werken?',
    servicesCTADesc: 'Wij regelen alles voor u. Van juridische zaken tot het beheer van uw pand. Neem vandaag nog contact met ons op.',
    contactCTABtn: 'Neem Contact Op',
    reportVacancyCTABtn: 'Meld Leegstand',
    scrollNext: 'Scroll naar volgende sectie',
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
    heroSubtitle: 'The national reporting point for vacant homes and properties. Report anonymously or with reward, together we map vacancy and help reduce the housing shortage.',
    reportVacancyBtn: 'Report Vacancy',
    viewDashboardBtn: 'View Dashboard',
    
    // Stats
    vacantHomes: 'Vacant homes',
    housingShortage: 'Housing shortage',
    reportingPoint: 'Reporting point available',
    municipalities: 'Municipalities cooperation',
    
    // Features
    whyLeegstandsloket: 'Why Leegstandmeldpunt?',
    professionalPartner: 'An initiative to combat vacancy. We map vacant homes and work with municipalities to make them habitable again.',
    discretion: 'Discretion & Trust',
    discretionDesc: 'Your data is safe with us. We work strictly confidentially and GDPR-compliant.',
    expertise: 'Market Knowledge & Analysis',
    expertiseDesc: 'Our experts analyze vacancy patterns and work with housing associations and municipalities to create solutions for the housing shortage.',
    resultOriented: 'Social Impact',
    resultOrientedDesc: 'We focus on actually reducing vacancy. Every report contributes to a better housing situation for everyone.',
    propertyOwnerHelp: 'Owner? Report Vacancy',
    propertyOwnerHelpDesc: 'Do you have a vacant home? Report it through our reporting point. We help find suitable tenants or buyers and contribute to a livable neighborhood.',
    reward100: '€100 Reporter Reward',
    reward100Desc: 'Help us map vacant homes and receive €100 if your report leads to a new resident.',
    
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
    ctaTitle: 'Join the Fight Against Vacancy',
    ctaSubtitle: 'Together with you, municipalities and housing associations, we bring vacant properties back into use. Every report helps reduce the housing shortage.',
    reportVacancyCTA: 'Report Vacancy',
    contactCTA: 'Contact Us',
    
    // Report Form
    reportTitle: 'Report Vacancy',
    reportSubtitle: 'Do you know a vacant home or property? Report this anonymously or with contact details. We investigate every report and work with municipalities to find appropriate solutions.',
    address: 'Address',
    propertyType: 'Property Type',
    vacancyDuration: 'How long has the property been vacant?',
    description: 'Description (optional)',
    reportBtn: 'Submit Report',
    
    // Footer
    footerDescription: 'A national initiative against vacancy. We work with governments, housing associations and social partners to make vacant homes habitable again.',
    quickLinks: 'Quick Links',
    services: 'Services',
    legalExpertise: 'Legal Expertise',
    fiscalKnowledge: 'Fiscal Knowledge',
    propertyManagement: 'Property Management',
    rights: 'All rights reserved.',
    privacy: 'Privacy Policy',
    cookies: 'Cookie Policy',
    legalExpertiseShort: 'Guidance on vacancy legislation and regulations for owners and municipalities.',
    legalExpertiseFull: 'Our legal experts provide comprehensive guidance on all aspects of vacancy legislation:\n\n• Advice on the Vacancy Act and zoning plans\n• Assistance with drafting lease agreements\n• Support in disputes with tenants or owners\n• Legal risk analysis for property owners\n• Consultation on anti-squatting measures\n• Termination of lease agreements in accordance with the law',
    fiscalKnowledgeShort: 'Advice on tax benefits and fiscal aspects of vacancy and repurposing.',
    fiscalKnowledgeFull: 'Our fiscal specialists advise on all fiscal aspects of vacancy:\n\n• VAT exemptions for repurposing\n• Tax benefits of anti-squatting occupancy\n• Tax deduction for maintenance costs\n• WOZ value optimization\n• Investment deduction and subsidies\n• Fiscal structuring of real estate portfolios',
    propertyManagementShort: 'Professional management of vacant properties until they are inhabited again.',
    propertyManagementFull: 'Professional real estate management for vacant properties:\n\n• Periodic inspections and maintenance\n• Coordination of repairs and renovations\n• Insurance management and damage handling\n• Relationship management with neighbors and municipality\n• Preparation for new rental\n• Energy performance optimization',
    vacancyManagement: 'Vacancy Management',
    vacancyManagementShort: 'Security, maintenance and protection of vacant properties against squatting and decay.',
    vacancyManagementFull: 'Complete vacancy management to keep your property safe:\n\n• 24/7 security and alarm monitoring\n• Anti-squatting occupancy arrangement\n• Weekly rounds and inspections\n• Immediate notification in case of emergencies\n• Maintenance of garden and outdoor spaces\n• Preparation for re-rental or sale',
    showMore: '▶ More info',
    showLess: '▼ Less info',
    governmentLogin: 'Government Login',
    legalPolicy: 'Legislation & Policy',
    terms: 'Terms of Service',
    gdprCompliance: 'GDPR Compliance',
    policyDocs: 'Policy Documents',
    disclaimerTitle: 'Disclaimer and Limitation of Liability:',
    disclaimerText: 'Leegstandmeldpunt is an independent platform and not part of the Dutch government. We facilitate reports of vacant real estate but are not responsible for the consequences or results of such reports. The information provided has been compiled with care, but we provide no guarantee regarding completeness, accuracy, or timeliness. Users are solely responsible for the accuracy of their reports. We are not liable for any direct or indirect damages arising from the use of our services. For legally binding information, please consult official government agencies. Applications for the €100 compensation are subject to the conditions set forth in our Terms of Service. We reserve the right to refuse or remove reports that violate applicable laws or our terms.',
    
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
    aboutSubtitle: 'A national initiative in the fight against vacancy. We map vacant homes and properties and work with governments, housing associations and social partners to make them habitable again.',
    ourMission: 'Our Mission',
    ourMissionDesc: 'Leegstandmeldpunt was founded to structurally address vacancy. We identify vacant properties, analyze the situation and connect owners with parties that can make these homes available to home seekers.',
    ourVision: 'Our Vision',
    ourVisionDesc: 'A Netherlands where every home gets its purpose and where vacancy no longer forms an unnecessary social problem.',
    ourValues: 'Our Values',
    ourValuesDesc: 'Transparency, reliability, cooperation and social engagement are central to us.',
    
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
    submitSuccess: 'Report successfully submitted! We will contact you as soon as possible.',
    
    // Help Widget
    helpNeeded: 'Need help?',
    minimize: 'Minimize',
    helpQuestion: 'What would you like more information about?',
    needHelp: "Can't figure it out?",
    helpContact: 'Contact us directly. We are happy to help you personally with your questions about vacancy or real estate.',
    contactUs: 'Contact us',
    faq1Question: 'What is Leegstandmeldpunt?',
    faq1Answer: 'Leegstandmeldpunt is the official reporting point for vacant real estate in the Netherlands. We work together with municipalities, property owners and home seekers to reduce the housing shortage by signaling and activating vacancy for occupancy.',
    faq2Question: 'How do I report a vacant home or property?',
    faq2Answer: 'You can easily make a report via our online form. Enter the address, indicate how long the property has been vacant, and add photos if desired. This can be done anonymously or with your contact details. Our experts analyze the report and contact the owner if necessary.',
    faq3Question: 'How does this help my neighborhood?',
    faq3Answer: 'By reporting and activating vacancy, we bring more homes back to the market. This means fewer house hunters, more liveliness in the street, and less chance of vandalism or crime in vacant properties. You help create livable neighborhoods and solve the housing shortage.',
    faq4Question: 'Is there a reward for reports?',
    faq4Answer: 'Yes, as a reporter you receive a reward of €100 when your report leads to a successful activation of the property. This reward is paid out after the project has actually started and the occupancy has been realized.',
    faq5Question: 'What happens after reporting vacancy?',
    faq5Answer: 'After your report, we analyze the situation within 2-4 weeks. We check the ownership situation and assess the possibilities for activation. For a suitable report, we contact the owner to discuss a plan for rental, renovation or repurposing.',
    faq6Question: 'What types of properties can be reported?',
    faq6Answer: 'All types of real estate can be reported: homes, apartments, retail spaces, offices, business premises, and even land. As long as the property is vacant and has potential for occupancy or repurposing, we will handle the report.',
    
    // Admin Portal
    adminPortal: 'Admin Portal',
    welcomeBack: 'Welcome back',
    totalReports: 'Total Reports',
    inProgress: 'In Progress',
    completed: 'Completed',
    propertyCalculator: 'Property Calculator',
    mailbox: 'Mailbox',
    messages: 'Messages',
    allReports: 'All Reports',
    noReports: 'No Reports',
    reportDetails: 'Report Details',
    close: 'Close',
    viewOnGoogleMaps: 'View on Google Maps',
    reporter: 'Reporter',
    notProvided: 'Not provided',
    noDescription: 'No description',
    markUrgent: 'Mark Urgent',
    totalMessages: 'Total Messages',
    unread: 'Unread',
    reply: 'Reply',
    urgent: 'Urgent',
    
    // Navbar
    login: 'Login',
    closeMenu: 'Close Menu',
    openMenu: 'Open Menu',
    language: 'Language',
    theme: 'Theme',
    
    // Services Page
    ourServices: 'Our Services',
    servicesSubtitle: 'From legal support to full property management. We arrange everything, so you don\'t have to worry.',
    legalExpertiseSubtitle: 'We arrange everything legally, from A to Z',
    legalExpertiseDesc: 'Our legal experts guide you through all aspects of vacancy legislation. We ensure you have no worries about legal matters.',
    fiscalKnowledgeSubtitle: 'Optimal tax benefits for your situation',
    fiscalKnowledgeDesc: 'Our tax specialists advise on all fiscal aspects of vacancy. We ensure you maximize available benefits.',
    propertyManagementSubtitle: 'Professional management of your property',
    propertyManagementDesc: 'Professional property management for vacant buildings. We ensure your property stays in top condition until it is inhabited again.',
    vacancyManagementSubtitle: 'Security and monitoring of your property',
    vacancyManagementDesc: 'Complete vacancy management to keep your property safe. No worries about squatting, vandalism or decay.',
    contactFor: 'Contact us for',
    readyToWork: 'Ready to work together?',
    servicesCTADesc: 'We arrange everything for you. From legal matters to the management of your property. Contact us today.',
    contactCTABtn: 'Contact Us',
    reportVacancyCTABtn: 'Report Vacancy',
    scrollNext: 'Scroll to next section',
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
    heroSubtitle: 'Die nationale Meldestelle für leerstehende Wohnungen und Immobilien. Melden Sie anonym oder mit Belohnung, gemeinsam erfassen wir Leerstand und helfen, den Wohnungsmangel zu verringern.',
    reportVacancyBtn: 'Leerstand Melden',
    viewDashboardBtn: 'Dashboard Ansehen',
    
    // Stats
    vacantHomes: 'Leerstehende Wohnungen',
    housingShortage: 'Wohnungsdefizit',
    reportingPoint: 'Meldestelle verfügbar',
    municipalities: 'Gemeinden Zusammenarbeit',
    
    // Features
    whyLeegstandsloket: 'Warum Leegstandmeldpunt?',
    professionalPartner: 'Eine Initiative gegen Leerstand. Wir erfassen leerstehende Wohnungen und arbeiten mit Gemeinden zusammen, um diese wieder bewohnbar zu machen.',
    discretion: 'Diskretion & Vertrauen',
    discretionDesc: 'Ihre Daten sind bei uns sicher. Wir arbeiten streng vertraulich und DSGVO-konform.',
    expertise: 'Marktkenntnisse & Analyse',
    expertiseDesc: 'Unsere Experten analysieren Leerstandsmuster und arbeiten mit Wohnungsbaugesellschaften und Gemeinden zusammen, um Lösungen für den Wohnungsmangel zu schaffen.',
    resultOriented: 'Gesellschaftliche Wirkung',
    resultOrientedDesc: 'Wir konzentrieren uns auf die tatsächliche Verringerung von Leerstand. Jede Meldung trägt zu einer besseren Wohnsituation für alle bei.',
    propertyOwnerHelp: 'Eigentümer? Melden Sie Leerstand',
    propertyOwnerHelpDesc: 'Haben Sie eine leerstehende Wohnung? Melden Sie diese über unsere Meldestelle. Wir helfen bei der Suche nach geeigneten Mietern oder Käufern und tragen zu einem lebenswerten Viertel bei.',
    reward100: '€100 Melder Belohnung',
    reward100Desc: 'Helfen Sie uns, leerstehende Wohnungen zu erfassen, und erhalten Sie €100, wenn Ihre Meldung zu einem neuen Bewohner führt.',
    
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
    ctaTitle: 'Machen Sie Mit bei der Bekämpfung von Leerstand',
    ctaSubtitle: 'Gemeinsam mit Ihnen, Gemeinden und Wohnungsbaugesellschaften bringen wir leerstehende Immobilien wieder in Nutzung. Jede Meldung hilft, den Wohnungsmangel zu verringern.',
    reportVacancyCTA: 'Leerstand Melden',
    contactCTA: 'Kontaktieren Sie Uns',
    
    // Report Form
    reportTitle: 'Leerstand Melden',
    reportSubtitle: 'Kennen Sie eine leerstehende Wohnung oder Immobilie? Melden Sie dies anonym oder mit Kontaktdaten. Wir untersuchen jede Meldung und arbeiten mit Gemeinden zusammen, um passende Lösungen zu finden.',
    address: 'Adresse',
    propertyType: 'Immobilientyp',
    vacancyDuration: 'Wie lange steht die Immobilie leer?',
    description: 'Beschreibung (optional)',
    reportBtn: 'Meldung Absenden',
    
    // Footer
    footerDescription: 'Eine nationale Initiative gegen Leerstand. Wir arbeiten mit Regierungen, Wohnungsbaugesellschaften und sozialen Partnern zusammen, um leerstehende Wohnungen wieder bewohnbar zu machen.',
    quickLinks: 'Schnelle Links',
    services: 'Dienstleistungen',
    legalExpertise: 'Rechtliche Expertise',
    fiscalKnowledge: 'Steuerliche Kenntnisse',
    propertyManagement: 'Immobilienmanagement',
    rights: 'Alle Rechte vorbehalten.',
    privacy: 'Datenschutzerklärung',
    cookies: 'Cookie-Richtlinie',
    legalExpertiseShort: 'Beratung zu Leerstandsrecht und Vorschriften für Eigentümer und Gemeinden.',
    legalExpertiseFull: 'Unsere Rechtsexperten bieten umfassende Beratung zu allen Aspekten des Leerstandsrechts:\n\n• Beratung zum Leerstandsgesetz und Bebauungsplänen\n• Unterstützung bei der Erstellung von Mietverträgen\n• Unterstützung bei Streitigkeiten mit Mietern oder Eigentümern\n• Rechtliche Risikoanalyse für Immobilieneigentümer\n• Beratung zu Anti-Squatting-Maßnahmen\n• Kündigung von Mietverträgen in Übereinstimmung mit dem Gesetz',
    fiscalKnowledgeShort: 'Beratung zu Steuervorteilen und steuerlichen Aspekten von Leerstand und Zweckänderung.',
    fiscalKnowledgeFull: 'Unsere Steuerfachleute beraten zu allen steuerlichen Aspekten von Leerstand:\n\n• Mehrwertsteuerbefreiung bei Zweckänderung\n• Steuervorteile der Anti-Squatting-Nutzung\n• Steuerabzug für Instandhaltungskosten\n• WOZ-Wertoptimierung\n• Investitionsabzug und Subventionen\n• Steuerliche Strukturierung von Immobilienportfolios',
    propertyManagementShort: 'Professionelle Verwaltung von leerstehenden Immobilien bis sie wieder bewohnt werden.',
    propertyManagementFull: 'Professionelles Immobilienmanagement für leerstehende Immobilien:\n\n• Periodische Inspektionen und Wartung\n• Koordinierung von Reparaturen und Renovierungen\n• Versicherungsmanagement und Schadensregulierung\n• Beziehungsmanagement mit Nachbarn und Gemeinde\n• Vorbereitung auf neue Vermietung\n• Energieleistungsoptimierung',
    vacancyManagement: 'Leerstandsmanagement',
    vacancyManagementShort: 'Überwachung, Wartung und Schutz von leerstehenden Immobilien gegen Hausbesetzung und Verfall.',
    vacancyManagementFull: 'Komplettes Leerstandsmanagement, um Ihre Immobilie sicher zu halten:\n\n• 24/7 Überwachung und Alarmüberwachung\n• Anti-Squatting-Nutzungsregelung\n• Wöchentliche Runden und Inspektionen\n• Sofortige Benachrichtigung bei Notfällen\n• Wartung von Garten und Außenbereichen\n• Vorbereitung auf Neuvermietung oder Verkauf',
    showMore: '▶ Mehr Infos',
    showLess: '▼ Weniger Infos',
    governmentLogin: 'Behörden Login',
    legalPolicy: 'Gesetzgebung & Politik',
    terms: 'Allgemeine Geschäftsbedingungen',
    gdprCompliance: 'DSGVO Compliance',
    policyDocs: 'Richtlinien',
    disclaimerTitle: 'Haftungsausschluss und Haftungsbeschränkung:',
    disclaimerText: 'Leegstandmeldpunt ist eine unabhängige Plattform und kein Teil der niederländischen Regierung. Wir erleichtern Meldungen von leerstehenden Immobilien, sind jedoch nicht verantwortlich für die Konsequenzen oder Ergebnisse solcher Meldungen. Die bereitgestellten Informationen wurden mit Sorgfalt zusammengestellt, jedoch übernehmen wir keine Gewährleistung hinsichtlich Vollständigkeit, Richtigkeit oder Aktualität. Die Benutzer sind allein verantwortlich für die Richtigkeit ihrer Meldungen. Wir haften nicht für direkte oder indirekte Schäden, die aus der Nutzung unserer Dienste entstehen. Für rechtlich bindende Informationen konsultieren Sie bitte offizielle Regierungsstellen. Anträge für die €100-Vergütung unterliegen den Bedingungen, die in unseren Allgemeinen Geschäftsbedingungen festgelegt sind. Wir behalten uns das Recht vor, Meldungen abzulehnen oder zu entfernen, die geltende Gesetze oder unsere Bedingungen verletzen.',
    
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
    aboutSubtitle: 'Eine nationale Initiative im Kampf gegen Leerstand. Wir erfassen leerstehende Wohnungen und Immobilien und arbeiten mit Regierungen, Wohnungsbaugesellschaften und sozialen Partnern zusammen, um diese wieder bewohnbar zu machen.',
    ourMission: 'Unsere Mission',
    ourMissionDesc: 'Leegstandmeldpunt wurde gegründet, um Leerstand strukturell anzugehen. Wir identifizieren leerstehende Immobilien, analysieren die Situation und bringen Eigentümer mit Parteien zusammen, die diese Wohnungen wieder für Wohnungssuchende verfügbar machen können.',
    ourVision: 'Unsere Vision',
    ourVisionDesc: 'Ein Niederlande, in dem jedes Zuhause seine Bestimmung erhält und in dem Leerstand kein unnötiges gesellschaftliches Problem mehr darstellt.',
    ourValues: 'Unsere Werte',
    ourValuesDesc: 'Transparenz, Zuverlässigkeit, Zusammenarbeit und gesellschaftliches Engagement stehen bei uns im Mittelpunkt.',
    
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
    submitSuccess: 'Meldung erfolgreich eingereicht! Wir werden Sie so schnell wie möglich kontaktieren.',
    
    // Help Widget
    helpNeeded: 'Hilfe benötigt?',
    minimize: 'Minimieren',
    helpQuestion: 'Worum möchten Sie mehr erfahren?',
    needHelp: 'Kommen Sie nicht weiter?',
    helpContact: 'Nehmen Sie direkt Kontakt mit uns auf. Wir helfen Ihnen gerne persönlich bei Ihren Fragen zu Leerstand oder Immobilien.',
    contactUs: 'Kontaktieren Sie uns',
    faq1Question: 'Was ist Leegstandmeldpunt?',
    faq1Answer: 'Leegstandmeldpunt ist die offizielle Meldestelle für leerstehendes Immobilien in den Niederlanden. Wir arbeiten zusammen mit Gemeinden, Immobilieneigentümern und Wohnungssuchenden, um den Wohnungsmangel zu verringern, indem wir Leerstand signalisieren und für Bewohnung aktivieren.',
    faq2Question: 'Wie melde ich eine leerstehende Wohnung oder Immobilie?',
    faq2Answer: 'Sie können einfach eine Meldung über unser Online-Formular machen. Geben Sie die Adresse ein, geben Sie an, wie lange die Immobilie leersteht, und fügen Sie bei Bedarf Fotos hinzu. Dies kann anonym oder mit Ihren Kontaktdaten erfolgen. Unsere Experten analysieren die Meldung und kontaktieren bei Bedarf den Eigentümer.',
    faq3Question: 'Wie hilft das meinem Viertel?',
    faq3Answer: 'Durch die Meldung und Aktivierung von Leerstand bringen wir mehr Wohnungen zurück auf den Markt. Dies bedeutet weniger Wohnungssuchende, mehr Lebendigkeit in der Straße und weniger Chance auf Vandalismus oder Kriminalität in leerstehenden Immobilien. Sie helfen mit, lebenswerte Viertel zu schaffen und den Wohnungsmangel zu lösen.',
    faq4Question: 'Gibt es eine Belohnung für Meldungen?',
    faq4Answer: 'Ja, als Melder erhalten Sie eine Belohnung von €100, wenn Ihre Meldung zu einer erfolgreichen Aktivierung der Immobilie führt. Diese Belohnung wird ausgezahlt, nachdem das Projekt tatsächlich gestartet und die Bewohnung realisiert wurde.',
    faq5Question: 'Was passiert nach der Meldung von Leerstand?',
    faq5Answer: 'Nach Ihrer Meldung analysieren wir die Situation innerhalb von 2-4 Wochen. Wir überprüfen die Eigentumssituation und bewerten die Möglichkeiten für Aktivierung. Bei einer geeigneten Meldung kontaktieren wir den Eigentümer, um einen Plan für Vermietung, Renovierung oder Zweckänderung zu besprechen.',
    faq6Question: 'Welche Arten von Immobilien können gemeldet werden?',
    faq6Answer: 'Alle Arten von Immobilien können gemeldet werden: Wohnungen, Wohnhäuser, Einzelhandelsräume, Büros, Gewerberäume und sogar Grundstücke. Solange die Immobilie leersteht und Potenzial für Bewohnung oder Zweckänderung hat, werden wir die Meldung bearbeiten.',
    
    // Admin Portal
    adminPortal: 'Admin Portal',
    welcomeBack: 'Willkommen zurück',
    totalReports: 'Gesamt Meldungen',
    inProgress: 'In Bearbeitung',
    completed: 'Abgeschlossen',
    propertyCalculator: 'Immobilien Rechner',
    mailbox: 'Posteingang',
    messages: 'Nachrichten',
    allReports: 'Alle Meldungen',
    noReports: 'Keine Meldungen',
    reportDetails: 'Meldungsdetails',
    close: 'Schließen',
    viewOnGoogleMaps: 'Auf Google Maps ansehen',
    reporter: 'Melder',
    notProvided: 'Nicht angegeben',
    noDescription: 'Keine Beschreibung',
    markUrgent: 'Als Dringend markieren',
    totalMessages: 'Gesamtnachrichten',
    unread: 'Ungelesen',
    reply: 'Antworten',
    urgent: 'Dringend',
    
    // Navbar
    login: 'Anmelden',
    closeMenu: 'Menü schließen',
    openMenu: 'Menü öffnen',
    language: 'Sprache',
    theme: 'Thema',
    
    // Services Page
    ourServices: 'Unsere Dienstleistungen',
    servicesSubtitle: 'Von rechtlicher Unterstützung bis zur vollständigen Immobilienverwaltung. Wir regeln alles, damit Sie sich keine Sorgen machen müssen.',
    legalExpertiseSubtitle: 'Wir regeln alles rechtlich, von A bis Z',
    legalExpertiseDesc: 'Unsere Rechtsexperten begleiten Sie bei allen Aspekten des Leerstandsgesetzes. Wir sorgen dafür, dass Sie keine Sorgen über rechtliche Angelegenheiten haben.',
    fiscalKnowledgeSubtitle: 'Optimale steuerliche Vorteile für Ihre Situation',
    fiscalKnowledgeDesc: 'Unsere Steuerfachleute beraten zu allen steuerlichen Aspekten von Leerstand. Wir stellen sicher, dass Sie maximal von verfügbaren Vorteilen profitieren.',
    propertyManagementSubtitle: 'Professionelle Verwaltung Ihrer Immobilie',
    propertyManagementDesc: 'Professionelles Immobilienmanagement für leerstehende Gebäude. Wir stellen sicher, dass Ihre Immobilie in Top-Zustand bleibt, bis sie wieder bewohnt wird.',
    vacancyManagementSubtitle: 'Sicherheit und Überwachung Ihrer Immobilie',
    vacancyManagementDesc: 'Komplettes Leerstandsmanagement, um Ihre Immobilie sicher zu halten. Keine Sorgen über Hausbesetzung, Vandalismus oder Verfall.',
    contactFor: 'Kontaktieren Sie uns für',
    readyToWork: 'Bereit zusammenzuarbeiten?',
    servicesCTADesc: 'Wir regeln alles für Sie. Von rechtlichen Angelegenheiten bis zur Verwaltung Ihrer Immobilie. Kontaktieren Sie uns noch heute.',
    contactCTABtn: 'Kontaktieren Sie uns',
    reportVacancyCTABtn: 'Leerstand melden',
    scrollNext: 'Zum nächsten Abschnitt scrollen',
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
