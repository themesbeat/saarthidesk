import { IChannelAdapter } from "./adapter.interface";
import { NormalizedMessage } from "../types/normalized";

interface TelegramPayload {
  message?: {
    message_id?: number | string;
    from?: {
      id?: number | string;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat?: {
      id?: number | string;
    };
    text?: string;
    date?: number;
  };
  edited_message?: {
    message_id?: number | string;
    from?: {
      id?: number | string;
      first_name?: string;
      last_name?: string;
      username?: string;
      language_code?: string;
    };
    chat?: {
      id?: number | string;
    };
    text?: string;
    date?: number;
  };
}

export class TelegramAdapter implements IChannelAdapter {
  private botToken: string;

  constructor(botToken: string) {
    this.botToken = botToken;
  }

  normalizePayload(payload: unknown): NormalizedMessage {
    const tgPayload = payload as TelegramPayload;
    const message = tgPayload.message || tgPayload.edited_message;
    if (!message) {
      throw new Error("Invalid Telegram payload: no message body found");
    }

    const from = message.from || {};
    const chatId = message.chat?.id?.toString() || from.id?.toString() || "";
    const name = [from.first_name, from.last_name].filter(Boolean).join(" ") || from.username || "Telegram User";

    return {
      externalMessageId: message.message_id?.toString() || `tg_${Date.now()}`,
      channel: "TELEGRAM",
      sender: "CUSTOMER",
      customer: {
        name,
        phone: chatId, // Storing chatId in phone for Telegram mapping
        email: from.username ? `${from.username}@telegram.user` : undefined,
        avatar: `https://api.dicebear.com/7.x/bottts/svg?seed=${name}`,
      },
      content: message.text || "",
      messageType: "TEXT",
      timestamp: message.date ? new Date(message.date * 1000) : new Date(),
      metadata: {
        chatId: message.chat?.id,
        username: from.username,
        languageCode: from.language_code,
      },
    };
  }

  async sendOutgoingMessage(chatId: string, content: string, attachments?: unknown[]): Promise<boolean> {
    try {
      const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;
      const response = await fetch(url, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          chat_id: chatId,
          text: content,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[TelegramAdapter] Failed to send outbound message:", errorText);
        return false;
      }

      return true;
    } catch (err) {
      console.error("[TelegramAdapter] Network error during sendMessage:", err);
      return false;
    }
  }
}
