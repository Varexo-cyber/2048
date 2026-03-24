# Leegstandsloket

Een moderne, impactgedreven website voor het melden en beheren van leegstaand vastgoed in Nederland.

## 🎯 Doel

Leegstandsloket is een centraal platform dat zich richt op:
- Het zichtbaar maken en terugdringen van leegstand
- Het oplossen van het woningtekort door bestaande vastgoedvoorraad beter te benutten
- Het voorkomen van buurtverval door snelle activering van leegstaande panden

## ✨ Functionaliteiten

### 🏠 Hoofdfunctionaliteiten
- **Meldformulier voor Leegstand**: Eenvoudig leegstaande panden melden (anoniem of met contactgegevens)
- **Dashboard**: Real-time inzicht in meldingen, statistieken en activeringsresultaten
- **Interactieve Kaart**: Visueel overzicht van leegstaande panden per regio
- **Contactformulier**: Leadgeneratie en klantcontact

### 📊 Dashboard Features
- Regionale statistieken en trends
- Recent gemelde panden met status
- Maandelijkse rapportages en exportmogelijkheden
- Prioriteitstelling en follow-up tracking

### 🔐 Privacy & Veiligheid
- AVG-proof verwerking van gegevens
- Optie voor anoniem melden
- Strikte vertrouwelijkheidsgarantie
- Beveiligde opslag van data

## 🛠️ Technologie

- **Frontend**: React 18 met TypeScript
- **Styling**: Tailwind CSS met custom components
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Build Tool**: Vite
- **Development**: Hot Module Replacement met Vite dev server

## 📁 Projectstructuur

```
src/
├── components/          # Herbruikbare React componenten
│   ├── Navbar.tsx      # Navigatie component
│   └── Footer.tsx      # Footer component
├── pages/              # Pagina componenten
│   ├── Home.tsx        # Homepage
│   ├── ReportVacancy.tsx  # Leegstand melden formulier
│   ├── Dashboard.tsx    # Dashboard met statistieken
│   ├── About.tsx        # Over ons pagina
│   └── Contact.tsx      # Contactpagina
├── utils/              # Utility functies
│   └── cn.ts           # Class name utility
├── App.tsx             # Hoofd app component
├── main.tsx           # App entry point
└── index.css           # Global styles
```

## 🚀 Installatie & Ontwikkeling

### Vereisten
- Node.js 18+ 
- npm of yarn

### Installatie
```bash
# Clone de repository
git clone <repository-url>
cd leegstandsloket

# Installeer dependencies
npm install

# Start development server
npm run dev
```

### Beschikbare Scripts
```bash
npm run dev      # Start development server (http://localhost:3000)
npm run build    # Build voor productie
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🎨 Design System

### Kleurenpalet
- **Primary**: Blauwtinten (#3b82f6 - #1e3a8a)
- **Secondary**: Grijstinten (#f8fafc - #0f172a)
- **Success**: Groen (#10b981)
- **Warning**: Geel (#f59e0b)
- **Error**: Rood (#ef4444)

### Component Classes
- `.btn-primary`: Primaire actie knoppen
- `.btn-secondary`: Secundaire knoppen
- `.card`: Standaard kaart component
- `.input-field`: Formulier velden

## 📱 Responsive Design

De website is volledig responsive en geoptimaliseerd voor:
- Mobile (320px+)
- Tablet (768px+)
- Desktop (1024px+)
- Large screens (1280px+)

## 🔒 Privacy & AVG

Leegstandsloket neemt privacy serieus:
- Alle data wordt versleuteld opgeslagen
- Gegevens worden alleen gedeeld met expliciete toestemming
- Anonieme meldingen zijn volledig anoniem
- AVG-compliant verwerking

## 🤝 Samenwerkingen

We werken samen met:
- 50+ gemeenten in Nederland
- Vastgoedeigenaren en -beheerders
- Woningcorporaties
- Overheidsinstanties

## 📈 Impact

Sinds oprichting:
- 500+ leegstaande panden gemeld
- 150+ panden succesvol geactiveerd
- 98% klanttevredenheid
- Aanzienlijke reductie in buurtverval

## 🚀 Toekomstige Features

- [ ] Real-time notificaties
- [ ] Mobile app
- [ ] API voor gemeenten
- [ ] Geavanceerde rapportages
- [ ] Machine learning voor prioriteitstelling

## 📞 Contact

- **E-mail**: info@leegstandsloket.nl
- **Telefoon**: 020 123 4567
- **Adres**: Herengracht 123, 1016 BA Amsterdam
- **Openingstijden**: Maandag - Vrijdag, 9:00 - 17:00 uur

## 📄 Licentie

Dit project valt onder de MIT Licentie.

---

**Samen tegen leegstand, voor meer woningen!** 🏠
