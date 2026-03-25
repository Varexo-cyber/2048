import { useState, useEffect } from 'react'
import { Calculator, Save, FolderOpen, Trash2, Eye, Upload, Link as LinkIcon, ArrowLeft } from 'lucide-react'
import Toast from '../components/Toast'

interface CalculatorInputs {
  aankoopprijs: number; m2: number; verkoop_m2: number; reno_m2: number
  overdracht_perc: number; looptijd: number; grondvorm: 'eigen' | 'erfpacht'
  erfpacht_canon: number; vve_kosten: number; vve_actief: 'ja' | 'nee'
  notaris: number; makelaar_perc: number; rente_perc: number; vpb_perc: number
  marktwaarde: number; ltv_perc: number; hypotheek_rente: number; aflossing_perc: number
  huur_inkomen: number; onderhoud: number; beheer_perc: number; verzekering: number
  belastingen: number; waardestijging: number; huurinflatie: number
}

interface Dossier {
  id: string; name: string; date: string; inputs: CalculatorInputs
  investType: 'flip' | 'rental'; notes: string; notes_extra: string
  winst: string; docLinks: DocLink[]
}

interface DocLink {
  name: string; type: 'file' | 'link'; url?: string; data?: string
  mimeType?: string; size?: number; addedAt: string
}

const VastgoedCalculatorPage = () => {
  const [investType, setInvestType] = useState<'flip' | 'rental'>('flip')
  const [inputs, setInputs] = useState<CalculatorInputs>({
    aankoopprijs: 349000, m2: 130, verkoop_m2: 5315, reno_m2: 1000,
    overdracht_perc: 8.0, looptijd: 6, grondvorm: 'eigen', erfpacht_canon: 0,
    vve_kosten: 0, vve_actief: 'ja', notaris: 3000, makelaar_perc: 1.5,
    rente_perc: 8.0, vpb_perc: 19.0, marktwaarde: 349000, ltv_perc: 90.0,
    hypotheek_rente: 8.0, aflossing_perc: 0.0, huur_inkomen: 2000, onderhoud: 200,
    beheer_perc: 0, verzekering: 50, belastingen: 2000, waardestijging: 4.0, huurinflatie: 2.4
  })

  const [results, setResults] = useState<any>({})
  const [projectName, setProjectName] = useState('')
  const [projectNotes, setProjectNotes] = useState('')
  const [dossiers, setDossiers] = useState<Dossier[]>([])
  const [currentView, setCurrentView] = useState<'calculator' | 'dossiers' | 'detail'>('calculator')
  const [currentDossier, setCurrentDossier] = useState<Dossier | null>(null)
  const [detailNotes, setDetailNotes] = useState('')
  const [docName, setDocName] = useState('')
  const [docUrl, setDocUrl] = useState('')
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'warning' | 'info' } | null>(null)

  const showToast = (message: string, type: 'success' | 'error' | 'warning' | 'info') => {
    setToast({ message, type })
  }

  useEffect(() => {
    const saved = localStorage.getItem('vastgoed_dossiers')
    if (saved) setDossiers(JSON.parse(saved))
    calculate()
  }, [])

  useEffect(() => { calculate() }, [inputs, investType])

  const saveDossiers = (newDossiers: Dossier[]) => {
    localStorage.setItem('vastgoed_dossiers', JSON.stringify(newDossiers))
    setDossiers(newDossiers)
  }

  const formatEuro = (amount: number) => '€ ' + Math.round(amount).toLocaleString('nl-NL')

  const calculate = () => {
    if (investType === 'flip') {
      const d = inputs
      let arv = d.m2 * d.verkoop_m2
      if (d.grondvorm === 'erfpacht') arv *= 0.925
      if (d.vve_actief === 'nee') arv *= 0.95
      const vveTotaal = d.vve_kosten * d.looptijd
      const erfpachtTotaal = d.grondvorm === 'erfpacht' ? (d.erfpacht_canon / 12) * d.looptijd : 0
      const projectLasten = vveTotaal + erfpachtTotaal
      const renoKosten = d.m2 * d.reno_m2
      const overdrachtKosten = d.aankoopprijs * (d.overdracht_perc / 100)
      const totaleAankoopKosten = d.aankoopprijs + overdrachtKosten + d.notaris
      const totaleInvestering = totaleAankoopKosten + renoKosten
      const verkoopKosten = arv * (d.makelaar_perc / 100)
      const renteKosten = (totaleAankoopKosten * (d.rente_perc / 100) * d.looptijd) / 12
      const winstVoorBelasting = (arv - verkoopKosten) - totaleInvestering - renteKosten - projectLasten
      const vpb = winstVoorBelasting > 0 ? winstVoorBelasting * (d.vpb_perc / 100) : 0
      const nettoWinst = winstVoorBelasting - vpb
      const marge = arv > 0 ? ((nettoWinst / arv) * 100).toFixed(1) : '0'
      setResults({
        arv, renoKosten, overdrachtKosten, totaleInvestering, verkoopKosten,
        renteKosten, projectLasten, winstVoorBelasting, vpb, nettoWinst,
        verdict: nettoWinst > 0 ? 'GO - WINSTGEVEND' : 'NO-GO - VERLIES',
        verdictClass: nettoWinst > 0 ? 'go' : 'nogo', marge, roi: marge
      })
    } else {
      const d = inputs
      const hypotheekBedrag = d.marktwaarde * (d.ltv_perc / 100)
      const eigenGeldNodig = d.marktwaarde - hypotheekBedrag
      const maandelijkseRente = (hypotheekBedrag * (d.hypotheek_rente / 100)) / 12
      const maandelijkseAflossing = (hypotheekBedrag * (d.aflossing_perc / 100)) / 12
      const beheerkosten = d.huur_inkomen * (d.beheer_perc / 100)
      const maandelijkseBelastingen = d.belastingen / 12
      const totaleMaandelijkseKosten = maandelijkseRente + maandelijkseAflossing + d.onderhoud + beheerkosten + d.verzekering + maandelijkseBelastingen + d.vve_kosten
      const cashflowMaandelijks = d.huur_inkomen - totaleMaandelijkseKosten
      const jaarlijkseHuur = d.huur_inkomen * 12
      const jaarlijkseRente = hypotheekBedrag * (d.hypotheek_rente / 100)
      const jaarlijkseAflossing = hypotheekBedrag * (d.aflossing_perc / 100)
      const icr = jaarlijkseRente > 0 ? (jaarlijkseHuur / jaarlijkseRente) * 100 : 0
      const debtService = jaarlijkseRente + jaarlijkseAflossing
      const dscr = debtService > 0 ? ((jaarlijkseHuur - (d.onderhoud * 12 + beheerkosten * 12 + d.verzekering * 12 + d.belastingen + d.vve_kosten * 12)) / debtService) * 100 : 0
      const bar = d.marktwaarde > 0 ? (jaarlijkseHuur / d.marktwaarde) * 100 : 0
      const roi = eigenGeldNodig > 0 ? ((cashflowMaandelijks * 12) / eigenGeldNodig) * 100 : 0
      const cashflow10jaar = cashflowMaandelijks * 12 * 10
      const waardeToename10jaar = d.marktwaarde * Math.pow(1 + (d.waardestijging / 100), 10) - d.marktwaarde
      const totaalRendement10jaar = eigenGeldNodig > 0 ? ((cashflow10jaar + waardeToename10jaar) / eigenGeldNodig / 10) * 100 : 0
      let verdict = 'NO-GO - NEGATIEVE CASHFLOW'
      let verdictClass = 'nogo'
      if (cashflowMaandelijks > 0 && dscr > 100) {
        verdict = 'GO - POSITIEVE CASHFLOW'
        verdictClass = 'go'
      } else if (cashflowMaandelijks > 0) {
        verdict = 'GO - POSITIEF MAAR LET OP DSCR'
        verdictClass = 'go'
      }
      setResults({
        hypotheekBedrag, eigenGeldNodig, huurMaandelijks: d.huur_inkomen,
        kostenMaandelijks: totaleMaandelijkseKosten, cashflowMaandelijks,
        icr: icr.toFixed(1), dscr: dscr.toFixed(1), bar: bar.toFixed(2),
        roi: roi.toFixed(2), rendement10jr: totaalRendement10jaar.toFixed(1),
        verdict, verdictClass, extraInfo: `ICR: ${icr.toFixed(1)}% | BAR: ${bar.toFixed(2)}%`
      })
    }
  }

  const saveDossier = () => {
    if (!projectName.trim()) {
      showToast('Geef het project een naam!', 'warning')
      return
    }
    const newDossier: Dossier = {
      id: Date.now().toString(), name: projectName, date: new Date().toLocaleDateString('nl-NL'),
      inputs: { ...inputs }, investType, notes: projectNotes, notes_extra: '',
      winst: investType === 'flip' ? formatEuro(results.nettoWinst || 0) : formatEuro((results.cashflowMaandelijks || 0) * 12),
      docLinks: []
    }
    saveDossiers([...dossiers, newDossier])
    setProjectName('')
    setProjectNotes('')
    showToast('Dossier succesvol opgeslagen!', 'success')
  }

  const loadDossier = (dossier: Dossier) => {
    setInputs(dossier.inputs)
    setInvestType(dossier.investType)
    setProjectName(dossier.name)
    setProjectNotes(dossier.notes)
    setCurrentDossier(dossier)
    setDetailNotes(dossier.notes_extra || '')
    setCurrentView('detail')
  }

  const deleteDossier = (id: string) => {
    saveDossiers(dossiers.filter(d => d.id !== id))
    showToast('Dossier verwijderd', 'success')
    if (currentDossier?.id === id) {
      setCurrentDossier(null)
      setCurrentView('dossiers')
    }
  }

  const saveDetailNotes = () => {
    if (!currentDossier) return
    const updated = dossiers.map(d => d.id === currentDossier.id ? { ...d, notes_extra: detailNotes } : d)
    saveDossiers(updated)
    setCurrentDossier({ ...currentDossier, notes_extra: detailNotes })
    showToast('Notities opgeslagen!', 'success')
  }

  const addDocLink = () => {
    if (!currentDossier || !docName || !docUrl) {
      showToast('Vul een naam en link in!', 'warning')
      return
    }
    const newLink: DocLink = { name: docName, type: 'link', url: docUrl, addedAt: new Date().toISOString() }
    const updated = dossiers.map(d => d.id === currentDossier.id ? { ...d, docLinks: [...d.docLinks, newLink] } : d)
    saveDossiers(updated)
    setCurrentDossier({ ...currentDossier, docLinks: [...currentDossier.docLinks, newLink] })
    setDocName('')
    setDocUrl('')
    showToast('Link toegevoegd!', 'success')
  }

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!currentDossier || !e.target.files) return
    for (const file of Array.from(e.target.files)) {
      if (file.size > 1024 * 1024) { showToast(`"${file.name}" te groot (max 1MB)`, 'error'); continue }
      if (!file.type.match(/image\/.*/) && file.type !== 'application/pdf') { showToast(`"${file.name}" geen afbeelding/PDF`, 'error'); continue }
      const reader = new FileReader()
      reader.onload = () => {
        const newLink: DocLink = { name: file.name, type: 'file', data: reader.result as string, mimeType: file.type, size: file.size, addedAt: new Date().toISOString() }
        const updated = dossiers.map(d => d.id === currentDossier.id ? { ...d, docLinks: [...d.docLinks, newLink] } : d)
        saveDossiers(updated)
        setCurrentDossier({ ...currentDossier, docLinks: [...currentDossier.docLinks, newLink] })
        showToast(`"${file.name}" toegevoegd!`, 'success')
      }
      reader.readAsDataURL(file)
    }
    e.target.value = ''
  }

  const removeDocLink = (index: number) => {
    if (!currentDossier) return
    const newLinks = currentDossier.docLinks.filter((_, i) => i !== index)
    const updated = dossiers.map(d => d.id === currentDossier.id ? { ...d, docLinks: newLinks } : d)
    saveDossiers(updated)
    setCurrentDossier({ ...currentDossier, docLinks: newLinks })
    showToast('Bijlage verwijderd', 'success')
  }

  const viewDocLink = (link: DocLink) => {
    if (link.type === 'file' && link.data) {
      const w = window.open()
      if (w) w.document.write(`<html><body style="margin:0;padding:20px;text-align:center;">${link.mimeType?.match(/image\/.*/) ? `<img src="${link.data}" style="max-width:100%;height:auto;" />` : `<iframe src="${link.data}" style="width:100%;height:100vh;border:none;"></iframe>`}</body></html>`)
    } else if (link.url) window.open(link.url, '_blank')
  }

  const InputField = ({ label, value, onChange, type = 'number', step }: any) => (
    <div>
      <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem', color: 'var(--text-primary)' }}>{label}</label>
      <input type={type} value={value} onChange={onChange} step={step} style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem' }} />
    </div>
  )

  const ResultRow = ({ label, value }: any) => (
    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)' }}>
      <span style={{ color: 'var(--text-secondary)', fontWeight: '500' }}>{label}</span>
      <span style={{ fontWeight: '700', color: 'var(--text-primary)' }}>{value}</span>
    </div>
  )

  return (
    <div style={{ padding: '2rem', minHeight: '100vh', background: 'var(--bg-secondary)' }}>
      {/* Toast Notification */}
      {toast && (
        <Toast
          message={toast.message}
          type={toast.type}
          onClose={() => setToast(null)}
        />
      )}
      
      <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
        {/* Tabs */}
        <div style={{ 
          display: 'flex', 
          gap: '0.5rem', 
          marginBottom: '2rem', 
          borderBottom: '2px solid var(--border)',
          overflowX: 'auto',
          flexWrap: 'nowrap',
          WebkitOverflowScrolling: 'touch'
        }}>
          {[
            { id: 'calculator', icon: Calculator, label: 'Calculator' },
            { id: 'dossiers', icon: FolderOpen, label: `Dossiers (${dossiers.length})` }
          ].map(tab => {
            const isActive = currentView === tab.id
            return (
              <button 
                key={tab.id} 
                onClick={() => setCurrentView(tab.id as any)} 
                style={{ 
                  padding: '1rem 2rem', 
                  background: isActive ? 'var(--accent-primary)' : 'transparent', 
                  color: isActive ? 'white' : 'var(--text-secondary)', 
                  border: 'none', 
                  borderBottom: isActive ? '3px solid var(--accent-primary)' : '3px solid transparent',
                  borderRadius: '8px 8px 0 0',
                  cursor: 'pointer', 
                  fontWeight: '600', 
                  fontSize: '1rem', 
                  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  position: 'relative',
                  overflow: 'hidden'
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'var(--bg-primary)'
                    e.currentTarget.style.color = 'var(--accent-primary)'
                    e.currentTarget.style.transform = 'translateY(-2px)'
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.background = 'transparent'
                    e.currentTarget.style.color = 'var(--text-secondary)'
                    e.currentTarget.style.transform = 'translateY(0)'
                  }
                }}
              >
                <tab.icon size={20} />
                {tab.label}
              </button>
            )
          })}
        </div>

        {/* Calculator View */}
        {currentView === 'calculator' && (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '2rem' }}>
            <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '1.5rem' }}>
                <Calculator size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                Vastgoed Calculator
              </h2>

              <div style={{ marginBottom: '2rem' }}>
                <label style={{ display: 'block', fontWeight: '600', marginBottom: '0.5rem' }}>Investering Type</label>
                <select value={investType} onChange={(e) => setInvestType(e.target.value as any)} style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1rem' }}>
                  <option value="flip">Flip (Kopen & Verkopen)</option>
                  <option value="rental">Verhuur (Lange Termijn)</option>
                </select>
              </div>

              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Basis Gegevens</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <InputField label="Aankoopprijs (€)" value={inputs.aankoopprijs} onChange={(e: any) => setInputs({ ...inputs, aankoopprijs: parseFloat(e.target.value) || 0 })} />
                <InputField label="Woonoppervlakte (m²)" value={inputs.m2} onChange={(e: any) => setInputs({ ...inputs, m2: parseFloat(e.target.value) || 0 })} />
                <InputField label="Verkoopprijs per m² (€)" value={inputs.verkoop_m2} onChange={(e: any) => setInputs({ ...inputs, verkoop_m2: parseFloat(e.target.value) || 0 })} />
                <InputField label="Renovatie per m² (€)" value={inputs.reno_m2} onChange={(e: any) => setInputs({ ...inputs, reno_m2: parseFloat(e.target.value) || 0 })} />
                <InputField label="Overdrachtsbelasting (%)" value={inputs.overdracht_perc} onChange={(e: any) => setInputs({ ...inputs, overdracht_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                <InputField label="Looptijd (maanden)" value={inputs.looptijd} onChange={(e: any) => setInputs({ ...inputs, looptijd: parseFloat(e.target.value) || 0 })} />
              </div>

              <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Grond & VvE</h3>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Grondvorm</label>
                  <select value={inputs.grondvorm} onChange={(e) => setInputs({ ...inputs, grondvorm: e.target.value as any })} style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    <option value="eigen">Eigen Grond</option>
                    <option value="erfpacht">Erfpacht</option>
                  </select>
                </div>
                {inputs.grondvorm === 'erfpacht' && <InputField label="Jaarlijkse Canon (€)" value={inputs.erfpacht_canon} onChange={(e: any) => setInputs({ ...inputs, erfpacht_canon: parseFloat(e.target.value) || 0 })} />}
                <InputField label="VvE Bijdrage (€/mnd)" value={inputs.vve_kosten} onChange={(e: any) => setInputs({ ...inputs, vve_kosten: parseFloat(e.target.value) || 0 })} />
                <div>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Actieve VvE?</label>
                  <select value={inputs.vve_actief} onChange={(e) => setInputs({ ...inputs, vve_actief: e.target.value as any })} style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}>
                    <option value="ja">Ja</option>
                    <option value="nee">Nee (Risico!)</option>
                  </select>
                </div>
              </div>

              {investType === 'flip' ? (
                <>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Financiering & Kosten</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <InputField label="Notaris + Overige (€)" value={inputs.notaris} onChange={(e: any) => setInputs({ ...inputs, notaris: parseFloat(e.target.value) || 0 })} />
                    <InputField label="Makelaarskosten (%)" value={inputs.makelaar_perc} onChange={(e: any) => setInputs({ ...inputs, makelaar_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Rente op lening (%/jaar)" value={inputs.rente_perc} onChange={(e: any) => setInputs({ ...inputs, rente_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Vennootschapsbelasting (%)" value={inputs.vpb_perc} onChange={(e: any) => setInputs({ ...inputs, vpb_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                  </div>
                </>
              ) : (
                <>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Verhuur Gegevens</h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                    <InputField label="Marktwaarde (€)" value={inputs.marktwaarde} onChange={(e: any) => setInputs({ ...inputs, marktwaarde: parseFloat(e.target.value) || 0 })} />
                    <InputField label="Loan to Value (%)" value={inputs.ltv_perc} onChange={(e: any) => setInputs({ ...inputs, ltv_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Hypotheekrente (%/jaar)" value={inputs.hypotheek_rente} onChange={(e: any) => setInputs({ ...inputs, hypotheek_rente: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Aflossing (%/jaar)" value={inputs.aflossing_perc} onChange={(e: any) => setInputs({ ...inputs, aflossing_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Huurinkomen (€/mnd)" value={inputs.huur_inkomen} onChange={(e: any) => setInputs({ ...inputs, huur_inkomen: parseFloat(e.target.value) || 0 })} />
                    <InputField label="Onderhoud (€/mnd)" value={inputs.onderhoud} onChange={(e: any) => setInputs({ ...inputs, onderhoud: parseFloat(e.target.value) || 0 })} />
                    <InputField label="Beheerkosten (%)" value={inputs.beheer_perc} onChange={(e: any) => setInputs({ ...inputs, beheer_perc: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Verzekering (€/mnd)" value={inputs.verzekering} onChange={(e: any) => setInputs({ ...inputs, verzekering: parseFloat(e.target.value) || 0 })} />
                    <InputField label="Belastingen (€/jaar)" value={inputs.belastingen} onChange={(e: any) => setInputs({ ...inputs, belastingen: parseFloat(e.target.value) || 0 })} />
                    <InputField label="Waardestijging (%/jaar)" value={inputs.waardestijging} onChange={(e: any) => setInputs({ ...inputs, waardestijging: parseFloat(e.target.value) || 0 })} step="0.1" />
                    <InputField label="Huurinflatie (%/jaar)" value={inputs.huurinflatie} onChange={(e: any) => setInputs({ ...inputs, huurinflatie: parseFloat(e.target.value) || 0 })} step="0.1" />
                  </div>
                </>
              )}
            </div>

            {/* Results Column */}
            <div>
              <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>Resultaten</h3>
                {investType === 'flip' ? (
                  <>
                    <ResultRow label="ARV (Eindwaarde)" value={formatEuro(results.arv || 0)} />
                    <ResultRow label="Renovatiekosten" value={formatEuro(results.renoKosten || 0)} />
                    <ResultRow label="Overdrachtsbelasting" value={formatEuro(results.overdrachtKosten || 0)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
                      <span>Totale Investering</span>
                      <span>{formatEuro(results.totaleInvestering || 0)}</span>
                    </div>
                    <ResultRow label="Verkoopkosten" value={formatEuro(results.verkoopKosten || 0)} />
                    <ResultRow label="Rentekosten lening" value={formatEuro(results.renteKosten || 0)} />
                    <ResultRow label="Projectgebonden lasten" value={formatEuro(results.projectLasten || 0)} />
                    <ResultRow label="Winst vóór belasting" value={formatEuro(results.winstVoorBelasting || 0)} />
                    <ResultRow label="Vennootschapsbelasting" value={formatEuro(results.vpb || 0)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-primary)', marginTop: '1rem' }}>
                      <span>NETTO WINST</span>
                      <span>{formatEuro(results.nettoWinst || 0)}</span>
                    </div>
                  </>
                ) : (
                  <>
                    <ResultRow label="Hypotheekbedrag" value={formatEuro(results.hypotheekBedrag || 0)} />
                    <ResultRow label="Eigen geld nodig" value={formatEuro(results.eigenGeldNodig || 0)} />
                    <ResultRow label="Maandelijkse huurinkomsten" value={formatEuro(results.huurMaandelijks || 0)} />
                    <ResultRow label="Maandelijkse kosten" value={formatEuro(results.kostenMaandelijks || 0)} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', borderBottom: '1px solid var(--border)', fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-primary)' }}>
                      <span>Cashflow per maand</span>
                      <span>{formatEuro(results.cashflowMaandelijks || 0)}</span>
                    </div>
                    <ResultRow label="ICR (Interest Coverage)" value={`${results.icr || 0}%`} />
                    <ResultRow label="DSCR (Debt Service Coverage)" value={`${results.dscr || 0}%`} />
                    <ResultRow label="BAR (Bruto Aanvangsrendement)" value={`${results.bar || 0}%`} />
                    <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem 0', fontWeight: '700', fontSize: '1.1rem', color: 'var(--accent-primary)', marginTop: '1rem' }}>
                      <span>ROI (Cashflow Jaar 1)</span>
                      <span>{results.roi || 0}%</span>
                    </div>
                    <ResultRow label="Gemiddeld rendement (10jr)" value={`${results.rendement10jr || 0}%`} />
                  </>
                )}
                
                <div style={{ marginTop: '2rem', padding: '1.5rem', borderRadius: '8px', textAlign: 'center', fontWeight: '700', fontSize: '1.25rem', background: results.verdictClass === 'go' ? 'linear-gradient(135deg, #48bb78 0%, #38a169 100%)' : 'linear-gradient(135deg, #f56565 0%, #e53e3e 100%)', color: 'white', boxShadow: '0 10px 25px rgba(0,0,0,0.2)' }}>
                  {results.verdict || '-'}
                </div>
                <div style={{ textAlign: 'center', marginTop: '1rem', fontSize: '0.875rem', color: 'var(--text-secondary)' }}>
                  {investType === 'flip' ? `Marge: ${results.marge || 0}% | ROI: ${results.roi || 0}%` : results.extraInfo}
                </div>
              </div>

              <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: '600', marginBottom: '1.5rem' }}>
                  <Save size={20} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
                  Project Opslaan
                </h3>
                <div style={{ marginBottom: '1rem' }}>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Projectnaam</label>
                  <input type="text" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Geef uw project een naam..." style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }} />
                </div>
                <div style={{ marginBottom: '1.5rem' }}>
                  <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Notities</label>
                  <textarea value={projectNotes} onChange={(e) => setProjectNotes(e.target.value)} rows={4} placeholder="Voeg belangrijke notities toe..." style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical' }} />
                </div>
                <button onClick={saveDossier} style={{ width: '100%', padding: '0.875rem', background: 'var(--accent-secondary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                  <Save size={20} />
                  Opslaan in Dossier
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Dossiers View */}
        {currentView === 'dossiers' && (
          <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)' }}>
            <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>
              <FolderOpen size={24} style={{ marginRight: '0.5rem', verticalAlign: 'middle' }} />
              Opgeslagen Dossiers
            </h2>
            {dossiers.length === 0 ? (
              <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-secondary)' }}>
                <FolderOpen size={64} style={{ marginBottom: '1rem', opacity: 0.3 }} />
                <p>Nog geen dossiers opgeslagen</p>
              </div>
            ) : (
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid var(--border)' }}>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Datum</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Project</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Type</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Resultaat</th>
                    <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600', color: 'var(--text-secondary)' }}>Acties</th>
                  </tr>
                </thead>
                <tbody>
                  {dossiers.map(d => (
                    <tr key={d.id} style={{ borderBottom: '1px solid var(--border)' }}>
                      <td style={{ padding: '1rem', color: 'var(--text-primary)' }}>{d.date}</td>
                      <td style={{ padding: '1rem', fontWeight: '600', color: 'var(--text-primary)' }}>{d.name}</td>
                      <td style={{ padding: '1rem', color: 'var(--text-secondary)' }}>{d.investType === 'flip' ? 'Flip' : 'Verhuur'}</td>
                      <td style={{ padding: '1rem', fontWeight: '700', color: 'var(--accent-secondary)' }}>{d.winst}</td>
                      <td style={{ padding: '1rem', display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => loadDossier(d)} style={{ padding: '0.5rem 1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                          <Eye size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          Open
                        </button>
                        <button onClick={() => deleteDossier(d.id)} style={{ padding: '0.5rem 1rem', background: 'var(--accent-danger)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: '600', fontSize: '0.875rem' }}>
                          <Trash2 size={16} style={{ marginRight: '0.25rem', verticalAlign: 'middle' }} />
                          Verwijder
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        )}

        {/* Detail View */}
        {currentView === 'detail' && currentDossier && (
          <div>
            <button onClick={() => setCurrentView('dossiers')} style={{ padding: '0.75rem 1.5rem', background: 'var(--bg-primary)', color: 'var(--text-primary)', border: '2px solid var(--border)', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', marginBottom: '2rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <ArrowLeft size={20} />
              Terug naar Lijst
            </button>

            <div style={{ background: 'var(--bg-primary)', padding: '2rem', borderRadius: '12px', boxShadow: 'var(--shadow-md)', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.5rem', fontWeight: '700', marginBottom: '2rem' }}>
                Dossier: {currentDossier.name}
              </h2>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '2rem' }}>
                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Bijlagen & Bestanden</h3>
                  <div style={{ border: '2px dashed var(--border)', borderRadius: '8px', padding: '2rem', textAlign: 'center', background: 'var(--bg-secondary)', marginBottom: '1rem', cursor: 'pointer' }} onClick={() => document.getElementById('file-upload')?.click()}>
                    <Upload size={48} style={{ color: 'var(--accent-primary)', marginBottom: '1rem' }} />
                    <h4 style={{ marginBottom: '0.5rem' }}>Bestanden Uploaden</h4>
                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem' }}>Sleep foto's of PDF's hierheen of klik om te selecteren</p>
                    <p style={{ color: 'var(--text-light)', fontSize: '0.75rem', marginTop: '0.5rem' }}>Max. 1MB per bestand</p>
                    <input id="file-upload" type="file" multiple accept="image/*,.pdf" onChange={handleFileUpload} style={{ display: 'none' }} />
                  </div>

                  <div style={{ marginBottom: '1rem' }}>
                    <label style={{ display: 'block', fontWeight: '500', marginBottom: '0.5rem', fontSize: '0.875rem' }}>Of voeg een link toe:</label>
                    <input type="text" value={docName} onChange={(e) => setDocName(e.target.value)} placeholder="Naam (bijv. Externe link)" style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', marginBottom: '0.5rem' }} />
                    <input type="text" value={docUrl} onChange={(e) => setDocUrl(e.target.value)} placeholder="Plak hier de link..." style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', marginBottom: '0.5rem' }} />
                    <button onClick={addDocLink} style={{ width: '100%', padding: '0.75rem', background: 'var(--text-light)', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: '600', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                      <LinkIcon size={20} />
                      Link Toevoegen
                    </button>
                  </div>

                  <div>
                    {currentDossier.docLinks.length === 0 ? (
                      <p style={{ textAlign: 'center', color: 'var(--text-light)', padding: '2rem' }}>Nog geen bijlagen</p>
                    ) : (
                      currentDossier.docLinks.map((link, i) => (
                        <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1rem', background: 'var(--bg-secondary)', borderRadius: '8px', border: '1px solid var(--border)', marginBottom: '0.5rem' }}>
                          <div style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '8px', background: link.type === 'file' ? 'rgba(72, 187, 120, 0.1)' : 'rgba(66, 153, 225, 0.1)', color: link.type === 'file' ? 'var(--accent-secondary)' : 'var(--accent-primary)' }}>
                            {link.type === 'file' ? '📄' : '🔗'}
                          </div>
                          <div style={{ flex: 1 }}>
                            <div style={{ fontWeight: '600', color: 'var(--text-primary)' }}>{link.name}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-light)' }}>{link.type === 'file' ? `${(link.size! / 1024).toFixed(1)} KB` : 'Link'}</div>
                          </div>
                          <button onClick={() => viewDocLink(link)} style={{ padding: '0.5rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                            <Eye size={16} />
                          </button>
                          <button onClick={() => removeDocLink(i)} style={{ padding: '0.5rem', background: 'var(--accent-danger)', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer' }}>
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))
                    )}
                  </div>
                </div>

                <div>
                  <h3 style={{ fontSize: '1.125rem', fontWeight: '600', marginBottom: '1rem' }}>Verslag</h3>
                  <textarea value={detailNotes} onChange={(e) => setDetailNotes(e.target.value)} rows={12} placeholder="Voeg uitgebreide notities en observaties toe..." style={{ width: '100%', padding: '0.75rem', border: '2px solid var(--border)', borderRadius: '8px', background: 'var(--bg-secondary)', color: 'var(--text-primary)', resize: 'vertical', marginBottom: '1rem' }} />
                  <button onClick={saveDetailNotes} style={{ width: '100%', padding: '0.875rem', background: 'var(--accent-secondary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
                    <Save size={20} />
                    Notities Opslaan
                  </button>
                </div>
              </div>
            </div>

            <button onClick={() => { setCurrentView('calculator'); calculate(); }} style={{ width: '100%', padding: '1rem', background: 'var(--accent-primary)', color: 'white', border: 'none', borderRadius: '8px', fontWeight: '600', cursor: 'pointer', fontSize: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}>
              <Calculator size={20} />
              Open in Calculator
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default VastgoedCalculatorPage
