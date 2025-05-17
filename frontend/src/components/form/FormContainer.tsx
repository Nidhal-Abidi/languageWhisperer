import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { ConversationScenarios } from "./ConversationScenarios";
import { LanguageGrid } from "./LanguageGrid";
import { LanguageProficiency } from "./LanguageProficiency";
import { useEffect, useRef, useState } from "react";
import { useFormErrorScroll } from "./useFormErrorScroll";
import { createNewSession } from "../../utils/utilities";
import { getScenarioDescription } from "../../utils/constants";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export const FormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    watch,
  } = useForm();

  const [customScenarioRequired, setCustomScenarioRequired] = useState(false);
  const refs = {
    "language-proficiency": useRef<HTMLDivElement>(null),
    "conversation-language": useRef<HTMLDivElement>(null),
    "translation-language": useRef<HTMLDivElement>(null),
    scenario: useRef<HTMLDivElement>(null),
  };
  const navigate = useNavigate();
  const { storeSession } = useLocalStorage();

  useFormErrorScroll(errors, refs);

  const selectedScenario = watch("scenario");

  const afterSubmit = async (formData: any) => {
    formData = {
      ...formData,
      scenario:
        formData.scenario === "custom-scenario"
          ? formData.customScenario
          : getScenarioDescription(formData.scenario),
    };
    // response type --> {message: string; meta_path:string; session_id: string;}
    const response = await createNewSession(formData);

    storeSession({
      "conversation-language": formData["conversation-language"],
      "translation-language": formData["translation-language"],
      "language-proficiency": formData["language-proficiency"],
      scenario: formData.scenario,
      metaPath: response.meta_path,
      sessionId: response.session_id,
    });

    navigate(`/sessions/${response.session_id}`);
  };

  useEffect(() => {
    setCustomScenarioRequired(selectedScenario === "custom-scenario");

    // Clear custom scenario value when switching away from custom scenario
    if (selectedScenario !== "custom-scenario") {
      setValue("customScenario", "");
    }
  }, [selectedScenario, setValue]);

  return (
    <form
      onSubmit={handleSubmit(afterSubmit)}
      className="px-40 flex flex-1 justify-center py-5"
    >
      <div className="flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Fill the form
        </h2>
        <LanguageProficiency
          register={register}
          errorMessage={errors["language-proficiency"]?.message as string}
          ref={refs["language-proficiency"]}
        />
        <LanguageGrid
          type="conversation-language"
          register={register}
          errorMessage={errors["conversation-language"]?.message as string}
          ref={refs["conversation-language"]}
        />
        <LanguageGrid
          type="translation-language"
          register={register}
          errorMessage={errors["translation-language"]?.message as string}
          ref={refs["translation-language"]}
        />
        <ConversationScenarios
          register={register}
          errorMessage={errors["scenario"]?.message as string}
          customScenarioError={errors.customScenario?.message as string}
          ref={refs["scenario"]}
        />
        <div className="flex px-4 py-3 justify-center">
          <button
            type="submit"
            disabled={isSubmitting}
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#5583B4] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all duration-300 ease-in-out hover:bg-[#304D6D] disabled:bg-gray-400"
          >
            {isSubmitting ? "Submitting..." : "Start Practicing"}
          </button>
        </div>
      </div>
    </form>
  );
};
