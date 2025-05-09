import axios from "axios";
import { getScenarioDescription } from "./constants";
import { BACKEND_URL } from "./config";
type FormData = {
  "language-proficiency": string;
  "conversation-language": string;
  "translation-language": string;
  scenario: Scenario;
  customScenario: string;
};

export type Scenario =
  | "casual-conversation"
  | "business-meeting"
  | "travel-planning"
  | "movies-and-entertainment"
  | "custom-scenario";

export const createNewSession = async (data: FormData) => {
  try {
    const response = await axios.post(`${BACKEND_URL}/api/sessions`, {
      conversationLanguage: data["conversation-language"],
      translationLanguage: data["translation-language"],
      languageProficiency: data["language-proficiency"],
      scenario:
        data.scenario === "custom-scenario"
          ? data.customScenario
          : getScenarioDescription(data.scenario),
    });

    return response.data;

    // Store session data in state management or pass to next page
    /* navigate(`/conversation/${response.data.session_id}`, {
      state: {
        formData: data,
        sessionData: response.data,
      },
    }); */
  } catch (error) {
    console.error("Submission failed:", error);
    // Handle error state in UI
  }
};
