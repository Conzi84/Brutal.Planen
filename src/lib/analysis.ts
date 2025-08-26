export type Item = {
  id: number
  text: string
  priority: 'HIGH' | 'MEDIUM' | 'LOW'
  category: 'GENERAL' | 'BUSINESS' | 'RISK' | 'TERMIN' | 'KNOWLEDGE'
  confidence: number
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
}

export type AIAnalysis = {
  semanticInsights: {
    energyDomainItems: Array<{ text: string; insight?: string; businessPotential: string }>
    tradingRelated: Array<{ text: string; marketTiming: string; riskLevel: string }>
    businessOpportunities: Array<{ text: string; monetizationPotential: string; effort?: string }>
    riskClusters: Array<{ cluster: string; items: string[]; severity: 'critical' | 'high' | 'medium' }>
  }
  intelligentPrioritization: {
    criticalPath: Array<{ item: string; reasoning: string; deadline: string }>
    workLifeBalance: Array<{ item: string; balanceImpact: 'positive' | 'negative'; recommendation: string }>
    regulatoryUrgency: Array<{ item: string; complianceRisk: 'CRITICAL' | 'HIGH' | 'MEDIUM'; action: string }>
  }
  predictiveRecommendations: Array<{ type: 'STRATEGIC' | 'RISK' | 'BUSINESS' | 'PERFORMANCE'; title: string; message: string; confidence: number }>
  performanceMetrics: {
    knowledgeToActionRatio: number
    businessFocusScore: number
    riskManagementCoverage: number
    workLifeIntegration: number
  }
}

export const exampleContent = `KI-Strategieplan für Q2 finalisieren - regulatorische Deadline 15. März
Meeting mit Stadtwerke-Vorstand Donnerstag 14:00 - Digitalisierungsbudget verhandeln
Research: Machine Learning für Energieprognosen - Wettbewerbsvorteil schaffen
Trading Setup: Intraday Stromfutures Volatilitätsstrategie optimieren - wichtig
Mindfulness Session nach stressigem Handelstag einplanen - Work-Life Balance
Business Idee: KI-Prompting Kurse für Studenten entwickeln - Nebeneinkommen
Compliance Audit: GDPR für neue KI-Tools - Rechtsrisiko minimieren
Innovation Lab Kick-off Freitag - Blockchain für Smart Grid evaluieren
Deep Learning Workshop buchen - Skillbuilding für Energieprognosen
Datenschutz-Impact-Assessment für ML-Algorithmen vorbereiten - kritisch
Position Management: Strommarkt Hedging-Strategien verfeinern
Call IT-Security 16:30 - KI-Governance Framework definieren
Renewable Energy Forecasting Paper lesen - technisches Wissen erweitern
Legacy System Integration Problem - KI-Tools Kompatibilität prüfen
Business Plan Draft: KI-Beratung für kleinere Stadtwerke erstellen
Yoga Session heute Abend - Stressmanagement nach volatilen Markets
Risikomanagement Quarterly Review vorbereiten - Vorstandspräsentation
Marktanalyse: Energy-AI-Solutions Competitive Landscape
Stadtwerke Roadmap Meeting - Transformation Strategy diskutieren
Regulatory Report BNetzA Meldung fertigstellen - deadline morgen
Student anfragen: Masterarbeit über KI im Energiesektor betreuen
Trading Journal analysieren - Performance Patterns identifizieren
Prompt Engineering Guide für Energiebranche schreiben - Content Marketing`

export function performBasicAnalysis(content: string): BasicAnalysis {
  const lines = content.split('\n').filter(line => line.trim())

  const todos: Item[] = []
  const termine: Item[] = []
  const knowledge: Item[] = []
  const risiken: Item[] = []
  const business: Item[] = []

  const urgentKeywords = ['urgent', 'asap', 'sofort', 'dringend', 'wichtig', 'deadline', 'kritisch', 'morgen']
  const terminKeywords = ['termin', 'meeting', 'call', 'besprechung', 'datum', 'uhr', 'kick-off', 'donnerstag', 'freitag']
  const knowledgeKeywords = ['lernen', 'research', 'studium', 'wissen', 'analyse', 'workshop', 'kurs', 'lesen', 'paper', 'buch']
  const riskKeywords = ['risiko', 'risk', 'gefahr', 'problem', 'compliance', 'audit', 'datenschutz', 'gdpr', 'legal']
  const businessKeywords = ['business', 'idee', 'plan', 'beratung', 'monetar', 'einkommen', 'kunde', 'markt']

  lines.forEach((line, index) => {
    const lower = line.toLowerCase()
    const priority: Item['priority'] = urgentKeywords.some(k => lower.includes(k)) ? 'HIGH' : 'MEDIUM'
    const item: Item = { id: index, text: line.trim(), priority, category: 'GENERAL', confidence: 0.8 }

    if (businessKeywords.some(k => lower.includes(k))) {
      item.category = 'BUSINESS'
      business.push(item)
    } else if (riskKeywords.some(k => lower.includes(k))) {
      item.category = 'RISK'
      item.priority = 'HIGH'
      risiken.push(item)
    } else if (terminKeywords.some(k => lower.includes(k))) {
      item.category = 'TERMIN'
      termine.push(item)
    } else if (knowledgeKeywords.some(k => lower.includes(k))) {
      item.category = 'KNOWLEDGE'
      knowledge.push(item)
    } else {
      todos.push(item)
    }
  })

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

  return { todos, termine, knowledge, risiken, business, insights }
}

export function generateFallbackAIAnalysis(basic: BasicAnalysis): AIAnalysis {
  return {
    semanticInsights: {
      energyDomainItems: [
        { text: 'Smart Grid Implementation', insight: 'Core infrastructure transformation', businessPotential: 'Consulting opportunity for other utilities' },
        { text: 'Energy Forecasting ML', insight: 'Direct operational improvement', businessPotential: 'Proprietary algorithm development' },
        { text: 'Renewable Energy Analysis', insight: 'Future energy mix strategy', businessPotential: 'Expertise monetization through training' }
      ],
      tradingRelated: [
        { text: 'Intraday Futures Strategy', marketTiming: 'Volatility requires immediate optimization', riskLevel: 'HIGH - Capital at risk' },
        { text: 'Hedging Strategies', marketTiming: 'Critical in volatile markets', riskLevel: 'MEDIUM - Protection' },
        { text: 'Trading Journal Analysis', marketTiming: 'Enables strategy refinement', riskLevel: 'LOW - Learning focus' }
      ],
      businessOpportunities: [
        { text: 'KI-Prompting Kurse', monetizationPotential: 'Direct revenue through education', effort: 'medium' },
        { text: 'AI Consulting Stadtwerke', monetizationPotential: 'B2B expertise monetization', effort: 'high' },
        { text: 'Content Marketing', monetizationPotential: 'Authority + lead generation', effort: 'low' }
      ],
      riskClusters: [
        { cluster: 'Regulatory Compliance', items: ['GDPR Audit', 'BNetzA Meldung'], severity: 'critical' },
        { cluster: 'Technology Integration', items: ['Legacy System Problems'], severity: 'high' },
        { cluster: 'Market Risk', items: ['Trading Strategy Optimization'], severity: 'medium' }
      ]
    },
    intelligentPrioritization: {
      criticalPath: [
        { item: 'Regulatory Report deadline morgen', reasoning: 'Legal compliance cannot be delayed', deadline: 'TOMORROW' },
        { item: 'GDPR KI-Tools Audit', reasoning: 'Regulatory risk exposure', deadline: '2 weeks' },
        { item: 'Vorstand Digitalisierungsbudget', reasoning: 'Strategic funding decision', deadline: 'This week' }
      ],
      workLifeBalance: [
        { item: 'Mindfulness Session', balanceImpact: 'positive', recommendation: 'After trading hours' },
        { item: 'Yoga Session', balanceImpact: 'positive', recommendation: 'Stress relief after volatile days' },
        { item: 'Trading Setup Optimization', balanceImpact: 'negative', recommendation: 'Time-box to prevent overwork' }
      ],
      regulatoryUrgency: [
        { item: 'BNetzA Report', complianceRisk: 'CRITICAL', action: 'Complete immediately' },
        { item: 'GDPR Assessment', complianceRisk: 'HIGH', action: 'Schedule within 14 days' },
        { item: 'IT-Security Framework', complianceRisk: 'MEDIUM', action: 'Coordinate with compliance team' }
      ]
    },
    predictiveRecommendations: [
      { type: 'STRATEGIC', title: 'AI EXPERTISE MONETIZATION', message: 'Unique combo (risk mgmt + AI + energy) → premium consulting', confidence: 95 },
      { type: 'RISK', title: 'COMPLIANCE CLUSTER RISK', message: 'Multiple regulatory deadlines converging', confidence: 90 },
      { type: 'BUSINESS', title: 'STUDENT MARKET UNTAPPED', message: 'Growing demand for AI prompting skills', confidence: 85 },
      { type: 'PERFORMANCE', title: 'KNOWLEDGE-TO-ACTION', message: 'Convert learning to implementation for ROI', confidence: 80 }
    ],
    performanceMetrics: {
      knowledgeToActionRatio: 75,
      businessFocusScore: 60,
      riskManagementCoverage: 85,
      workLifeIntegration: 70
    }
  }
}

