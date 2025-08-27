// MASSIV ERWEITERTE KEYWORD-SETS basierend auf echter Nutzereingabe
const keywordSets = {
  urgent: ['urgent', 'asap', 'sofort', 'dringend', 'wichtig', 'deadline', 'kritisch', 'morgen', 'heute', 'eilig', 'priority', 'offen', 'muss'],
  termine: [
    // Basis-Termine
    'termin', 'meeting', 'call', 'besprechung', 'datum', 'uhr', 'kick-off', 
    'donnerstag', 'freitag', 'montag', 'dienstag', 'mittwoch', 'samstag', 'sonntag',
    'workshop', 'konferenz', 'presentation', 'demo', 'review',
    // Neue: Geschäftstermine
    'vorstellung', 'firma', 'gespräch', 'gespräche', 'mitarbeiterversammlung',
    'wirtschaftsförderung', 'akademie', 'weiterbildung', 'seminar'
  ],
  knowledge: [
    // Basis-Learning
    'lernen', 'research', 'studium', 'wissen', 'analyse', 'workshop', 'kurs', 
    'lesen', 'paper', 'buch', 'training', 'fortbildung', 'weiterbildung',
    'skill', 'kompetenz', 'expertise', 'zertifikat',
    // Neue: KI-spezifisch
    'iso', 'iec', 'standard', 'spezialisierung', 'orchestrierung', 'bedienung', 
    'governance', 'prompting', 'prompt', 'automationen', 'agentic ai', 'agenten',
    'ki', 'ai', 'artificial intelligence', 'machine learning', 'ml'
  ],
  risk: [
    // Basis-Risk
    'risiko', 'risk', 'gefahr', 'problem', 'compliance', 'audit', 'datenschutz', 
    'gdpr', 'legal', 'regulatorisch', 'bnetza', 'gesetz', 'verordnung',
    'haftung', 'sicherheit', 'vulnerability', 'threat',
    //export type Item = {
  id: number
  text: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  category: 'GENERAL' | 'BUSINESS' | 'RISK' | 'TERMIN' | 'KNOWLEDGE'
  confidence: number
  matchedKeywords?: string[] // NEW: Welche Keywords haben getriggert
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
  // NEW: Feedback-System
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
    basis: string // NEW: Basis der Empfehlung
  }>
  performanceMetrics: {
    knowledgeToActionRatio: number
    businessFocusScore: number
    riskManagementCoverage: number
    workLifeIntegration: number
    // NEW: Qualitäts-Metriken
    categorizationAccuracy: number
    keywordCoverage: number
  }
}

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

// MASSIV ERWEITERTE KEYWORD-SETS basierend auf echter Nutzereingabe
const keywordSets = {
  urgent: [
    'urgent', 'asap', 'sofort', 'dringend', 'wichtig', 'deadline', 'kritisch', 
    'morgen', 'heute', 'eilig', 'priority', 'offen', 'muss'
  ],
  termine: [
    // Basis-Termine
    'termin', 'meeting', 'call', 'besprechung', 'datum', 'uhr', 'kick-off', 
    'donnerstag', 'freitag', 'montag', 'dienstag', 'mittwoch', 'samstag', 'sonntag',
    'workshop', 'konferenz', 'presentation', 'demo', 'review',
    // Neue: Geschäftstermine
    'vorstellung', 'firma', 'gespräch', 'gespräche', 'mitarbeiterversammlung',
    'wirtschaftsförderung', 'akademie', 'weiterbildung', 'seminar'
  ],
  knowledge: [
    // Basis-Learning
    'lernen', 'research', 'studium', 'wissen', 'analyse', 'workshop', 'kurs', 
    'lesen', 'paper', 'buch', 'training', 'fortbildung', 'weiterbildung',
    'skill', 'kompetenz', 'expertise', 'zertifikat',
    // Neue: KI-spezifisch
    'iso', 'iec', 'standard', 'spezialisierung', 'orchestrierung', 'bedienung', 
    'governance', 'prompting', 'prompt', 'automationen', 'agentic ai', 'agenten',
    'ki', 'ai', 'artificial intelligence', 'machine learning', 'ml'
  ],
  risk: [
    // Basis-Risk
    'risiko', 'risk', 'gefahr', 'problem', 'compliance', 'audit', 'datenschutz', 
    'gdpr', 'legal', 'regulatorisch', 'bnetza', 'gesetz', 'verordnung',
    'haftung', 'sicherheit', 'vulnerability', 'threat',
    // Neue: Pain Points & Probleme
    'pain points', 'problemfelder', 'herausforderung', 'schwierigkeit'
  ],
  business: [
    // Basis-Business
    'business', 'idee', 'plan', 'beratung', 'monetar', 'einkommen', 'kunde', 
    'markt', 'umsatz', 'gewinn', 'roi', 'investment', 'strategie',
    'marketing', 'verkauf', 'akquisition', 'expansion',
    // Neue: Prozesse & Strukturen
    'anwendungsfälle', 'controlling', 'vertrieb', 'abrechnung', 'prozesse',
    'unternehmenskommunikation', 'abteilungen', 'priorisierung', 'ansprechpartner',
    'beraterfirmen', 'externe', 'vorbereitung', 'neuaufstellung', 'leitfaden'
  ],
  // Tasks/Setup - Neue Kategorie
  setup: [
    'setup', 'installation', 'konfiguration', 'laptop', 'google konto',
    'checkliste', 'formular', 'anwendungsanweisung', 'liste erstellen',
    'recherche', 'abfrage'
  ],
  // Energie-spezifische Keywords
  energy: [
    'energie', 'strom', 'gas', 'stadtwerke', 'smart grid', 'renewable',
    'photovoltaik', 'windkraft', 'energieprognose', 'netzbetrieb', 'eeg',
    'kwk', 'fernwärme', 'blockchain', 'e-mobility', 'speicher',
    // Neue: Spezifische Unternehmen
    'wemag', 'dotsource', 'rostock', 'innocampus'
  ]
}

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

    // Priority-Check (affects all categories)
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

    // Category Detection mit Scoring
    let categoryScores = {
      business: 0,
      risk: 0,
      termine: 0,
      knowledge: 0,
      energy: 0
    }

    // Score each category
    Object.entries(keywordSets).forEach(([cat, keywords]) => {
      if (cat === 'urgent') return // Skip urgent, already handled
      
      keywords.forEach(keyword => {
        if (lower.includes(keyword)) {
          matchedKeywords.push(keyword)
          categoryScores[cat as keyof typeof categoryScores] += 1
          confidence += 0.1
        }
      })
    })

    // Determine best category
    const bestCategory = Object.entries(categoryScores).reduce((a, b) => 
      categoryScores[a[0] as keyof typeof categoryScores] > categoryScores[b[0] as keyof typeof categoryScores] ? a : b
    )[0]

    const maxScore = categoryScores[bestCategory as keyof typeof categoryScores]

    if (maxScore === 0) {
      uncategorized.push(line)
      category = 'GENERAL'
      confidence = 0.3
    } else if (maxScore === 1) {
      // Low confidence - single keyword match
      confidence = Math.min(confidence, 0.7)
    }

    // Map to our categories
    switch (bestCategory) {
      case 'business':
        category = 'BUSINESS'
        break
      case 'risk':
        category = 'RISK'
        priority = 'HIGH' // Risk items are always high priority
        break
      case 'termine':
        category = 'TERMIN'
        break
      case 'knowledge':
        category = 'KNOWLEDGE'
        break
    }

    const item: Item = { 
      id: index, 
      text: line.trim(), 
      priority, 
      category, 
      confidence: Math.min(confidence, 1.0),
      matchedKeywords 
    }

    // Track low confidence items
    if (confidence < 0.6) {
      lowConfidence.push(item)
    }

    // Distribute to arrays
    switch (category) {
      case 'BUSINESS':
        business.push(item)
        break
      case 'RISK':
        risiken.push(item)
        break
      case 'TERMIN':
        termine.push(item)
        break
      case 'KNOWLEDGE':
        knowledge.push(item)
        break
      default:
        todos.push(item)
    }
  })

  // Generate suggestions
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
    todos, 
    termine, 
    knowledge, 
    risiken, 
    business, 
    insights,
    categorizationFeedback: {
      uncategorized,
      lowConfidence,
      suggestions
    }
  }
}

export function generateFallbackAIAnalysis(basic: BasicAnalysis): AIAnalysis {
  // Dynamically extract energy-related items from actual data
  const allItems = [...basic.todos, ...basic.termine, ...basic.knowledge, ...basic.risiken, ...basic.business]
  const energyDetectedItems = allItems.filter(item => 
    keywordSets.energy.some(keyword => 
      item.text.toLowerCase().includes(keyword)
    )
  ).map(item => ({
    text: item.text,
    insight: 'Direkt aus Ihren Eingabedaten erkannt',
    businessPotential: 'Konkretes Business-Potenzial im Energiesektor',
    source: 'detected' as const
  }))

  // Add static items if no energy items detected
  const staticEnergyItems = energyDetectedItems.length === 0 ? [
    { text: 'Smart Grid Implementation', insight: 'Core infrastructure transformation', businessPotential: 'Consulting opportunity for other utilities', source: 'static' as const },
    { text: 'Energy Forecasting ML', insight: 'Direct operational improvement', businessPotential: 'Proprietary algorithm development', source: 'static' as const }
  ] : []

  // Calculate REAL performance metrics based on data
  const totalItems = basic.insights.totalItems
  const knowledgeToActionRatio = totalItems > 0 ? Math.round((basic.knowledge.length / totalItems) * 100) : 0
  const businessFocusScore = totalItems > 0 ? Math.round((basic.business.length / totalItems) * 100) : 0
  const riskManagementCoverage = totalItems > 0 ? Math.round((basic.risiken.length / totalItems) * 100) : 0
  
  // Work-Life Balance basiert auf erkannten Balance-Keywords
  const workLifeIntegration = allItems.filter(item => 
    item.text.toLowerCase().includes('yoga') || 
    item.text.toLowerCase().includes('mindfulness') ||
    item.text.toLowerCase().includes('balance') ||
    item.text.toLowerCase().includes('mittag')
  ).length > 0 ? 80 : 40

  // NEUE: Qualitäts-Metriken basierend auf Feedback
  const categorizationAccuracy = totalItems > 0 ? 
    Math.round(((totalItems - basic.categorizationFeedback.lowConfidence.length) / totalItems) * 100) : 90
  const keywordCoverage = totalItems > 0 ?
    Math.round(((totalItems - basic.categorizationFeedback.uncategorized.length) / totalItems) * 100) : 100

  // Generate DYNAMIC recommendations based on actual data
  const recommendations = []
  
  if (basic.business.length > 0) {
    recommendations.push({
      type: 'STRATEGIC' as const,
      title: 'BUSINESS OPPORTUNITIES DETECTED',
      message: `${basic.business.length} Business-Items gefunden. KI-Beratung & Anwendungsfälle zeigen Monetarisierungspotential.`,
      confidence: Math.min(95, 60 + basic.business.length * 8),
      basis: `Erkannte Business-Keywords: ${basic.business.flatMap(b => b.matchedKeywords || []).slice(0,3).join(', ')}`
    })
  }

  if (basic.risiken.length > 1) {
    recommendations.push({
      type: 'RISK' as const,
      title: 'COMPLIANCE & GOVERNANCE CLUSTER',
      message: `${basic.risiken.length} Risiko-Items erkannt. KI-Governance wird kritisch wichtig.`,
      confidence: Math.min(95, 70 + basic.risiken.length * 8),
      basis: `Pain Points & Compliance-Keywords in Ihren Daten erkannt`
    })
  }

  if (basic.knowledge.length > basic.todos.length + basic.business.length) {
    recommendations.push({
      type: 'PERFORMANCE' as const,
      title: 'LEARNING-TO-ACTION IMBALANCE',
      message: 'Viel KI-Wissen (Prompting, Governance) aber wenig konkrete Umsetzung. Action-Items priorisieren!',
      confidence: 85,
      basis: `Knowledge Items (${basic.knowledge.length}) > Action Items (${basic.todos.length + basic.business.length})`
    })
  }

  // NEUE: Termin-basierte Empfehlung
  if (basic.termine.length >= 4) {
    recommendations.push({
      type: 'STRATEGIC' as const,
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
          severity: basic.risiken.some(r => r.priority === 'HIGH') ? 'critical' as const : 'high' as const
        }
      ] : []
    },
    intelligentPrioritization: {
      criticalPath: basic.risiken.filter(r => r.priority === 'HIGH').map(item => ({
        item: item.text,
        reasoning: 'High-priority compliance/risk item - KI-Governance kritisch',
        deadline: item.text.toLowerCase().includes('morgen') ? 'TOMORROW' : 
                 item.text.toLowerCase().includes('offen') ? 'ASAP' : 'This week'
      })),
      workLifeBalance: allItems.filter(item => 
        item.text.toLowerCase().includes('mittag') || 
        item.text.toLowerCase().includes('balance') ||
        item.text.toLowerCase().includes('mitarbeiterversammlung')
      ).map(item => ({
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
