import React, { useState } from 'react'
import { Plus, Save, ArrowLeft, Brain, AlertCircle, Target, Users, TrendingUp } from 'lucide-react'

interface TaskInputProps {
  onSave: (content: string) => void
  onBack: () => void
  initialContent?: string
}

export default function TaskInput({ onSave, onBack, initialContent = '' }: TaskInputProps) {
  const [content, setContent] = useState(initialContent)
  const [selectedCategory, setSelectedCategory] = useState<string>('all')

  const quickTemplates = [
    { category: 'MEETING', template: 'Meeting mit [Partner] am [Datum] [Zeit] - [Thema]', icon: Users },
    { category: 'DEADLINE', template: '[Projekt] fertigstellen - Deadline [Datum]', icon: AlertCircle },
    { category: 'LEARNING', template: 'Research: [Thema] - [Ziel]', icon: Target },
    { category: 'BUSINESS', template: 'Business Idee: [Konzept] - [Potenzial]', icon: TrendingUp },
  ]

  const addTemplate = (template: string) => {
    const newLine = content ? '\n' : ''
    setContent(content + newLine + template)
  }

  const handleSave = () => {
    if (content.trim()) {
      onSave(content)
    }
  }

  const lineCount = content.split('\n').filter(line => line.trim()).length

  return (
    <div className="min-h-screen bg-gray-50 font-sans">
      <section className="px-4 py-6 md:px-8 md:py-10 max-w-4xl mx-auto">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <button
            onClick={onBack}
            className="bg-gray-100 text-black font-bold py-2 px-3 border-2 border-black rounded-md uppercase text-sm hover:bg-gray-200 flex items-center"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Zurück
          </button>
          
          <h1 className="text-2xl md:text-3xl font-bold uppercase tracking-tight font-sans text-center">
            Aufgaben Eingabe
          </h1>
          
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="bg-black text-white font-bold py-2 px-3 rounded-md uppercase text-sm tracking-tight hover:bg-gray-900 disabled:opacity-50 flex items-center"
          >
            <Save className="w-4 h-4 mr-2" />
            Speichern
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <div className="bg-gray-100 border-2 border-black rounded p-4 text-center font-sans">
            <div className="text-xl">📝</div>
            <div className="text-2xl font-bold mt-2">{lineCount}</div>
            <div className="text-sm uppercase mt-1 text-gray-600">Aufgaben</div>
          </div>
          
          <div className="bg-yellow-200 border-2 border-black rounded p-4 text-center font-sans">
            <div className="text-xl">⚡</div>
            <div className="text-2xl font-bold mt-2">
              {content.toLowerCase().includes('deadline') || content.toLowerCase().includes('kritisch') ? 
                content.split('\n').filter(line => 
                  line.toLowerCase().includes('deadline') || 
                  line.toLowerCase().includes('kritisch')
                ).length : 0
              }
            </div>
            <div className="text-sm uppercase mt-1 text-gray-600">Kritisch</div>
          </div>
          
          <div className="bg-green-100 border-2 border-black rounded p-4 text-center font-sans">
            <div className="text-xl">💼</div>
            <div className="text-2xl font-bold mt-2">
              {content.toLowerCase().includes('business') || content.toLowerCase().includes('idee') ? 
                content.split('\n').filter(line => 
                  line.toLowerCase().includes('business') || 
                  line.toLowerCase().includes('idee')
                ).length : 0
              }
            </div>
            <div className="text-sm uppercase mt-1 text-gray-600">Business</div>
          </div>
          
          <div className="bg-blue-100 border-2 border-black rounded p-4 text-center font-sans">
            <div className="text-xl">🎓</div>
            <div className="text-2xl font-bold mt-2">
              {content.toLowerCase().includes('workshop') || content.toLowerCase().includes('lernen') || content.toLowerCase().includes('research') ? 
                content.split('\n').filter(line => 
                  line.toLowerCase().includes('workshop') || 
                  line.toLowerCase().includes('lernen') ||
                  line.toLowerCase().includes('research')
                ).length : 0
              }
            </div>
            <div className="text-sm uppercase mt-1 text-gray-600">Lernen</div>
          </div>
        </div>

        {/* Quick Templates */}
        <div className="bg-white border-2 border-black rounded p-6 mb-8">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4">
            <Brain className="inline w-5 h-5 mr-2" />
            Schnell-Vorlagen
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {quickTemplates.map((item, index) => {
              const IconComponent = item.icon
              return (
                <button
                  key={index}
                  onClick={() => addTemplate(item.template)}
                  className="bg-gray-100 text-black font-bold py-3 px-4 border-2 border-black rounded-md uppercase text-sm hover:bg-gray-200 text-left flex items-center"
                >
                  <IconComponent className="w-4 h-4 mr-3" />
                  <div>
                    <div className="font-bold">{item.category}</div>
                    <div className="text-xs normal-case text-gray-600 mt-1">
                      {item.template.substring(0, 30)}...
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Input */}
        <div className="bg-white border-2 border-black rounded p-6 mb-6">
          <h2 className="text-lg md:text-xl font-bold uppercase tracking-tight font-sans mb-4">
            Alle Aufgaben
          </h2>
          
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Geben Sie hier alle Ihre Aufgaben ein (eine pro Zeile)...

Beispiele:
• Meeting mit Vorstand Donnerstag 14:00 - Budget verhandeln
• KI-Strategieplan für Q2 finalisieren - deadline 15. März
• Research: Machine Learning für Energieprognosen
• Business Idee: KI-Kurse entwickeln
• Compliance Audit: GDPR für KI-Tools - kritisch"
            className="w-full border-2 border-black rounded px-4 py-4 min-h-80 font-mono text-sm resize-y focus:outline-none focus:ring-2 focus:ring-black"
          />
          
          <div className="mt-4 flex justify-between items-center">
            <p className="text-sm text-gray-600 font-sans">
              Eine Aufgabe pro Zeile. Verwenden Sie Keywords wie "deadline", "kritisch", "meeting", "business", "research" für bessere Kategorisierung.
            </p>
            
            <span className="text-xs font-bold uppercase bg-gray-300 text-black rounded-full px-2 py-1">
              {content.length} Zeichen
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4">
          <button
            onClick={() => setContent('')}
            className="flex-1 bg-gray-100 text-black font-bold py-3 px-4 border-2 border-black rounded-md uppercase text-sm hover:bg-gray-200"
          >
            Alles Löschen
          </button>
          
          <button
            onClick={handleSave}
            disabled={!content.trim()}
            className="flex-1 bg-black text-white font-bold py-3 px-4 rounded-lg uppercase text-sm tracking-tight hover:bg-gray-900 disabled:opacity-50"
          >
            <Save className="inline w-4 h-4 mr-2" />
            Speichern & Analysieren
          </button>
        </div>

        {/* Tips */}
        <div className="mt-8 bg-yellow-200 border-2 border-black rounded p-4">
          <h3 className="font-bold text-lg mb-2">💡 Tipps für bessere Ergebnisse:</h3>
          <ul className="text-sm space-y-1 list-disc list-inside">
            <li><strong>Keywords verwenden:</strong> "deadline", "kritisch", "wichtig" für hohe Priorität</li>
            <li><strong>Termine kennzeichnen:</strong> "meeting", "call", "termin" + Zeitangaben</li>
            <li><strong>Business-Items:</strong> "business", "idee", "monetär", "kunde"</li>
            <li><strong>Lern-Inhalte:</strong> "research", "workshop", "lernen", "wissen"</li>
            <li><strong>Risiken:</strong> "compliance", "audit", "gdpr", "risiko"</li>
          </ul>
        </div>

      </section>
    </div>
  )
}
