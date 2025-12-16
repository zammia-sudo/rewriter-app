export type MappingType = 
  | 'paraphrase'
  | 'informal_to_formal'
  | 'passive_to_active'
  | 'active_to_passive'
  | 'sentence_split'
  | 'expand'
  | 'switch_tone';

export type ToneType = 
  | 'straightforward'
  | 'confident'
  | 'friendly'
  | 'empathetic';

export interface RephraseRequest {
  key: string;
  text: string;
  mapping: MappingType;
  tone_mapping?: ToneType;
}

export interface RephraseResponse {
  result: string[];
}

export interface OptionConfig {
  value: string;
  label: string;
  description?: string;
}

export interface AppState {
  inputText: string;
  results: string[];
  isLoading: boolean;
  error: string | null;
  selectedMapping: MappingType;
  selectedTone: ToneType;
}
