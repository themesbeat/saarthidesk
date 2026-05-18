import { NormalizedMessage } from "../types/normalized";

export interface IChannelAdapter {
  normalizePayload(payload: any): NormalizedMessage;
  sendOutgoingMessage(to: string, content: string, attachments?: any[]): Promise<boolean>;
}
