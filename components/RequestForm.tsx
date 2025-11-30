import React, { useState } from 'react';
import { DWTInput, CandidateSlot } from '../types';
import { OWNER_DEFAULTS, MOCK_CITATIONS } from '../constants';

interface RequestFormProps {
  onSubmit: (data: DWTInput) => void;
  isLoading: boolean;
}

const RequestForm: React.FC<RequestFormProps> = ({ onSubmit, isLoading }) => {
  const [formData, setFormData] = useState({
    requester_name: 'Rhea',
    requester_email: 'rhea@partner.com',
    topic: 'FMCG GTM Brief Review',
    message: 'Can we meet this week to sanity-check the FMCG GTM brief? What should we prep? We need to move fast.',
    intent_hint: 'MEETING' as const,
  });

  const generateSlots = (): CandidateSlot[] => {
    // Generate 3 mock slots starting tomorrow
    const slots: CandidateSlot[] = [];
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    // Slot 1: Tomorrow 10:00 AM
    const slot1Start = new Date(tomorrow);
    slot1Start.setHours(10, 0, 0, 0);
    const slot1End = new Date(slot1Start);
    slot1End.setMinutes(25);
    slots.push({ start_iso: slot1Start.toISOString(), end_iso: slot1End.toISOString() });

    // Slot 2: Tomorrow 2:00 PM
    const slot2Start = new Date(tomorrow);
    slot2Start.setHours(14, 0, 0, 0);
    const slot2End = new Date(slot2Start);
    slot2End.setMinutes(25);
    slots.push({ start_iso: slot2Start.toISOString(), end_iso: slot2End.toISOString() });

    // Slot 3: Day after tomorrow 11:30 AM
    const dayAfter = new Date(tomorrow);
    dayAfter.setDate(dayAfter.getDate() + 1);
    const slot3Start = new Date(dayAfter);
    slot3Start.setHours(11, 30, 0, 0);
    const slot3End = new Date(slot3Start);
    slot3End.setMinutes(25);
    slots.push({ start_iso: slot3Start.toISOString(), end_iso: slot3End.toISOString() });

    return slots;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload: DWTInput = {
      owner_name: OWNER_DEFAULTS.name,
      owner_timezone: OWNER_DEFAULTS.timezone,
      requester_name: formData.requester_name,
      requester_email: formData.requester_email,
      intent_hint: formData.intent_hint,
      topic: formData.topic,
      message: formData.message,
      citations: MOCK_CITATIONS,
      candidate_slots: generateSlots(),
    };

    onSubmit(payload);
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg font-semibold text-slate-800">Incoming Request</h2>
        <div className="text-xs font-medium bg-slate-100 text-slate-500 px-2 py-1 rounded">
          Simulated Input
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Requester Name</label>
            <input
              type="text"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              value={formData.requester_name}
              onChange={(e) => setFormData({ ...formData, requester_name: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-slate-700 mb-1">Requester Email</label>
            <input
              type="email"
              required
              className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
              value={formData.requester_email}
              onChange={(e) => setFormData({ ...formData, requester_email: e.target.value })}
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Intent Hint</label>
          <select
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm bg-white"
            value={formData.intent_hint}
            onChange={(e) => setFormData({ ...formData, intent_hint: e.target.value as "INFO" | "MEETING" | "UNKNOWN" })}
          >
            <option value="MEETING">MEETING (Requesting time)</option>
            <option value="INFO">INFO (Requesting resources/answers)</option>
            <option value="UNKNOWN">UNKNOWN (Ambiguous)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Topic</label>
          <input
            type="text"
            required
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm"
            value={formData.topic}
            onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
          <textarea
            required
            rows={4}
            className="w-full px-3 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-sm resize-none"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex items-center justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Processing with Gemini...
              </>
            ) : (
              'Process Request'
            )}
          </button>
        </div>
      </form>
      
      <div className="mt-6 pt-6 border-t border-slate-100">
        <h4 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-3">Context Available to AI</h4>
        <div className="flex flex-wrap gap-2">
          {MOCK_CITATIONS.map((cit, idx) => (
            <span key={idx} className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-600 border border-slate-200" title={cit.url}>
              <svg className="w-3 h-3 mr-1 text-slate-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4z" />
              </svg>
              {cit.title}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RequestForm;