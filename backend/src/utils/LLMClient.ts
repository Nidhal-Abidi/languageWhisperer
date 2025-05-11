import { NextFunction, Request, Response, Router } from "express";
import axios from "axios";

import { generateResponseSchema } from "../schema/llm.schema.js";
import { OLLAMA_API_URL } from "../index.js";

type Role = "assistant" | "user" | "system";

export class LLMClient {
  private modelName = "gemma3:1b";
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
      const initialInstruction = `Respond naturally in ${conversationLanguage} at ${languageProficiency} level for scenario: ${scenario}. Don't exceed 3 short sentences in your response! Also: Never use markdown or lists, maximum number of tokens  is 120.`;

      // Append the initial developer message.
      this.messagesHistory.push({
        role: "system",
        content: initialInstruction,
      });
    }
    this.messagesHistory.push({ role: "user", content: userMessage });

    const { data } = await axios.post(`${OLLAMA_API_URL}/api/chat`, {
      model: this.modelName,
      stream: false,
      messages: this.messagesHistory,
      options: {
        temperature: 0.2,
        num_predict: 120,
        repeat_penalty: 1.1,
      },
    });

    const llmResponse = data.message.content;
    const [{ data: userTrans }, { data: assistantTrans }] = await Promise.all([
      // User message translation
      axios.post(`${OLLAMA_API_URL}/api/generate`, {
        model: this.modelName,
        stream: false,
        prompt: `Translate this "${userMessage}" to ${translationLanguage}. Don't output any extra word except for the translation.`,
        options: { temperature: 0 },
      }),

      // Assistant response translation
      axios.post(`${OLLAMA_API_URL}/api/generate`, {
        model: this.modelName,
        stream: false,
        prompt: `Translate this "${llmResponse}" to ${translationLanguage}. Don't output any extra word except for the translation.`,
        options: { temperature: 0 },
      }),
    ]);

    const conversation: {
      userOriginal: string;
      userTranslation: string;
      assistantOriginal: string;
      assistantTranslation: string;
    } = {
      userOriginal: userMessage,
      userTranslation: userTrans.response,
      assistantOriginal: llmResponse,
      assistantTranslation: assistantTrans.response,
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
