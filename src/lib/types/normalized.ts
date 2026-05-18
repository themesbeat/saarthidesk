export type NormalizedMessage = {
  externalMessageId: string;
  channel: "WHATSAPP" | "TELEGRAM" | "EMAIL" | "WEB";
  sender: "CUSTOMER" | "AGENT" | "AI";
  senderId?: string;
  customer: {
    name?: string;
    phone?: string;
    email?: string;
    avatar?: string;
  };
  content: string;
  messageType?: "TEXT" | "MEDIA" | "INTERNAL_NOTE";
  attachments?: {
    type: "image" | "video" | "audio" | "document";
    url: string;
    name?: string;
  }[];
  timestamp: Date;
  metadata?: Record<string, any>;
};
