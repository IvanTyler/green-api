export type MessageDirection = 'in' | 'out';

export interface ChatMessage {
  id: string;
  direction: MessageDirection;
  text: string;
  timestamp: number;
}

export interface Chat {
  chatId: string;
  title: string;
  messages: ChatMessage[];
}

export interface InstanceCredentials {
  idInstance: string;
  apiTokenInstance: string;
}
