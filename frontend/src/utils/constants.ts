import { Scenario } from "./utilities";

const casualConversationScenarios = [
  "You're at your regular morning café. The familiar barista smiles as you approach to order. You are a daily customer, and the assistant is the friendly barista who recognizes you and enjoys chatting while preparing your coffee.",
  "You've just moved into the neighborhood last week. Your neighbor stops by to welcome you. You are the new resident, and the assistant is your longtime neighbor offering local insights and a friendly welcome to the area.",
  "At a friend's birthday celebration, you meet someone new. You discover you both know the host through different connections. You are a party guest, and the assistant is another attendee you've just started talking with.",
];

const businessMeetingScenarios = [
  "You're seated across from the hiring manager for your job interview. Your resume is on the table between you. You are a candidate applying for a position, and the assistant is the hiring manager evaluating your qualifications.",
  "Your company needs specialized services to solve ongoing challenges. You're meeting with a potential consultant. You represent your company seeking solutions, and the assistant is the consultant exploring your needs.",
  "It's time for your project status meeting. The timeline is displayed with upcoming deadlines highlighted. You are a team member on this important initiative, and the assistant is your project manager reviewing progress.",
];

const TravelPlanningScenarios = [
  "You've arrived in a new city and visited the tourism office for recommendations. You are a first-time visitor, and the assistant is a knowledgeable local guide ready to share tips and must-see attractions for your stay.",
  "After a long journey, you've finally reached your hotel. You approach the front desk, luggage in tow. You are a tired traveler, and the assistant is the helpful clerk handling your check-in and orientation.",
  "You want to dine at a popular local restaurant during your visit. You're calling to secure a table. You are a potential diner, and the assistant is the restaurant host managing reservations and answering questions about the menu.",
];

const moviesAndEntertainmentScenarios = [
  "You're planning your weekend entertainment and looking for something great to watch. You are seeking personalized film suggestions, and the assistant is a film enthusiast who loves discussing movies and offering tailored recommendations.",
  "You're wandering the bookstore aisles, looking for your next read. A staff member notices and offers help. You are a customer exploring new books, and the assistant is a well-read employee who can suggest titles based on your interests.",
  "You're interested in an upcoming music event but need more details before buying tickets. You are a potential concert-goer, and the assistant is a venue staff member who can provide information about the event and seating options.",
];

const randomIntFromInterval = (min: number, max: number) => {
  // min and max included
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getScenarioDescription = (scenario: Scenario) => {
  switch (scenario) {
    case "casual-conversation": {
      const idx = randomIntFromInterval(
        0,
        casualConversationScenarios.length - 1
      );
      return casualConversationScenarios[idx];
    }
    case "business-meeting": {
      const idx = randomIntFromInterval(0, businessMeetingScenarios.length - 1);
      return businessMeetingScenarios[idx];
    }
    case "travel-planning": {
      const idx = randomIntFromInterval(0, TravelPlanningScenarios.length - 1);
      return TravelPlanningScenarios[idx];
    }
    case "movies-and-entertainment": {
      const idx = randomIntFromInterval(
        0,
        moviesAndEntertainmentScenarios.length - 1
      );
      return moviesAndEntertainmentScenarios[idx];
    }

    default:
      throw Error(`Scenario (${scenario}) doesn't exist!`);
  }
};

export type Languages =
  | "japanese"
  | "spanish"
  | "french"
  | "british-english"
  | "american-english"
  | "portuguese"
  | "hindi"
  | "italian"
  | "mandarin";

export type LanguageProficiency = "A1" | "A2" | "B1" | "B2" | "C1" | "C2";

export type Interaction = {
  userOriginal?: string;
  userTranslation?: string;
  assistantOriginal?: string;
  assistantTranslation?: string;
  userAudioUrl?: string;
  assistantAudioUrl?: string;
};

export const languages = [
  { code: "japanese", text: "Japanese", flag: "fi-jp" },
  { code: "spanish", text: "Spanish", flag: "fi-es" },
  { code: "french", text: "French", flag: "fi-fr" },
  { code: "british-english", text: "British English", flag: "fi-gb" },
  { code: "american-english", text: "American English", flag: "fi-us" },
  { code: "portuguese", text: "Portuguese", flag: "fi-pt" },
  { code: "hindi", text: "Hindi", flag: "fi-in" },
  { code: "italian", text: "Italian", flag: "fi-it" },
  { code: "mandarin", text: "Mandarin", flag: "fi-cn" },
];

export const getFlag = (languageCode: string) => {
  const requestedLanguage = languages.find(
    (lang) => lang.code === languageCode
  );
  if (!requestedLanguage) throw new Error("Flag not found!");
  return requestedLanguage.flag;
};
