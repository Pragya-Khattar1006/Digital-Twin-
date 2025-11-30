import React, { useState } from 'react';
import RequestForm from './components/RequestForm';
import ResponseCard from './components/ResponseCard';
import { DWTInput, DWTOutput } from './types';
import { processDWTRequest } from './services/geminiService';
import { OWNER_DEFAULTS } from './constants';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [output, setOutput] = useState<DWTOutput | null>(null);

  const handleRequestSubmit = async (inputData: DWTInput) => {
    setLoading(true);
    setOutput(null);
    try {
      const result = await processDWTRequest(inputData);
      setOutput(result);
    } catch (error) {
      console.error(error);
      alert("Failed to process request. Please check your API key and try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center shadow-sm">
               <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
               </svg>
            </div>
            <h1 className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-indigo-600">
              Digital Work Twin
            </h1>
          </div>
          <div className="flex items-center space-x-4">
             <div className="hidden md:flex flex-col items-end">
               <span className="text-xs font-semibold text-slate-700">{OWNER_DEFAULTS.name}</span>
               <span className="text-xs text-slate-400">{OWNER_DEFAULTS.timezone}</span>
             </div>
             <div className="w-8 h-8 rounded-full bg-slate-200 border-2 border-white shadow-sm overflow-hidden">
                <img src={`https://ui-avatars.com/api/?name=${OWNER_DEFAULTS.name}&background=0D8ABC&color=fff`} alt="Owner Avatar" />
             </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Dashboard</h2>
          <p className="text-slate-500 mt-1">Simulate incoming requests and view how your Digital Twin handles them.</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input Simulation */}
          <div className="lg:col-span-5">
            <RequestForm onSubmit={handleRequestSubmit} isLoading={loading} />
            
            <div className="mt-6 bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h4 className="flex items-center text-sm font-semibold text-blue-800 mb-2">
                <svg className="w-4 h-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                How it works
              </h4>
              <p className="text-xs text-blue-700 leading-relaxed">
                The DWT uses Gemini 2.5 to analyze the intent, check safe citations, and generate a decision-ready response. If a meeting is needed, it intelligently proposes slots based on the "Next 3 Days" logic embedded in the code.
              </p>
            </div>
          </div>

          {/* Right Column: Output Display */}
          <div className="lg:col-span-7">
             <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-slate-800">Twin Output</h3>
                {output && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    Processed Successfully
                  </span>
                )}
             </div>
             <ResponseCard data={output} />
          </div>

        </div>
      </main>
    </div>
  );
};

export default App;