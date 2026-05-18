import { IChannelAdapter } from "./adapter.interface";
import { NormalizedMessage } from "../types/normalized";

interface EmailPayload {
  from?: string;
  sender?: string;
  messageId?: string;
  id?: string;
  text?: string;
  html?: string;
  subject?: string;
  date?: string | number | Date;
  cc?: string[];
  to?: string[];
}

export class EmailAdapter implements IChannelAdapter {
  private apiKey: string;
  private fromEmail: string;

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey;
    this.fromEmail = fromEmail;
  }

  normalizePayload(payload: unknown): NormalizedMessage {
    const emailPayload = payload as EmailPayload;
    const fromAddress = emailPayload.from || emailPayload.sender || "";
    // Clean up "John Doe <john@example.com>" format
    const emailMatch = fromAddress.match(/<([^>]+)>/) || [null, fromAddress];
    const email = emailMatch[1]?.trim() || fromAddress.trim();
    const name = fromAddress.replace(/<[^>]+>/, "").replace(/["']/g, "").trim() || email.split("@")[0] || "Email User";

    return {
      externalMessageId: emailPayload.messageId || emailPayload.id || `email_${Date.now()}`,
      channel: "EMAIL",
      sender: "CUSTOMER",
      customer: {
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      },
      content: emailPayload.text || emailPayload.html || emailPayload.subject || "",
      messageType: "TEXT",
      timestamp: emailPayload.date ? new Date(emailPayload.date) : new Date(),
      metadata: {
        subject: emailPayload.subject || "No Subject",
        cc: emailPayload.cc || [],
        to: emailPayload.to || [],
      },
    };
  }

  async sendOutgoingMessage(toEmail: string, content: string, attachments?: unknown[]): Promise<boolean> {
    try {
      // Direct call to Resend API (standard in Next.js stacks) or fallback to log
      if (!this.apiKey || this.apiKey === "mock-key") {
        console.log(`[EmailAdapter] [MOCK SEND] From: ${this.fromEmail} | To: ${toEmail} | Content: ${content}`);
        return true;
      }

      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${this.apiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: this.fromEmail,
          to: toEmail,
          subject: "Re: Your Support Request",
          text: content,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error("[EmailAdapter] Failed to dispatch outbound email via Resend:", errorText);
        return false;
      }

      return true;
    } catch (err) {
      console.error("[EmailAdapter] Network error during email dispatch:", err);
      return false;
    }
  }
}
