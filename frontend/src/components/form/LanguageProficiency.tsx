import { RefObject } from "react";
import { FieldValues, UseFormRegister } from "react-hook-form";

export const LanguageProficiency = ({
  register,
  errorMessage,
  ref,
}: {
  register: UseFormRegister<FieldValues>;
  errorMessage?: string;
  ref: RefObject<HTMLDivElement | null>;
}) => {
  return (
    <div
      ref={ref}
      className={`
        rounded-lg overflow-hidden border
        transition-colors duration-300 ease-in-out
        ${
          errorMessage
            ? "bg-red-50 border-red-400"
            : "bg-transparent border-transparent"
        }
      `}
    >
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pt-4 pb-2">
        Choose a language proficiency for the conversation
      </h3>

      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <select
            {...register("language-proficiency", {
              required: {
                value: true,
                message: "Language Proficiency is required!",
              },
            })}
            name="language-proficiency"
            className={`
              form-input flex w-full min-w-0 flex-1
              resize-none overflow-hidden rounded-xl
              text-[#111418] focus:outline-0 focus:ring-0
              border transition-colors duration-300 ease-in-out
              bg-white h-14
              bg-[image:--select-button-svg]
              placeholder:text-[#637588]
              p-[15px] text-base font-normal leading-normal
              ${
                errorMessage
                  ? "bg-red-50 border-red-400"
                  : "border-[#dce0e5] focus:border-[#dce0e5]"
              }
            `}
          >
            <option value="A1">A1</option>
            <option value="A2">A2</option>
            <option value="B1">B1</option>
            <option value="B2">B2</option>
            <option value="C1">C1</option>
            <option value="C2">C2</option>
          </select>

          <div
            className={`
              text-red-600 text-sm mt-1 overflow-hidden
              transition-[max-height,opacity] duration-300 ease-in-out
              ${errorMessage ? "max-h-40 opacity-100" : "max-h-0 opacity-0"}
            `}
          >
            {errorMessage}
          </div>
        </label>
      </div>
    </div>
  );
};
