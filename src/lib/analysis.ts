// ---------------------------------------------
// Types
// ---------------------------------------------
export type Item = {
  id: number
  text: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  category: 'GENERAL' | 'BUSINESS' | 'RISK' | 'TERMIN' | 'KNOWLEDGE'
  confidence: number
  matchedKeywords?: string[]
}

export type BasicAnalysis = {
  todos: Item[]
  termine: Item[]
  knowledge: Item[]
  risiken: Item[]
  business: Item[]
  insights: {
    totalItems: number
    priorityDistribution: { high: number; medium: number; low: number }
    categoryDistribution: {
      todos: number
      termine: number
      knowledge: number
      risiken: number
      business: number
    }
  }
  categorizationFeedback: {
    uncategorized: string[]
    lowConfidence: Item[]
    suggestions: string[]
  }
}

export type AIAnalysis = {
  semanticInsights: {
    energyDomainItems: Array<{ text: string; insight?: string; businessPotential: string; source: 'detected' | 'static' }>
    businessOpportunities: Array<{ text: string; monetizationPotential: string; effort?: string }>
    riskClusters: Array<{ cluster: string; items: string[]; severity: 'critical' | 'high' | 'medium' }>
  }
  intelligentPrioritization: {
    criticalPath: Array<{ item: string; reasoning: string; deadline: string }>
    workLifeBalance: Array<{ item: string; balanceImpact: 'positive' | 'negative'; recommendation: string }>
    regulatoryUrgency: Array<{ item: string; complianceRisk: 'CRITICAL' | 'HIGH' | 'MEDIUM'; action: string }>
  }
  predictiveRecommendations: Array<{ 
    type: 'STRATEGIC' | 'RISK' | 'BUSINESS' | 'PERFORMANCE'
    title: string
    message: string
    confidence: number
    basis: string
  }>
  performanceMetrics: {
    knowledgeToActionRatio: number
    businessFocusScore: number
    riskManagementCoverage: number
    workLifeIntegration: number
    categorizationAccuracy: number
    keywordCoverage: number
  }
}

// ---------------------------------------------
// Example content (unchanged)
// ---------------------------------------------
export const exampleContent = `KI-Strategieplan für Q2 finalisieren - regulatorische Deadline 15. März
Meeting mit Stadtwerke-Vorstand Donnerstag 14:00 - Digitalisierungsbudget verhandeln
Research: Machine Learning für Energieprognosen - Wettbewerbsvorteil schaffen
Mindfulness Session nach stressigem Arbeitstag einplanen - Work-Life Balance
Business Idee: KI-Prompting Kurse für Studenten entwickeln - Nebeneinkommen
Compliance Audit: GDPR für neue KI-Tools - Rechtsrisiko minimieren
Innovation Lab Kick-off Freitag - Blockchain für Smart Grid evaluieren
Deep Learning Workshop buchen - Skillbuilding für Energieprognosen
Datenschutz-Impact-Assessment für ML-Algorithmen vorbereiten - kritisch
Call IT-Security 16:30 - KI-Governance Framework definieren
Renewable Energy Forecasting Paper lesen - technisches Wissen erweitern
Legacy System Integration Problem - KI-Tools Kompatibilität prüfen
Business Plan Draft: KI-Beratung für kleinere Stadtwerke erstellen
Yoga Session heute Abend - Stressmanagement nach anspruchsvollem Tag
Risikomanagement Quarterly Review vorbereiten - Vorstandspräsentation
Marktanalyse: Energy-AI-Solutions Competitive Landscape
Stadtwerke Roadmap Meeting - Transformation Strategy diskutieren
Regulatory Report BNetzA Meldung fertigstellen - deadline morgen
Student anfragen: Masterarbeit über KI im Energiesektor betreuen
Prompt Engineering Guide für Energiebranche schreiben - Content Marketing`

// ---------------------------------------------
// Keyword sets (single source of truth)
// ---------------------------------------------
const keywordSets = {
  urgent: [
    'urgent', 'asap', 'sofort', 'dringend', 'wichtig', 'deadline', 'kritisch', 
    'morgen', 'heute', 'eilig', 'priority', 'offen', 'muss'
  ],
  termine: [
    'termin', 'meeting', 'call', 'besprechung', 'datum', 'uhr', 'kick-off', 
    'donnerstag', 'freitag', 'montag', 'dienstag', 'mittwoch', 'samstag', 'sonntag',
    'workshop', 'konferenz', 'presentation', 'demo', 'review',
    'vorstellung', 'firma', 'gespräch', 'gespräche', 'mitarbeiterversammlung',
    'wirtschaftsförderung', 'akademie', 'weiterbildung', 'seminar'
  ],
  knowledge: [
    'lernen', 'research', 'studium', 'wissen', 'analyse', 'workshop', 'kurs', 
    'lesen', 'paper', 'buch', 'training', 'fortbildung', 'weiterbildung',
    'skill', 'kompetenz', 'expertise', 'zertifikat',
    'iso', 'iec', 'standard', 'spezialisierung', 'orchestrierung', 'bedienung', 
    'governance', 'prompting', 'prompt', 'automationen', 'agentic ai', 'agenten',
    'ki', 'ai', 'artificial intelligence', 'machine learning', 'ml'
  ],
  risk: [
    'risiko', 'risk', 'gefahr', 'problem', 'compliance', 'audit', 'datenschutz', 
    'gdpr', 'legal', 'regulatorisch', 'bnetza', 'gesetz', 'verordnung',
    'haftung', 'sicherheit', 'vulnerability', 'threat',
    'pain points', 'problemfelder', 'herausforderung', 'schwierigkeit'
  ],
  business: [
    'business', 'idee', 'plan', 'beratung', 'monetar', 'einkommen', 'kunde', 
    'markt', 'umsatz', 'gewinn', 'roi', 'investment', 'strategie',
    'marketing', 'verkauf', 'akquisition', 'expansion',
    'anwendungsfälle', 'controlling', 'vertrieb', 'abrechnung', 'prozesse',
    'unternehmenskommunikation', 'abteilungen', 'priorisierung', 'ansprechpartner',
    'beraterfirmen', 'externe', 'vorbereitung', 'neuaufstellung', 'leitfaden'
  ],
  setup: [
    'setup', 'installation', 'konfiguration', 'laptop', 'google konto',
    'checkliste', 'formular', 'anwendungsanweisung', 'liste erstellen',
    'recherche', 'abfrage'
  ],
  energy: [
    'energie', 'strom', 'gas', 'stadtwerke', 'smart grid', 'renewable',
    'photovoltaik', 'windkraft', 'energieprognose', 'netzbetrieb', 'eeg',
    'kwk', 'fernwärme', 'blockchain', 'e-mobility', 'speicher',
    'wemag', 'dotsource', 'rostock', 'innocampus'
  ]
} as const

// ---------------------------------------------
// Analysis functions
// ---------------------------------------------
export function performBasicAnalysis(content: string): BasicAnalysis {
  const lines = content.split('\n').filter(line => line.trim())
  
  const todos: Item[] = []
  const termine: Item[] = []
  const knowledge: Item[] = []
  const risiken: Item[] = []
  const business: Item[] = []
  const uncategorized: string[] = []
  const lowConfidence: Item[] = []
  const suggestions: string[] = []

  lines.forEach((line, index) => {
    const lower = line.toLowerCase()
    let category: Item['category'] = 'GENERAL'
    let priority: Item['priority'] = 'MEDIUM'
    let confidence = 0.5
    const matchedKeywords: string[] = []

    // Priority (urgent)
    if (keywordSets.urgent.some(k => {
      if (lower.includes(k)) {
        matchedKeywords.push(k)
        return true
      }
      return false
    })) {
      priority = 'HIGH'
      confidence += 0.2
    }

    // Scoring-Kategorien definieren (nur diese werden bewertet)
    const categoryScores: Record<'business' | 'risk' | 'termine' | 'knowledge' | 'energy', number> = {
      business: 0,
      risk: 0,
      termine: 0,
      knowledge: 0,
      energy: 0
    }

    // Über alle Keyword-Sets iterieren, aber nur bekannte Scoring-Kategorien werten
    (Object.entries(keywordSets) as Array<[keyof typeof keywordSets, readonly string[]]>).forEach(([cat, keywords]) => {
      if (cat === 'urgent') return
      if (!(cat in categoryScores)) return

      keywords.forEach(keyword => {
        if (lower.includes(keyword)) {
          matchedKeywords.push(keyword)
          // cat ist jetzt garantiert eine der Keys in categoryScores
          categoryScores[cat as keyof typeof categoryScores] += 1
          confidence += 0.1
        }
      })
    })

    // Beste Kategorie bestimmen
    const bestCategoryEntry = (Object.entries(categoryScores) as Array<[keyof typeof categoryScores, number]>)
      .reduce((best, curr) => (curr[1] > best[1] ? curr : best), ['business', 0] as [keyof typeof categoryScores, number])

    const bestCategory = bestCategoryEntry[0]
    const maxScore = bestCategoryEntry[1]

    if (maxScore === 0) {
      uncategorized.push(line)
      category = 'GENERAL'
      confidence = Math.min(confidence, 0.3)
    } else if (maxScore === 1) {
      confidence = Math.min(confidence, 0.7) // Low confidence bei nur einem Match
    }

    // Mapping in Item-Kategorien
    switch (bestCategory) {
      case 'business':
        category = 'BUSINESS'
        break
      case 'risk':
        category = 'RISK'
        priority = 'HIGH' // Risiken immer hoch priorisieren
        break
      case 'termine':
        category = 'TERMIN'
        break
      case 'knowledge':
        category = 'KNOWLEDGE'
        break
      // 'energy' fällt auf GENERAL / bleibt in todos
    }

    const item: Item = { 
      id: index, 
      text: line.trim(), 
      priority, 
      category, 
      confidence: Math.min(confidence, 1.0),
      matchedKeywords 
    }

    if (confidence < 0.6) {
      lowConfidence.push(item)
    }

    // Verteilung
    switch (category) {
      case 'BUSINESS':
        business.push(item); break
      case 'RISK':
        risiken.push(item); break
      case 'TERMIN':
        termine.push(item); break
      case 'KNOWLEDGE':
        knowledge.push(item); break
      default:
        todos.push(item)
    }
  })

  // Vorschläge
  if (uncategorized.length > 0) {
    suggestions.push(`${uncategorized.length} Items konnten nicht kategorisiert werden. Versuchen Sie spezifischere Keywords.`)
  }
  if (lowConfidence.length > 3) {
    suggestions.push("Mehrere Items haben niedrige Konfidenz. Verwenden Sie klarere Begriffe wie 'meeting', 'deadline', 'research'.")
  }

  const flat = [...todos, ...termine, ...knowledge, ...risiken, ...business]
  const insights = {
    totalItems: lines.length,
    priorityDistribution: {
      high: flat.filter(i => i.priority === 'HIGH').length,
      medium: flat.filter(i => i.priority === 'MEDIUM').length,
      low: flat.filter(i => i.priority === 'LOW').length
    },
    categoryDistribution: {
      todos: todos.length,
      termine: termine.length,
      knowledge: knowledge.length,
      risiken: risiken.length,
      business: business.length
    }
  }

  return { 
    todos, termine, knowledge, risiken, business, insights,
    categorizationFeedback: { uncategorized, lowConfidence, suggestions }
  }
}

export function generateFallbackAIAnalysis(basic: BasicAnalysis): AIAnalysis {
  const allItems = [...basic.todos, ...basic.termine, ...basic.knowledge, ...basic.risiken, ...basic.business]

  const energyDetectedItems = allItems
    .filter(item => keywordSets.energy.some(keyword => item.text.toLowerCase().includes(keyword)))
    .map(item => ({
      text: item.text,
      insight: 'Direkt aus Ihren Eingabedaten erkannt',
      businessPotential: 'Konkretes Business-Potenzial im Energiesektor',
      source: 'detected' as const
    }))

  const staticEnergyItems = energyDetectedItems.length === 0 ? [
    { text: 'Smart Grid Implementation', insight: 'Core infrastructure transformation', businessPotential: 'Consulting opportunity for other utilities', source: 'static' as const },
    { text: 'Energy Forecasting ML', insight: 'Direct operational improvement', businessPotential: 'Proprietary algorithm development', source: 'static' as const }
  ] : []

  const totalItems = basic.insights.totalItems
  const knowledgeToActionRatio = totalItems > 0 ? Math.round((basic.knowledge.length / totalItems) * 100) : 0
  const businessFocusScore = totalItems > 0 ? Math.round((basic.business.length / totalItems) * 100) : 0
  const riskManagementCoverage = totalItems > 0 ? Math.round((basic.risiken.length / totalItems) * 100) : 0
  
  const workLifeIntegration = allItems.some(item => {
    const t = item.text.toLowerCase()
    return t.includes('yoga') || t.includes('mindfulness') || t.includes('balance') || t.includes('mittag')
  }) ? 80 : 40

  const categorizationAccuracy = totalItems > 0 
    ? Math.round(((totalItems - basic.categorizationFeedback.lowConfidence.length) / totalItems) * 100) 
    : 90

  const keywordCoverage = totalItems > 0
    ? Math.round(((totalItems - basic.categorizationFeedback.uncategorized.length) / totalItems) * 100)
    : 100

  const recommendations: AIAnalysis['predictiveRecommendations'] = []
  
  if (basic.business.length > 0) {
    recommendations.push({
      type: 'STRATEGIC',
      title: 'BUSINESS OPPORTUNITIES DETECTED',
      message: `${basic.business.length} Business-Items gefunden. KI-Beratung & Anwendungsfälle zeigen Monetarisierungspotential.`,
      confidence: Math.min(95, 60 + basic.business.length * 8),
      basis: `Erkannte Business-Keywords: ${basic.business.flatMap(b => b.matchedKeywords || []).slice(0,3).join(', ')}`
    })
  }

  if (basic.risiken.length > 1) {
    recommendations.push({
      type: 'RISK',
      title: 'COMPLIANCE & GOVERNANCE CLUSTER',
      message: `${basic.risiken.length} Risiko-Items erkannt. KI-Governance wird kritisch wichtig.`,
      confidence: Math.min(95, 70 + basic.risiken.length * 8),
      basis: `Pain Points & Compliance-Keywords in Ihren Daten erkannt`
    })
  }

  if (basic.knowledge.length > basic.todos.length + basic.business.length) {
    recommendations.push({
      type: 'PERFORMANCE',
      title: 'LEARNING-TO-ACTION IMBALANCE',
      message: 'Viel KI-Wissen (Prompting, Governance) aber wenig konkrete Umsetzung. Action-Items priorisieren!',
      confidence: 85,
      basis: `Knowledge Items (${basic.knowledge.length}) > Action Items (${basic.todos.length + basic.business.length})`
    })
  }

  if (basic.termine.length >= 4) {
    recommendations.push({
      type: 'STRATEGIC',
      title: 'NETWORKING & PARTNERSHIP MOMENTUM',
      message: `${basic.termine.length} Termine erkannt. Starkes Netzwerk für KI-Business-Development nutzen!`,
      confidence: 90,
      basis: `Termine mit Stadtwerke, Beraterfirmen, und KI-Akademie erkannt`
    })
  }

  return {
    semanticInsights: {
      energyDomainItems: [...energyDetectedItems, ...staticEnergyItems],
      businessOpportunities: basic.business.map(item => ({
        text: item.text,
        monetizationPotential: item.confidence > 0.7 ? 'High potential - konkrete Anwendungsfälle erkannt' : 'Medium potential',
        effort: item.priority === 'HIGH' ? 'low' : 'medium'
      })),
      riskClusters: basic.risiken.length > 0 ? [
        { 
          cluster: 'KI Governance & Compliance', 
          items: basic.risiken.map(r => r.text), 
          severity: basic.risiken.some(r => r.priority === 'HIGH') ? 'critical' : 'high'
        }
      ] : []
    },
    intelligentPrioritization: {
      criticalPath: basic.risiken
        .filter(r => r.priority === 'HIGH')
        .map(item => ({
          item: item.text,
          reasoning: 'High-priority compliance/risk item - KI-Governance kritisch',
          deadline: item.text.toLowerCase().includes('morgen') ? 'TOMORROW' :
                   item.text.toLowerCase().includes('offen') ? 'ASAP' : 'This week'
        })),
      workLifeBalance: allItems
        .filter(item => {
          const t = item.text.toLowerCase()
          return t.includes('mittag') || t.includes('balance') || t.includes('mitarbeiterversammlung')
        })
        .map(item => ({
          item: item.text,
          balanceImpact: 'positive' as const,
          recommendation: 'Time-blocking für Work-Life Integration'
        })),
      regulatoryUrgency: basic.risiken.map(item => ({
        item: item.text,
        complianceRisk: item.priority === 'HIGH' ? 'CRITICAL' as const : 'MEDIUM' as const,
        action: item.text.toLowerCase().includes('offen') ? 'Schedule immediately' : 'Plan within sprint'
      }))
    },
    predictiveRecommendations: recommendations,
    performanceMetrics: {
      knowledgeToActionRatio,
      businessFocusScore,
      riskManagementCoverage,
      workLifeIntegration,
      categorizationAccuracy,
      keywordCoverage
    }
  }
}
