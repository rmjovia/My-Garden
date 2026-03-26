export type Region = 'Central' | 'Eastern' | 'Northern' | 'Western';

export interface FarmProfile {
  name: string;
  region: Region | '';
  landSize: string;
  crop: string;
  irrigation: string;
  plantingDate: string;
  spacing: string;
}

export interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  image?: string; // base64
}

export interface AppState {
  profile: FarmProfile;
  chats: Message[];
  theme: 'light' | 'dark' | 'system';
}
