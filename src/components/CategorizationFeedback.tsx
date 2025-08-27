import React, { useState } from 'react'
import { AlertCircle, CheckCircle, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react'
import type { BasicAnalysis } from '../lib/analysis'

interface CategorizationFeedbackProps {
  analysis: BasicAnalysis
}

export default function CategorizationFeedback({ analysis }: CategorizationFeedbackProps) {
  const [isExpanded, setIsExpanded] = useState(false)
  const { categorizationFeedback } = analysis
  
  const hasIssues = categorizationFeedback.uncategorized.length > 0 || 
                    categorizationFeedback.lowConfidence.length > 0

  const keywordSuggestions = {
    termine: ['termin', 'meeting', 'firma', 'vorstellung', 'gespräch', 'akademie', 'kick-off'],
    business: ['anwendungsfälle', 'controlling', 'vertrieb', 'beraterfirmen', 'marketing', 'priorisierung', 'prozesse'],
    knowledge: ['KI', 'AI', 'governance', 'prompting', 'ISO', 'spezialisierung', 'automationen'],
    risk: ['pain points', 'problemfelder', 'compliance', 'kritisch', 'risiko'],
    setup: ['setup', 'checkliste', 'formular', 'recherche', 'liste erstellen', 'laptop'],
    urgent: ['offen', 'muss', 'deadline', 'kritisch', 'wichtig', 'heute', 'morgen'],
    energy: ['stadtwerke', 'wemag', 'rostock', 'energie', 'smart grid', 'renewable']
  }

  if (!hasIssues && categorizationFeedback.suggestions.length === 0) {
    return (
      <div className="bg-green-100 border-2 border-black rounded p-4 mb-6">
        <div className="flex items-center">
          <CheckCircle className="w-5 h-5 text-green-600 mr-3" />
          <div>
            <h3 className="font-bold text-green-800">Perfekte Kategorisierung!</h3>
            <p className="text-sm text-green-700">Alle Ihre Eingaben wurden korrekt erkannt und kategorisiert.</p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-yellow-100 border-2 border-black rounded p-4 mb-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <AlertCircle className="w-5 h-5 text-yellow-600 mr-3" />
          <div>
            <h3 className="font-bold text-yellow-800">Kategorisierung kann verbessert werden</h3>
            <p className="text-sm text-yellow-700">
              {categorizationFeedback.uncategorized.length > 0 && 
                `${categorizationFeedback.uncategorized.length} nicht kategorisiert`}
              {categorizationFeedback.uncategorized.length > 0 && categorizationFeedback.lowConfidence.length > 0 && ', '}
              {categorizationFeedback.lowConfidence.length > 0 && 
                `${categorizationFeedback.lowConfidence.length} unsicher erkannt`}
            </p>
          </div>
        </div>
        
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="bg-yellow-200 text-yellow-800 p-2 rounded border border-yellow-600 hover:bg-yellow-300"
        >
          {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>
      </div>

      {isExpanded && (
        <div className="mt-4 space-y-4">
          
          {/* Uncategorized Items */}
          {categorizationFeedback.uncategorized.length > 0 && (
            <div className="bg-white border border-yellow-600 rounded p-3">
              <h4 className="font-bold text-sm mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-red-500" />
                Nicht erkannte Items ({categorizationFeedback.uncategorized.length})
              </h4>
              <div className="space-y-2">
                {categorizationFeedback.uncategorized.map((item, idx) => (
                  <div key={idx} className="text-xs bg-gray-100 p-2 rounded border">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Low Confidence Items */}
          {categorizationFeedback.lowConfidence.length > 0 && (
            <div className="bg-white border border-yellow-600 rounded p-3">
              <h4 className="font-bold text-sm mb-2 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-yellow-500" />
                Unsicher erkannte Items ({categorizationFeedback.lowConfidence.length})
              </h4>
              <div className="space-y-2">
                {categorizationFeedback.lowConfidence.slice(0, 3).map((item) => (
                  <div key={item.id} className="text-xs bg-gray-100 p-2 rounded border">
                    <div className="font-medium">{item.text}</div>
                    <div className="text-gray-600 mt-1">
                      Kategorie: {item.category} | Konfidenz: {Math.round(item.confidence * 100)}% | 
                      Keywords: {item.matchedKeywords?.join(', ') || 'keine'}
                    </div>
                  </div>
                ))}
                {categorizationFeedback.lowConfidence.length > 3 && (
                  <div className="text-xs text-gray-600">
                    ... und {categorizationFeedback.lowConfidence.length - 3} weitere
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Suggestions */}
          <div className="bg-white border border-yellow-600 rounded p-3">
            <h4 className="font-bold text-sm mb-3 flex items-center">
              <Lightbulb className="w-4 h-4 mr-2 text-blue-500" />
              Verbesserungs-Tipps
            </h4>
            
            {categorizationFeedback.suggestions.length > 0 && (
              <div className="mb-3">
                {categorizationFeedback.suggestions.map((suggestion, idx) => (
                  <div key={idx} className="text-xs bg-blue-50 p-2 rounded border mb-2">
                    💡 {suggestion}
                  </div>
                ))}
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {Object.entries(keywordSuggestions).map(([category, keywords]) => (
                <div key={category} className="text-xs">
                  <div className="font-bold capitalize text-gray-700 mb-1">{category}:</div>
                  <div className="flex flex-wrap gap-1">
                    {keywords.slice(0, 4).map(keyword => (
                      <span key={keyword} className="bg-gray-200 px-2 py-1 rounded text-xs">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Template Suggestion */}
          <div className="bg-blue-50 border border-blue-300 rounded p-3">
            <h4 className="font-bold text-sm mb-2">🎯 Optimale Eingabe-Vorlage</h4>
            <div className="text-xs space-y-1 font-mono bg-white p-2 rounded border">
              <div>📅 Meeting mit [Partner] am [Tag] [Zeit] - [Thema]</div>
              <div>⚠️ [Projekt] fertigstellen - deadline [Datum] - kritisch</div>
              <div>📚 Research: [Thema] - Wissen erweitern</div>
              <div>💼 Business Idee: [Konzept] - Umsatz generieren</div>
              <div>⚡ Stadtwerke [Aufgabe] - Smart Grid Projekt</div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
