import React, { useEffect, useRef, useState } from 'react'
import { Brain, AlertCircle, Target, Zap, DollarSign, Users, TrendingUp, Plus, FileText } from 'lucide-react'
import TaskInput from './TaskInput'
import {
  performBasicAnalysis,
  generateFallbackAIAnalysis,
  exampleContent,
  type BasicAnalysis,
  type AIAnalysis,
} from '../lib/analysis'

type ViewMode = 'dashboard' | 'input'

export default function BrutalAIDashboard() {
  const [viewMode, setViewMode] = useState<ViewMode>('dashboard')
  const [file, setFile] = useState<{ name: string } | File>({ name: 'SYSTEM_READY.txt' })
  const [analysis, setAnalysis] = useState<BasicAnalysis | null>(null)
  const [aiAnalysis, setAIAnalysis] = useState<AIAnalysis | null>(null)
  const [loading, setLoading] = useState(false)
  const runIdRef = useRef(0)

  useEffect(() => {
    const runId = ++runIdRef.current
    try {
      const basic = performBasicAnalysis(exampleContent)
      if (runId === runIdRef.current) setAnalysis(basic)
      const fallback = generateFallbackAIAnalysis(basic)
      if (runId === runIdRef.current) setAIAnalysis(fallback)
    } catch (err) {
      console.error('INIT ERROR', err)
      if (runId === runIdRef.current) {
        setAnalysis({
          todos: [],
          termine: [],
          knowledge: [],
          risiken: [],
          business: [],
          insights: {
            totalItems: 0,
            priorityDistribution: { high: 0, medium: 0, low: 0 },
            categoryDistribution: { todos: 0, termine: 0, knowledge: 0, risiken: 0, business: 0 },
          },
        })
      }
    }
  }, [])

  async function handleFileUpload(ev: React.ChangeEvent<HTMLInputElement>) {
    const uploaded = ev.target.files?.[0]
    if (!uploaded) return
    if (!uploaded.name.toLowerCase().endsWith('.txt')) {
      alert('TXT FILES ONLY. NO EXCEPTIONS.')
      return
    }
    setFile(uploaded)
    setLoading(true)
    const runId = ++runIdRef.current
    try {
      const content = await uploaded.text()
      const basic = performBasicAnalysis(content)
      if (runId === runIdRef.current) setAnalysis(basic)
      const fallback = generateFallbackAIAnalysis(basic)
      if (runId === runIdRef.current) setAIAnalysis(fallback)
    } catch (e) {
      console.error('FILE READ ERROR', e)
      alert('FILE READ ERROR. SYSTEM FAILURE.')
    } finally {
      if (runId === runIdRef.current) setLoading(false)
    }
  }

  function resetToExample() {
    setFile({ name: 'EXAMPLE_DATASET_LOADED.txt' })
    setLoading(true)
    const runId = ++runIdRef.current
    const timer = setTimeout(() => {
      try {
        const basic = performBasicAnalysis(exampleContent)
        if (runId === runIdRef.current) setAnalysis(basic)
        const fallback = generateFallbackAIAnalysis(basic)
        if (runId === runIdRef.current) setAIAnalysis(fallback)
      } finally {
        if (runId === runIdRef.current) setLoading(false)
      }
    }, 700)
    return () => clearTimeout(timer)
  }

  const handleSaveFromInput = (content: string) => {
    setLoading(true)
    const runId = ++runIdRef.current
    setFile({ name: 'MANUAL_INPUT.txt' })
    
    setTimeout(() => {
      try {
        const basic = performBasicAnalysis(content)
        if (runId === runIdRef.current) setAnalysis(basic)
        const fallback = generateFallbackAIAnalysis(basic)
        if (runId === runIdRef.current) setAIAnalysis(fallback)
        setViewMode('dashboard')
      } finally {
        if (runId === runIdRef.current) setLoading(false)
      }
    }, 500)
  }

  if (viewMode === 'input') {
    return (
      <TaskInput
        onSave={handleSaveFromInput}
        onBack={() => setViewMode('dashboard')}
        initialContent={exampleContent}
      />
    )
  }

  if (!analysis) {
    return (
      <div className="min-h-screen bg-gray-50 font-sans">
        <section className="px-4 py-6 md:px-8 md:py-10 max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight font-sans mb-4">
              AI PLANER DASHBOARD
            </h1>
            <p className="text-sm text-gray-600 font-sans">INITIALIZING SYSTEM...</p>
            
            <div className="bg-yellow-200 border-2 border-black rounded p-4 mt-6">
              <p className="font-bold text-sm uppercase">LOADING LOCAL INTELLIGENCE ENGINE</p>
            </div>
          </div>

          <div className="bg-white border-2 border-black rounded p-8 text-center">
            <div className="bg-black text-white w-16 h-16 mx-auto mb-6 flex items-center justify-center rounded animate-pulse">
              <Brain className="w-8 h-8" />
            </div>
            <h2 className="text-lg font-bold uppercase mb-4">SYSTEM STARTUP</h2>
            <p className="text-sm text-gray-600 font-sans">
              LOADING EXAMPLE DATA... AI INTELLIGENCE ACTIVATING...
            </p>
          </div>
        </section>
      </div>
    )
  }

  const pm = aiAnalysis?.performanceMetrics ?? {
    knowledgeToActionRatio: 0,
    businessFocusScore: 0,
    riskManagementCoverage: 0,
    workLifeIntegration: 0,
  }

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <section className="px-4 py-6 md:px-8 md:py-10 max-w-7xl mx-auto">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8">
          <div className="mb-4 md:mb-0">
            <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight font-sans mb-2">
              AI PLANER DASHBOARD
            </h1>
            <p className="text-sm text-gray-600 font-sans mb-1">
              FILE: {'name' in file ? file.name : 'unknown'}
            </p>
            <p className="text-sm text-gray-600 font-sans">
              RISIKOMANAGER | ENERGIEVERSORGER | KI-IMPLEMENTIERUNG
            </p>
          </div>
          
          <div className="flex flex-col md:flex-row gap-2">
            <button
              onClick={() => setViewMode('input')}
              className="bg-black text-white font-bold py-3 px-4 rounded-lg uppercase text-sm tracking-tight hover:bg-gray-900 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Neu Eingeben
            </button>
            
            <button
              onClick={resetToExample}
              disabled={loading}
              className="bg-gray-100 text-black font-bold py-2 px-3 border-2 border-black rounded-md uppercase text-sm hover:bg-gray-200 disabled:opacity-60"
            >
              Demo Data
            </button>
            
            <label className="bg-gray-100 text-black font-bold py-2 px-3 border-2 border-black rounded-md uppercase text-sm hover:bg-gray-200 cursor-pointer text-center">
              <FileText className="inline w-4 h-4 mr-2" />
              Datei
              <input
                type="file"
                accept=".txt,text/plain"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* System Status */}
        <div className="bg-yellow-200 border-2 border-black rounded p-4 mb-8">
          <div className="text-sm font-bold uppercase">
            SYSTEM STATUS: {loading ? 'PROCESSING...' : 'OPERATIONAL'} | MODE: LOCAL INTELLIGENCE | {new Date().toLocaleTimeString()}
          </div>
        </div>

        {/* Overview Metrics */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white border-2 border-black rounded p-6 text-center font-sans">
            <div className="text-xl">📊</div>
            <div className="text-2xl font-bold mt-2">{analysis.insights.totalItems}</div>
            <div className="text-sm uppercase mt-1 text-gray-600">Total</div>
          </div>

          <div className="bg-white border-2 border-black rounded p-6 text-center font-sans">
            <div className="text-xl">🚨</div>
            <div className="text-2xl font-bold mt-2 text-red-600">
              {analysis.insights.priorityDistribution.high}
            </div>
            <div className="text-sm uppercase mt-1 text-gray-600">Kritisch</div>
          </div>

          <div className="bg-white border-2 border-black rounded p-6 text-center font-sans">
            <div className="text-xl">⚠️</div>
            <div className="text-2xl font-bold mt-2 text-orange-600">
              {analysis.insights.categoryDistribution.risiken}
            </div>
            <div className="text-sm uppercase mt-1 text-gray-600">Risiken</div>
          </div>

          <div className="bg-white border-2 border-black rounded p-6 text-center font-sans">
            <div className="text-xl">💰</div>
            <div className="text-2xl font-bold mt-2 text-green-600">
              {analysis.insights.categoryDistribution.business}
            </div>
            <div className="text-sm uppercase mt-1 text-gray-600">Business</div>
          </div>
        </div>

        {/* Performance Metrics */}
        {aiAnalysis?.performanceMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-green-100 border-2 border-black rounded p-6 text-center font-sans">
              <div className="text-2xl font-bold text-black">{pm.knowledgeToActionRatio}%</div>
              <div className="text-sm uppercase mt-1 text-gray-600">Know/Act</div>
            </div>

            <div className="bg-blue-100 border-2 border-black rounded p-6 text-center font-sans">
              <div className="text-2xl font-bold text-black">{pm.businessFocusScore}%</div>
              <div className="text-sm uppercase mt-1 text-gray-600">Business</div>
            </div>

            <div className="bg-yellow-100 border-2 border-black rounded p-6 text-center font-sans">
              <div className="text-2xl font-bold text-black">{pm.riskManagementCoverage}%</div>
              <div className="text-sm uppercase mt-1 text-gray-600">Risk Cov</div>
            </div>

            <div className="bg-purple-100 border-2 border-black rounded p-6 text-center font-sans">
              <div className="text-2xl font-bold text-black">{pm.workLifeIntegration}%</div>
              <div className="text-sm uppercase mt-1 text-gray-600">W/L Balance</div>
            </div>
          </div>
        )}

        {/* AI Recommendations */}
        {aiAnalysis && (
          <div className="bg-black border-2 border-black rounded p-6 mb-8">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-6 text-white flex items-center">
              <Brain className="mr-3 text-yellow-400" />
              KI EMPFEHLUNGEN
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {(aiAnalysis?.predictiveRecommendations ?? []).map((rec, idx) => (
                <div
                  key={idx}
                  className={`border-2 border-black rounded p-4 ${
                    rec.type === 'STRATEGIC'
                      ? 'bg-blue-100'
                      : rec.type === 'RISK'
                      ? 'bg-red-100'
                      : rec.type === 'BUSINESS'
                      ? 'bg-green-100'
                      : 'bg-yellow-100'
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between">
                    <div className="flex-1">
                      <div className="font-bold text-black mb-1">
                        [{rec.type}] {rec.title}
                      </div>
                      <div className="text-sm text-gray-600 font-sans">{rec.message}</div>
                    </div>
                    <div className="text-right mt-2 md:mt-0 md:ml-4">
                      <div className="text-xl font-bold text-black">{rec.confidence}%</div>
                      <div className="text-sm text-gray-600 font-sans">Konfidenz</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Content Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Critical Tasks */}
          <div className="bg-white border-2 border-black rounded p-6">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4 flex items-center">
              <AlertCircle className="mr-3 text-red-500" />
              Kritische Aufgaben [{analysis.todos.filter(i => i.priority === 'HIGH').length + analysis.risiken.length}]
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {[...analysis.todos.filter(i => i.priority === 'HIGH'), ...analysis.risiken].map(item => (
                <div key={item.id} className="bg-red-100 border-2 border-black rounded p-3">
                  <span className="text-xs font-bold uppercase bg-red-200 text-black rounded-full px-2 py-1 mr-2">
                    {item.category}
                  </span>
                  <div className="text-sm text-gray-600 font-sans mt-2">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Business Opportunities */}
          <div className="bg-white border-2 border-black rounded p-6">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4 flex items-center">
              <TrendingUp className="mr-3 text-green-500" />
              Business Entwicklung [{analysis.business.length}]
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analysis.business.map(item => (
                <div key={item.id} className="bg-green-100 border-2 border-black rounded p-3">
                  <span className="text-xs font-bold uppercase bg-green-200 text-black rounded-full px-2 py-1 mr-2">
                    Business
                  </span>
                  <div className="text-sm text-gray-600 font-sans mt-2">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          
          {/* Knowledge Items */}
          <div className="bg-white border-2 border-black rounded p-6">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4 flex items-center">
              <Target className="mr-3 text-purple-500" />
              Wissens-Entwicklung [{analysis.knowledge.length}]
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analysis.knowledge.map(item => (
                <div
                  key={item.id}
                  className={`border-2 border-black rounded p-3 ${item.priority === 'HIGH' ? 'bg-yellow-100' : 'bg-purple-100'}`}
                >
                  <span className="text-xs font-bold uppercase bg-purple-200 text-black rounded-full px-2 py-1 mr-2">
                    Lernen
                  </span>
                  <div className="text-sm text-gray-600 font-sans mt-2">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Meetings */}
          <div className="bg-white border-2 border-black rounded p-6">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4 flex items-center">
              <Users className="mr-3 text-blue-500" />
              Termine & Meetings [{analysis.termine.length}]
            </h2>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {analysis.termine.map(item => (
                <div
                  key={item.id}
                  className={`border-2 border-black rounded p-3 ${item.priority === 'HIGH' ? 'bg-yellow-100' : 'bg-blue-100'}`}
                >
                  <span className="text-xs font-bold uppercase bg-blue-200 text-black rounded-full px-2 py-1 mr-2">
                    Termin
                  </span>
                  <div className="text-sm text-gray-600 font-sans mt-2">{item.text}</div>
                </div>
              ))}
            </div>
          </div>

        </div>

        {/* Energy Domain Analysis */}
        {aiAnalysis && (
          <div className="bg-white border-2 border-black rounded p-6 mb-8">
            <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4 flex items-center">
              <Zap className="mr-3 text-yellow-500" />
              Energie-Sektor Analyse
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(aiAnalysis?.semanticInsights?.energyDomainItems ?? []).map((item, index) => (
                <div key={index} className="bg-yellow-100 border-2 border-black rounded p-4">
                  <h3 className="font-bold text-sm mb-2">{item.text}</h3>
                  <p className="text-sm text-gray-600 font-sans">{item.businessPotential}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="bg-black border-2 border-black rounded p-4 text-center">
          <div className="text-white text-sm font-bold">
            SYSTEM: LOCAL INTELLIGENCE | STATUS: {loading ? 'PROCESSING' : 'READY'} | SESSION: {new Date().toLocaleDateString()}
          </div>
        </div>

      </section>
    </div>
  )
}
