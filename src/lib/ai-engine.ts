import prisma from "@/lib/prisma";

interface ChatMessage {
  sender: string;
  content: string;
}

export async function generateAiReply(
  workspaceId: string,
  userMessage: string,
  history: ChatMessage[] = []
): Promise<{ text: string; confidence: number; source: string }> {
  try {
    // 1. Fetch AI Settings
    let aiSettings = await prisma.aiSettings.findUnique({
      where: { workspaceId },
    });

    if (!aiSettings) {
      aiSettings = await prisma.aiSettings.create({
        data: {
          workspaceId,
          tone: "PROFESSIONAL",
          autoReply: true,
          agentName: "Saarthi AI",
          systemPrompt: "You are Saarthi, a virtual receptionist. You are helpful, polite, and focused on assisting customers.",
          escalateEmail: "support@saarthidesk.com",
          escalatePhone: "+91 98765 43210",
        },
      });
    }

    const { agentName, systemPrompt, tone, escalateEmail, escalatePhone } = aiSettings;

    // 2. Fetch Knowledge Base articles
    const knowledgeBase = await prisma.knowledgeBase.findMany({
      where: { workspaceId },
    });

    // 3. Keyword Context Retrieval (Semantic/Keyword matcher)
    const queryWords = userMessage.toLowerCase().split(/\s+/).filter(w => w.length > 2);
    let bestArticle = null;
    let maxMatchCount = 0;

    for (const article of knowledgeBase) {
      let matches = 0;
      const titleLower = article.title.toLowerCase();
      const contentLower = article.content.toLowerCase();

      for (const word of queryWords) {
        if (titleLower.includes(word)) matches += 3; // Title matches count more
        if (contentLower.includes(word)) matches += 1;
      }

      if (matches > maxMatchCount) {
        maxMatchCount = matches;
        bestArticle = article;
      }
    }

    // 4. Escalation Detection
    const escalationKeywords = [
      "human", "agent", "person", "talk to", "representative", "manager", "support", 
      "complain", "transfer", "help desk", "operator", "call me", "phone", "email"
    ];
    const isEscalationTriggered = escalationKeywords.some(keyword => 
      userMessage.toLowerCase().includes(keyword)
    );

    if (isEscalationTriggered) {
      let escalationText = `Understood. I am transferring you to a human representative immediately. You can reach our support team directly at ${escalatePhone} or via email at ${escalateEmail}. An agent will get back to you shortly.`;
      
      // Inject tone styling
      if (tone === "CASUAL") {
        escalationText = `Gotcha! Transferring you over to one of our friendly human team members right away! Reach us anytime at ${escalatePhone} or drop us a line at ${escalateEmail}. Speak soon! 🚀`;
      } else if (tone === "EMPATHETIC") {
        escalationText = `I completely understand, and I want to make sure you get the personalized care you deserve. I am transferring you to our human care advocates. You can contact them directly at ${escalatePhone} or ${escalateEmail}. We are here for you. ❤️`;
      } else if (tone === "ENTHUSIASTIC") {
        escalationText = `Awesome! Let's get you connected with one of our superstar human specialists! 🎉 You can reach them at ${escalatePhone} or ${escalateEmail}. They will be absolutely thrilled to assist you! ✨`;
      } else if (tone === "ACADEMIC") {
        escalationText = `Handover protocol initiated. Routing query to human specialist agent tier. Direct channels: Telephone ${escalatePhone}, Electronic Mail ${escalateEmail}. Transition in progress.`;
      }

      return {
        text: escalationText,
        confidence: 99,
        source: "Smart_Escalation_Protocol",
      };
    }

    // 5. Build Grounded Generative Reply
    let baseResponse = "";
    let confidence = 75;
    let source = "General_Knowledge_Base";

    if (bestArticle && maxMatchCount > 0) {
      confidence = Math.min(98, 85 + maxMatchCount * 2);
      source = `${bestArticle.title} (${bestArticle.type})`;
      
      // Extract the key statement or summary
      const contentLines = bestArticle.content.split(/[.!\n]+/).filter(l => l.trim().length > 0);
      const relevantSnippet = contentLines[0] || bestArticle.content;
      
      baseResponse = `According to our records for "${bestArticle.title}": ${relevantSnippet}. If you need more details: ${bestArticle.content.substring(0, 160)}${bestArticle.content.length > 160 ? "..." : ""}`;
    } else {
      // Default persona-driven replies if no direct knowledge match
      if (userMessage.toLowerCase().includes("pricing") || userMessage.toLowerCase().includes("price") || userMessage.toLowerCase().includes("cost")) {
        baseResponse = "Our pricing plans start at $19/month for Starter and $49/month for Business features, including 24/7 receptionist automations, analytics, and CRM integrations.";
        source = "Pricing_Guide";
      } else if (userMessage.toLowerCase().includes("hours") || userMessage.toLowerCase().includes("open") || userMessage.toLowerCase().includes("time")) {
        baseResponse = "We are open Monday through Saturday, from 9:00 AM to 8:00 PM. We are closed on Sundays.";
        source = "Business_Hours";
      } else if (userMessage.toLowerCase().includes("book") || userMessage.toLowerCase().includes("appointment") || userMessage.toLowerCase().includes("schedule")) {
        baseResponse = "We would love to schedule a session for you! Please share your preferred date and time, and I will check slot availability for you immediately.";
        source = "Appointment_Scheduler";
      } else {
        // Fallback using system prompt instructions
        baseResponse = `Hello! I am ${agentName}. I am trained as a virtual receptionist and would be happy to assist you with any questions regarding our services, booking appointments, or pricing plans. Please let me know how I can help!`;
        source = "System_Prompt_Instructions";
      }
    }

    // Apply Tone Stylings
    let styledResponse = baseResponse;
    if (tone === "CASUAL") {
      styledResponse = `Hey there! 😊 ${baseResponse.replace("Namaste!", "Hey!")} Hope that helps! Let me know if you need anything else! 🚀`;
    } else if (tone === "EMPATHETIC") {
      styledResponse = `I completely understand your query. ❤️ ${baseResponse} We are absolutely here to support you at every single step!`;
    } else if (tone === "ENTHUSIASTIC") {
      styledResponse = `Super query! 🎉 ${baseResponse} We are absolutely excited to help you maximize your business workflow today! ✨`;
    } else if (tone === "ACADEMIC") {
      styledResponse = `System analysis: ${baseResponse} Formulating optimum solution guidelines for query processing. Let me know if you require technical extrapolation.`;
    }

    return {
      text: styledResponse,
      confidence,
      source,
    };
  } catch (err) {
    console.error("[AiEngine] Error in reply generation:", err);
    return {
      text: "Thank you for reaching out. We are processing your request and will follow up shortly.",
      confidence: 50,
      source: "Error_Recovery_Fallback",
    };
  }
}
