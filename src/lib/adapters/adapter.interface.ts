import { NormalizedMessage } from "../types/normalized";

export interface IChannelAdapter {
  normalizePayload(payload: unknown): NormalizedMessage;
  sendOutgoingMessage(to: string, content: string, attachments?: unknown[]): Promise<boolean>;
}
