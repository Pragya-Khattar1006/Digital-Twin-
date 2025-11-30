import React from 'react';
import { DWTOutput } from '../types';
import { OWNER_DEFAULTS } from '../constants';

interface ResponseCardProps {
  data: DWTOutput | null;
}

const ResponseCard: React.FC<ResponseCardProps> = ({ data }) => {
  if (!data) {
    return (
      <div className="h-full bg-slate-50 border-2 border-dashed border-slate-200 rounded-xl flex items-center justify-center p-12 text-center">
        <div>
          <div className="mx-auto w-12 h-12 text-slate-300 mb-3">
            <svg fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
            </svg>
          </div>
          <h3 className="text-slate-900 font-medium">No Data Generated</h3>
          <p className="text-slate-500 text-sm mt-1">Submit a request to see the Digital Work Twin in action.</p>
        </div>
      </div>
    );
  }

  // Helper to parse the mini-brief into sections for better styling
  const renderBrief = (brief: string) => {
    // Basic regex to wrap keywords like "Goal:", "Context:", "Next Steps:" in bold
    const sections = brief.split(/(Goal:|Context:|Next Steps:)/g).filter(Boolean);
    return (
      <div className="text-sm text-slate-700 leading-relaxed space-y-2">
        {sections.map((part, i) => {
          if (part.trim() === 'Goal:' || part.trim() === 'Context:' || part.trim() === 'Next Steps:') {
            return <span key={i} className="block font-bold text-slate-900 mt-3 first:mt-0">{part}</span>;
          }
          return <span key={i}>{part}</span>;
        })}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header Info */}
      <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-3">
             <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold tracking-wide ${
               data.intent === 'MEETING' 
               ? 'bg-emerald-100 text-emerald-700' 
               : 'bg-indigo-100 text-indigo-700'
             }`}>
               {data.intent}
             </span>
             <span className="text-xs text-slate-400 font-mono">Confidence: {(data.confidence * 100).toFixed(0)}%</span>
          </div>
        </div>

        {/* Questions (if any) */}
        {data.questions && data.questions.length > 0 && (
          <div className="mb-6 bg-amber-50 border border-amber-100 rounded-lg p-4">
             <h4 className="text-xs font-bold text-amber-700 uppercase tracking-wide mb-2">Clarifying Questions Needed</h4>
             <ul className="list-disc list-inside text-sm text-amber-900 space-y-1">
               {data.questions.map((q, i) => <li key={i}>{q}</li>)}
             </ul>
          </div>
        )}
        
        {/* Mini Brief */}
        <div>
          <h3 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-3">Mini-Brief</h3>
          <div className="bg-slate-50 rounded-lg border border-slate-100 p-4">
            {renderBrief(data.mini_brief)}
          </div>
        </div>
      </div>

      {/* Agenda & Slots (Only if Meeting) */}
      {data.intent === 'MEETING' && (
        <div className="bg-white rounded-xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="bg-slate-50 px-6 py-3 border-b border-slate-200 flex justify-between items-center">
             <h3 className="text-sm font-semibold text-slate-800">Meeting Proposal</h3>
             <span className="text-xs text-slate-500">{data.agenda.duration_min} min</span>
          </div>
          <div className="p-6">
            <h4 className="font-semibold text-slate-900 mb-4">{data.agenda.title || "Meeting Agenda"}</h4>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Agenda Items */}
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Agenda</h5>
                <ul className="space-y-3">
                  {data.agenda.items.map((item, idx) => (
                    <li key={idx} className="flex items-start text-sm text-slate-700">
                      <span className="flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center text-xs font-medium mr-3 mt-0.5">
                        {idx + 1}
                      </span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Time Slots */}
              <div>
                <h5 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">Proposed Slots ({OWNER_DEFAULTS.timezone})</h5>
                <div className="space-y-2">
                  {data.rendered_slots.length > 0 ? (
                    data.rendered_slots.map((slot, idx) => (
                      <button key={idx} className="w-full text-left px-4 py-3 bg-white border border-slate-200 rounded-lg shadow-sm hover:border-blue-400 hover:ring-1 hover:ring-blue-400 transition-all group">
                        <span className="text-sm font-medium text-slate-700 group-hover:text-blue-700">{slot}</span>
                      </button>
                    ))
                  ) : (
                    <p className="text-sm text-slate-400 italic">No slots available or required.</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Footer / Orchestrator Notes */}
      <div className="bg-slate-900 rounded-xl shadow-sm p-5 text-slate-300">
        <div className="flex items-start space-x-3">
          <svg className="w-5 h-5 text-slate-400 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wide mb-1">DWT Orchestrator Notes</h4>
            <p className="text-sm font-mono text-emerald-400">{data.notes_for_orchestrator || "All checks passed."}</p>
          </div>
        </div>
        
        {data.citations_used && data.citations_used.length > 0 && (
           <div className="mt-4 pt-4 border-t border-slate-800">
             <span className="text-xs text-slate-500 mr-2">Citations Used:</span>
             {data.citations_used.map((cit, i) => (
               <span key={i} className="inline-block bg-slate-800 text-slate-300 text-xs px-2 py-0.5 rounded mr-2 border border-slate-700">
                 {cit}
               </span>
             ))}
           </div>
        )}
      </div>
    </div>
  );
};

export default ResponseCard;