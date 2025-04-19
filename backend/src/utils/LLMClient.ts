import { NextFunction, Request, Response, Router } from "express";
import axios from "axios";
import { OLLAMA_API_URL } from "..";
import { generateResponseSchema } from "../schema/llm.schema";

type Role = "assistant" | "user" | "system";

export class LLMClient {
  // Messages that will be sent to the model as history
  private messagesHistory: Array<{
    role: Role;
    content: string;
  }>;
  // Messages that will be returned for the Frontend
  private messages: Array<{
    role: Role;
    content:
      | { userOriginal: string; userTranslation: string }
      | { assistantOriginal: string; assistantTranslation: string };
  }>;

  constructor() {
    this.messagesHistory = [];
    this.messages = [];
  }

  private updateMessages = ({
    userOriginal,
    userTranslation,
    assistantOriginal,
    assistantTranslation,
  }: {
    userOriginal: string;
    userTranslation: string;
    assistantOriginal: string;
    assistantTranslation: string;
  }) => {
    this.messagesHistory.push({
      role: "user",
      content: userOriginal,
    });
    this.messagesHistory.push({
      role: "assistant",
      content: assistantOriginal,
    });
    this.messages.push({
      role: "user",
      content: {
        userOriginal: userOriginal,
        userTranslation: userTranslation,
      },
    });
    this.messages.push({
      role: "assistant",
      content: {
        assistantOriginal: assistantOriginal,
        assistantTranslation: assistantTranslation,
      },
    });
  };

  getMessages = () => {
    return this.messages;
  };

  resetTheConversation = () => {
    this.messages = [];
    this.messagesHistory = [];
  };

  generateResponse = async (
    userMessage: string,
    scenario?: string,
    conversationLanguage?: string,
    translationLanguage?: string,
    languageProficiency?: string
  ) => {
    console.log("***LLM _ MSG --> ", userMessage);
    // For the very first call, set up the conversation with the initial context.
    if (this.messagesHistory.length === 0) {
      // If any of the initial parameters are missing, throw an error.
      if (
        !scenario ||
        !conversationLanguage ||
        !translationLanguage ||
        !languageProficiency
      ) {
        throw new Error(
          "For the initial call, you must provide scenario, conversation language, translation language and level."
        );
      }
      // Build the initial developer message.
      const initialInstruction = `You are an AI language practice partner helping users learn ${conversationLanguage}. Your job is to have natural conversations and provide translations.

PARAMETERS:
- Scenario: ${scenario}
- User's proficiency: ${languageProficiency} level in ${conversationLanguage}
- Always respond in ${conversationLanguage} first, then provide a ${translationLanguage} translation

OUTPUT FORMAT:
Provide a valid JSON object with these exact keys:
{
  "userTranslation": "", // Your accurate translation of user's message to ${translationLanguage}
  "assistantOriginal": "", // Your response in ${conversationLanguage} (keep appropriate to ${languageProficiency} level)
  "assistantTranslation": "" // Your exact translation of your response to ${translationLanguage}
}

GUIDELINES:
- Keep responses concise (2-4 sentences) to fit in limited context window
- Match language complexity to user's ${languageProficiency} level
- Focus on accuracy of translations rather than creative elaboration
- Stay in character for the ${scenario} scenario
- Always respond to the specific content of the user's message`;

      // Append the initial developer message.
      this.messagesHistory.push({
        role: "system",
        content: initialInstruction,
      });
    }
    this.messagesHistory.push({ role: "user", content: userMessage });

    const { data } = await axios.post(`${OLLAMA_API_URL}/api/chat`, {
      model: "phi3:mini",
      stream: false,
      messages: this.messagesHistory,
      format: {
        type: "object",
        properties: {
          userOriginal: {
            type: "string",
          },
          userTranslation: {
            type: "string",
          },
          assistantOriginal: {
            type: "string",
          },
          assistantTranslation: {
            type: "string",
          },
        },
        required: [
          "userOriginal",
          "userTranslation",
          "assistantOriginal",
          "assistantTranslation",
        ],
      },
      options: {
        temperature: 0,
      },
    });
    // Remove the last user message that lacks the translation
    this.messagesHistory.pop();
    const llmResponse = JSON.parse(data.message.content);
    const conversation: {
      userOriginal: string;
      userTranslation: string;
      assistantOriginal: string;
      assistantTranslation: string;
    } = {
      userOriginal: userMessage,
      userTranslation: llmResponse.userTranslation,
      assistantOriginal: llmResponse.assistantOriginal,
      assistantTranslation: llmResponse.assistantTranslation,
    };
    this.updateMessages(conversation);

    return conversation;
  };

  validateGenerateResponseBody = (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    const result = generateResponseSchema.safeParse(req.body);
    if (!result.success) {
      res.status(400).send(result.error);
      return;
    }
    res.locals.validatedGenerateResponseBody = result.data;
    next();
  };

  /**
   * Check if the service is healthy
   */
  async checkHealth() {
    try {
      const response = await axios.get(`${OLLAMA_API_URL}/`);
      return response.status === 200;
    } catch (error) {
      console.error("LLM service health check failed:", error);
      return false;
    }
  }
}
