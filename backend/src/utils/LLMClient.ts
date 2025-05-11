import { NextFunction, Request, Response, Router } from "express";
import axios from "axios";

import { generateResponseSchema } from "../schema/llm.schema.js";
import { OLLAMA_API_URL } from "../index.js";

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
      const initialInstruction = `You are a language learning assistant. ALWAYS respond with valid JSON containing EXACTLY these 3 keys:
{
  "userTranslation": "<exact_translation of user_message to ${translationLanguage}>",
  "assistantOriginal": "<your_response in ${conversationLanguage} using ${languageProficiency} level>",
  "assistantTranslation": "<exact_translation of your_response to ${translationLanguage}>"
}

Follow these RULES:
1. Never add extra fields or comments
2. Keep values as plain strings (no markdown)
3. userTranslation must directly translate the user's last message
4. assistantOriginal/Translation must match exactly
5. Stay in character for the ${scenario} scenario`;

      // Append the initial developer message.
      this.messagesHistory.push({
        role: "system",
        content: initialInstruction,
      });
    }
    this.messagesHistory.push({ role: "user", content: userMessage });

    const { data } = await axios.post(`${OLLAMA_API_URL}/api/chat`, {
      model: "phi3",
      stream: false,
      messages: this.messagesHistory,
      format: {
        type: "object",
        properties: {
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
          "userTranslation",
          "assistantOriginal",
          "assistantTranslation",
        ],
      },
      options: {
        temperature: 0.2,
        num_predict: 300,
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
