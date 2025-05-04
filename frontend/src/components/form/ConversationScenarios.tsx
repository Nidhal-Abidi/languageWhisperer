import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export const ConversationScenarios = () => {
  const [showCustomScenario, setShowCustomScenario] = useState(false);
  const scenarios: { code: string; text: string; icon: IconProp }[] = [
    {
      code: "casual-conversation",
      text: "Casual Conversation",
      // @ts-expect-error check--> https://docs.fontawesome.com/web/use-with/react/add-icons
      icon: "fa-comments",
    },
    {
      code: "business-meeting",
      text: "Business Meeting",
      // @ts-expect-error check--> https://docs.fontawesome.com/web/use-with/react/add-icons
      icon: "fa-briefcase",
    },
    {
      code: "travel-planning",
      text: "Travel Planning",
      // @ts-expect-error check--> https://docs.fontawesome.com/web/use-with/react/add-icons
      icon: "fa-globe",
    },
    {
      code: "movies-and-entertainment",
      text: "Movies & Entertainment",
      // @ts-expect-error check--> https://docs.fontawesome.com/web/use-with/react/add-icons
      icon: "fa-film",
    },
    {
      code: "custom-scenario",
      text: "Custom Scenario",
      // @ts-expect-error check--> https://docs.fontawesome.com/web/use-with/react/add-icons
      icon: "fa-wand-magic-sparkles",
    },
  ];

  const handleClick = (code: string) => {
    if (code === "custom-scenario") {
      setShowCustomScenario(true);
    } else {
      setShowCustomScenario(false);
    }
  };

  return (
    <>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Conversation Scenarios
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {scenarios.map((scenario, idx) => {
          return (
            <label
              key={idx}
              className="flex flex-1 gap-3 rounded-lg border border-[#dce0e5] bg-white p-4 flex-col hover:bg-[#D3D3D3] transition-all duration-300 ease-in-out cursor-pointer [&:has(input:checked)]:bg-[#D3D3D3]"
            >
              <input
                type="radio"
                name="scenario"
                value={scenario.code}
                className="absolute opacity-0 w-0 h-0"
                onClick={() => handleClick(scenario.code)}
              />
              <div>
                <FontAwesomeIcon
                  icon={scenario.icon}
                  className="text-gray-600"
                />
              </div>
              <h2 className="text-[#111418] text-base font-bold leading-tight">
                {scenario.text}
              </h2>
            </label>
          );
        })}
      </div>
      <textarea
        id="customScenarioInput"
        name="customScenario"
        className={`border border-[#dce0e5] rounded-lg m-4 p-2  ${
          showCustomScenario ? "" : "hidden"
        } `}
        placeholder={`Describe your custom scenario 1-3 sentences. For best results: \n- Be specific about the setting and goal (e.g., "Ordering food at a cafe") \n- Mention any roles involved (e.g., "I'm a tourist asking for directions") \n- Include key topics to discuss (e.g., "Discussing weekend plans with a colleague")\n\nExample: "I'm at a job interview for a marketing position. The interviewer is asking about my experience and qualifications."`}
        rows={8}
      ></textarea>
    </>
  );
};
