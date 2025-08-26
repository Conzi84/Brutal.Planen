import React, { useEffect, useRef, useState } from 'react'
import { Brain, TrendingUp, AlertCircle, Target, Zap, DollarSign, Users } from 'lucide-react'
import {
  performBasicAnalysis,
  generateFallbackAIAnalysis,
  exampleContent,
  type BasicAnalysis,
  type AIAnalysis,
} from '../lib/analysis'

export default function BrutalAIDashboard() {
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

  if (!analysis) {
    return (
      <div className="min-h-screen bg-white p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h1 className="text-4xl md:text-6xl font-black text-black mb-4 tracking-tight">BRUTAL AI DASHBOARD</h1>
            <p className="text-lg md:text-xl text-black font-bold">INITIALIZING SYSTEM...</p>
            <div className="bg-yellow-400 brutal-border mt-4 p-2">
              <p className="font-black text-sm md:text-base">LOADING LOCAL INTELLIGENCE ENGINE</p>
            </div>
          </div>

          <div className="bg-white border-8 border-black mb-8">
            <div className="p-8 md:p-12 text-center">
              <div className="w-16 h-16 md:w-24 md:h-24 bg-black mx-auto mb-8 flex items-center justify-center animate-pulse">
                <Brain className="w-8 h-8 md:w-12 md:h-12 text-white" />
              </div>
              <h2 className="text-2xl md:text-3xl font-black mb-4">SYSTEM STARTUP</h2>
              <p className="text-base md:text-lg font-bold mb-8 text-black">
                LOADING EXAMPLE DATA... BRUTAL INTELLIGENCE ACTIVATING...
              </p>
            </div>
          </div>
        </div>
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
    <div className="min-h-screen bg-white p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-8 md:mb-12">
          <div className="mb-4 md:mb-0">
            <h1 className="text-3xl md:text-5xl font-black text-black mb-2 tracking-tight">BRUTAL AI DASHBOARD</h1>
            <p className="text-lg md:text-xl font-bold text-black">FILE: {'name' in file ? file.name : 'unknown'}</p>
            <p className="text-xs md:text-sm font-bold text-gray-600 mt-1">
              RISIKOMANAGER | ENERGIEVERSORGER | KI-IMPLEMENTIERUNG | FUTURES TRADING
            </p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 md:gap-4">
            <button
              onClick={resetToExample}
              disabled={loading}
              className="bg-gray-800 text-white px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-black border-4 border-black hover:bg-gray-700 disabled:opacity-60"
            >
              DEMO DATA
            </button>
            <label className="bg-black text-white px-4 md:px-6 py-2 md:py-3 text-base md:text-lg font-black border-4 border-black hover:bg-gray-800 cursor-pointer text-center">
              NEW FILE
              <input
                type="file"
                accept=".txt,text/plain"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>
        </div>

        {/* SYSTEM STATUS */}
        <div className="bg-yellow-400 brutal-border mb-8">
          <div className="p-3 md:p-4">
            <div className="text-base md:text-xl font-black text-black">
              SYSTEM STATUS: {loading ? 'PROCESSING...' : 'OPERATIONAL'} | MODE: LOCAL INTELLIGENCE |{' '}
              {new Date().toLocaleTimeString()}
            </div>
          </div>
        </div>

        {/* CRITICAL METRICS */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-0 mb-8 md:mb-12">
          <div className="bg-white brutal-border md:border-r-4 border-r-0">
            <div className="p-4 md:p-6 text-center">
              <div className="text-3xl md:text-6xl font-black text-black mb-2">{analysis.insights.totalItems}</div>
              <div className="text-sm md:text-lg font-black text-black">TOTAL</div>
              <div className="text-xs font-bold text-gray-600 mt-2">ITEMS</div>
            </div>
          </div>

          <div className="bg-white brutal-border md:border-r-4 border-r-0">
            <div className="p-4 md:p-6 text-center">
              <div className="text-3xl md:text-6xl font-black text-red-600 mb-2">
                {analysis.insights.priorityDistribution.high}
              </div>
              <div className="text-sm md:text-lg font-black text-black">CRITICAL</div>
              <div className="text-xs font-bold text-gray-600 mt-2">HIGH PRIO</div>
            </div>
          </div>

          <div className="bg-white brutal-border md:border-r-4 border-r-0 col-span-2 md:col-span-1">
            <div className="p-4 md:p-6 text-center">
              <div className="text-3xl md:text-6xl font-black text-yellow-600 mb-2">
                {analysis.insights.categoryDistribution.risiken}
              </div>
              <div className="text-sm md:text-lg font-black text-black">RISKS</div>
              <div className="text-xs font-bold text-gray-600 mt-2">MANAGE</div>
            </div>
          </div>

          <div className="bg-white brutal-border md:block hidden md:border-r-4 border-r-0">
            <div className="p-4 md:p-6 text-center">
              <div className="text-3xl md:text-6xl font-black text-green-600 mb-2">
                {analysis.insights.categoryDistribution.business}
              </div>
              <div className="text-sm md:text-lg font-black text-black">BUSINESS</div>
              <div className="text-xs font-bold text-gray-600 mt-2">OPPORTUNITIES</div>
            </div>
          </div>

          <div className="bg-white brutal-border hidden md:block">
            <div className="p-4 md:p-6 text-center">
              <div className="text-3xl md:text-6xl font-black text-purple-600 mb-2">
                {analysis.insights.categoryDistribution.knowledge}
              </div>
              <div className="text-sm md:text-lg font-black text-black">LEARN</div>
              <div className="text-xs font-bold text-gray-600 mt-2">KNOWLEDGE</div>
            </div>
          </div>
        </div>

        {/* AI PERFORMANCE METRICS */}
        {aiAnalysis?.performanceMetrics && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-0 mb-8 md:mb-12">
            <div className="bg-green-400 brutal-border md:border-r-0">
              <div className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-black text-black mb-2">
                  {pm.knowledgeToActionRatio}%
                </div>
                <div className="text-sm md:text-lg font-black text-black">KNOW/ACT</div>
              </div>
            </div>

            <div className="bg-blue-400 brutal-border md:border-r-0">
              <div className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-black text-black mb-2">
                  {pm.businessFocusScore}%
                </div>
                <div className="text-sm md:text-lg font-black text-black">BUSINESS</div>
              </div>
            </div>

            <div className="bg-yellow-400 brutal-border md:border-r-0">
              <div className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-black text-black mb-2">
                  {pm.riskManagementCoverage}%
                </div>
                <div className="text-sm md:text-lg font-black text-black">RISK COV</div>
              </div>
            </div>

            <div className="bg-purple-400 brutal-border">
              <div className="p-4 md:p-6 text-center">
                <div className="text-2xl md:text-3xl font-black text-black mb-2">
                  {pm.workLifeIntegration}%
                </div>
                <div className="text-sm md:text-lg font-black text-black">W/L BALANCE</div>
              </div>
            </div>
          </div>
        )}

        {/* AI / LOCAL INTELLIGENCE ENGINE */}
        {aiAnalysis && (
          <div className="bg-black border-8 border-black mb-8 md:mb-12">
            <div className="p-6 md:p-8">
              <h2 className="text-2xl md:text-3xl font-black mb-6 text-white flex items-center">
                <Brain className="mr-4 text-yellow-400" />
                LOCAL INTELLIGENCE ENGINE
              </h2>
              <div className="grid grid-cols-1 gap-4">
                {(aiAnalysis?.predictiveRecommendations ?? []).map((rec, idx) => (
                  <div
                    key={idx}
                    className={`border-4 border-white p-4 ${
                      rec.type === 'STRATEGIC'
                        ? 'bg-blue-400'
                        : rec.type === 'RISK'
                        ? 'bg-red-400'
                        : rec.type === 'BUSINESS'
                        ? 'bg-green-400'
                        : 'bg-yellow-400'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between">
                      <div className="flex-1">
                        <div className="text-lg md:text-xl font-black text-black mb-1">
                          [{rec.type}] {rec.title}
                        </div>
                        <div className="font-bold text-black text-sm md:text-base">{rec.message}</div>
                      </div>
                      <div className="text-right mt-2 md:mt-0 md:ml-4">
                        <div className="text-lg md:text-2xl font-black text-black">{rec.confidence}%</div>
                        <div className="text-xs font-bold text-black">CONFIDENCE</div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SEMANTIC INSIGHTS */}
        {aiAnalysis && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8 md:mb-12">
            <div className="bg-blue-400 brutal-border md:border-r-4 border-r-0">
              <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-black flex items-center">
                  <Zap className="mr-2" />
                  ENERGY DOMAIN ANALYSIS
                </h2>
                <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                  {(aiAnalysis?.semanticInsights?.energyDomainItems ?? []).map((item, index) => (
                    <div key={index} className="bg-white border-2 border-black p-3">
                      <div className="font-bold text-black text-xs md:text-sm mb-1">{item.text}</div>
                      <div className="text-xs text-gray-700 font-medium">{item.businessPotential}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-green-400 brutal-border">
              <div className="p-4 md:p-6">
                <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-black flex items-center">
                  <DollarSign className="mr-2" />
                  BUSINESS INTELLIGENCE
                </h2>
                <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                  {(aiAnalysis?.semanticInsights?.businessOpportunities ?? []).map((item, index) => (
                    <div key={index} className="bg-white border-2 border-black p-3">
                      <div className="font-bold text-black text-xs md:text-sm mb-1">{item.text}</div>
                      <div className="text-xs text-gray-700 font-medium">{item.monetizationPotential}</div>
                      <div className="text-xs font-black text-purple-600 mt-1">
                        EFFORT: {(item?.effort ?? 'unknown').toString().toUpperCase()}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* CRITICAL EXECUTION MATRIX */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8 md:mb-12">
          <div className="bg-red-400 brutal-border md:border-r-4 border-r-0">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-black flex items-center">
                <AlertCircle className="mr-2" />
                CRITICAL EXECUTION [{analysis.todos.filter(i => i.priority === 'HIGH').length + analysis.risiken.length}]
              </h2>
              <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                {[...analysis.todos.filter(i => i.priority === 'HIGH'), ...analysis.risiken].map(item => (
                  <div key={item.id} className="bg-white border-2 border-black p-3">
                    <div className="font-bold text-black text-xs md:text-sm">
                      [{item.category}] {item.text}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-purple-400 brutal-border">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-black flex items-center">
                <Target className="mr-2" />
                KNOWLEDGE OPTIMIZATION [{analysis.knowledge.length}]
              </h2>
            </div>
            <div className="p-4 md:p-6">
              <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                {analysis.knowledge.map(item => (
                  <div
                    key={item.id}
                    className={`border-2 border-black p-3 ${item.priority === 'HIGH' ? 'bg-red-400' : 'bg-white'}`}
                  >
                    <div className="font-bold text-black text-xs md:text-sm">[LEARN] {item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* BUSINESS & MEETINGS */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-0 mb-8">
          <div className="bg-green-400 brutal-border md:border-r-4 border-r-0">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-black flex items-center">
                <TrendingUp className="mr-2" />
                BUSINESS DEVELOPMENT [{analysis.business.length}]
              </h2>
              <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                {analysis.business.map(item => (
                  <div key={item.id} className="bg-white border-2 border-black p-3">
                    <div className="font-bold text-black text-xs md:text-sm">[BIZ] {item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="bg-blue-400 brutal-border">
            <div className="p-4 md:p-6">
              <h2 className="text-xl md:text-2xl font-black mb-4 md:mb-6 text-black flex items-center">
                <Users className="mr-2" />
                MEETING PROTOCOL [{analysis.termine.length}]
              </h2>
              <div className="space-y-2 max-h-48 md:max-h-64 overflow-y-auto">
                {analysis.termine.map(item => (
                  <div
                    key={item.id}
                    className={`border-2 border-black p-3 ${item.priority === 'HIGH' ? 'bg-red-400' : 'bg-white'}`}
                  >
                    <div className="font-bold text-black text-xs md:text-sm">[MEET] {item.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="bg-black border-4 border-black">
          <div className="p-3 md:p-4 text-center">
            <div className="text-white font-bold text-sm md:text-base">
              SYSTEM: LOCAL INTELLIGENCE | STATUS: {loading ? 'PROCESSING' : 'READY'} | SESSION: {new Date().toLocaleDateString()}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

