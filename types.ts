export interface Citation {
  title: string;
  url: string;
}

export interface CandidateSlot {
  start_iso: string;
  end_iso: string;
}

export interface DWTInput {
  owner_name: string;
  owner_timezone: string;
  requester_name: string;
  requester_email: string;
  intent_hint: "INFO" | "MEETING" | "UNKNOWN";
  topic: string;
  message: string;
  citations: Citation[];
  candidate_slots: CandidateSlot[];
}

export interface Agenda {
  title: string;
  duration_min: number;
  items: string[];
}

export interface DWTOutput {
  intent: "INFO" | "MEETING";
  confidence: number;
  questions: string[];
  mini_brief: string;
  agenda: Agenda;
  rendered_slots: string[];
  citations_used: string[];
  notes_for_orchestrator: string;
}