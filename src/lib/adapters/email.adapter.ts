import { IChannelAdapter } from "./adapter.interface";
import { NormalizedMessage } from "../types/normalized";

export class EmailAdapter implements IChannelAdapter {
  private apiKey: string;
  private fromEmail: string;

  constructor(apiKey: string, fromEmail: string) {
    this.apiKey = apiKey;
    this.fromEmail = fromEmail;
  }

  normalizePayload(payload: any): NormalizedMessage {
    const fromAddress = payload.from || payload.sender || "";
    // Clean up "John Doe <john@example.com>" format
    const emailMatch = fromAddress.match(/<([^>]+)>/) || [null, fromAddress];
    const email = emailMatch[1]?.trim() || fromAddress.trim();
    const name = fromAddress.replace(/<[^>]+>/, "").replace(/["']/g, "").trim() || email.split("@")[0] || "Email User";

    return {
      externalMessageId: payload.messageId || payload.id || `email_${Date.now()}`,
      channel: "EMAIL",
      sender: "CUSTOMER",
      customer: {
        name,
        email,
        avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${name}`,
      },
      content: payload.text || payload.html || payload.subject || "",
      messageType: "TEXT",
      timestamp: payload.date ? new Date(payload.date) : new Date(),
      metadata: {
        subject: payload.subject || "No Subject",
        cc: payload.cc || [],
        to: payload.to || [],
      },
    };
  }

  async sendOutgoingMessage(toEmail: string, content: string, attachments?: any[]): Promise<boolean> {
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
