import { MappingType, OptionConfig, ToneType } from './types';

// NOTE: In a real production environment, sensitive keys should be stored in environment variables 
// and requests should be proxied through a backend to avoid exposing credentials to the client.
export const API_KEY = 'ZKO6Z85Y76XATRIMNVP1I0LCZICA4J61';
export const API_ENDPOINT = 'https://api.sapling.ai/api/v1/rephrase';
export const MAX_CHARS = 400;

export const MAPPING_OPTIONS: OptionConfig[] = [
  { value: 'paraphrase', label: 'Paraphrase', description: 'Reword text while keeping the same meaning.' },
  { value: 'informal_to_formal', label: 'Formalize', description: 'Make the text more professional.' },
  { value: 'passive_to_active', label: 'Passive to Active', description: 'Switch to active voice for clarity.' },
  { value: 'active_to_passive', label: 'Active to Passive', description: 'Switch to passive voice.' },
  { value: 'sentence_split', label: 'Split Sentences', description: 'Break long sentences into shorter ones.' },
  { value: 'expand', label: 'Expand', description: 'Add detail and length to the text.' },
  { value: 'switch_tone', label: 'Change Tone', description: 'Adjust the emotional tone of the text.' },
];

export const TONE_OPTIONS: OptionConfig[] = [
  { value: 'straightforward', label: 'Straightforward' },
  { value: 'confident', label: 'Confident' },
  { value: 'friendly', label: 'Friendly' },
  { value: 'empathetic', label: 'Empathetic' },
];
