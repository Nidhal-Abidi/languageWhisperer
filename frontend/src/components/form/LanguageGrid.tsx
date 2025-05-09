import { RefObject } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";
import { languages } from "../../utils/constants";

export const LanguageGrid = ({
  type,
  register,
  errorMessage,
  ref,
}: {
  type: "conversation-language" | "translation-language";
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={ref}
      className={`mb-2 rounded-lg overflow-hidden border ${
        errorMessage
          ? "bg-red-50 border-red-400"
          : "bg-transparent border-transparent"
      }`}
    >
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-4 pb-2">
        Choose a language for{" "}
        {type === "conversation-language"
          ? "the conversation."
          : "translating the conversation."}
      </h3>

      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 px-4 pb-4">
        {languages.map((language, idx) => (
          <label
            key={idx}
            className={`flex flex-col gap-3 p-4 rounded-lg border ${
              errorMessage ? "border-red-400" : "border-[#dce0e5]"
            } bg-white hover:bg-[#D3D3D3] transition-all duration-300 ease-in-out cursor-pointer [&:has(input:checked)]:bg-[#D3D3D3]`}
          >
            <input
              type="radio"
              {...register(type, {
                required: {
                  value: true,
                  message: `${
                    type === "conversation-language"
                      ? "Conversation Language"
                      : "Language of Translation"
                  } is required!`,
                },
              })}
              name={type}
              value={language.code}
              className="absolute opacity-0 w-0 h-0"
            />
            <div
              className={`aspect-square w-10 shrink-0 rounded-lg border border-[#dce0e5] bg-center bg-no-repeat bg-cover ${language.flag}`}
            />
            <h2 className="text-[#111418] text-base font-bold leading-tight">
              {language.text}
            </h2>
          </label>
        ))}
      </div>

      {errorMessage && (
        <div className="bg-red-600 text-white text-sm px-4 py-2">
          {errorMessage}
        </div>
      )}
    </div>
  );
};
