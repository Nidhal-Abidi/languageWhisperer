import { FormEvent, useState } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

const MAX_NBR_OF_CARACTERS = 300;

export const CustomConversationScenario = ({
  register,
  showCustomScenario,
  errorMessage,
}: {
  register: UseFormRegister<FieldValues>;
  showCustomScenario: boolean;
  errorMessage?: string;
}) => {
  const [nbrOfCaracters, setNbrOfCaracters] = useState(0);

  const handleTextAreaInput = (e: FormEvent<HTMLTextAreaElement>) => {
    const target = e.target as HTMLTextAreaElement;
    const contentLength = target.value.length;
    if (contentLength > 300) return;
    setNbrOfCaracters(contentLength);
  };

  if (!showCustomScenario) {
    return null;
  }

  return (
    <div className="flex flex-col">
      <textarea
        id="customScenarioInput"
        {...register("customScenario", {
          validate: (value) => {
            if (showCustomScenario && !value) {
              return "Custom scenario description is required";
            }
            return true;
          },
        })}
        onInput={handleTextAreaInput}
        maxLength={300}
        name="customScenario"
        className={`border ${
          errorMessage ? "border-red-400 bg-red-50" : "border-[#dce0e5]"
        } rounded-lg m-4 mb-0.5 p-2`}
        placeholder={`Describe your custom scenario 1-3 sentences. For best results: \n- Be specific about the setting and goal (e.g., "Ordering food at a cafe") \n- Mention any roles involved (e.g., "I'm a tourist asking for directions") \n- Include key topics to discuss (e.g., "Discussing weekend plans with a colleague")\n\nExample: "I'm at a job interview for a marketing position. The interviewer is asking about my experience and qualifications."`}
        rows={8}
      />
      <div
        className={`text-sm flex justify-end mr-4 ${
          showCustomScenario ? "" : "hidden"
        } ${
          nbrOfCaracters < 200
            ? "text-gray-500"
            : nbrOfCaracters < 250
            ? "text-orange-400"
            : "text-red-600"
        } `}
      >
        {nbrOfCaracters}/ {MAX_NBR_OF_CARACTERS}
      </div>
      {errorMessage && (
        <div className="bg-red-500 text-white text-sm p-2 mx-4 mb-4 rounded-lg">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
