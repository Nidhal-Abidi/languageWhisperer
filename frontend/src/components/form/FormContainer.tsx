import { useForm } from "react-hook-form";
import { ConversationScenarios } from "./ConversationScenarios";
import { LanguageGrid } from "./LanguageGrid";
import { LanguageProficiency } from "./LanguageProficiency";

export const FormContainer = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  console.log(errors);
  const afterSubmit = (data) => {
    console.log(data);
    alert("Success");
  };

  return (
    <form
      onSubmit={handleSubmit(afterSubmit)}
      className="px-40 flex flex-1 justify-center py-5"
    >
      <div className="flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
        <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
          Fill the form
        </h2>
        <LanguageProficiency register={register} />
        <LanguageGrid type="conversation-language" register={register} />
        <LanguageGrid type="translation-language" register={register} />
        <ConversationScenarios register={register} />
        <div className="flex px-4 py-3 justify-center">
          <button
            type="submit"
            className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-10 px-4 flex-1 bg-[#5583B4] text-white text-sm font-bold leading-normal tracking-[0.015em] transition-all duration-300 ease-in-out hover:bg-[#304D6D]"
          >
            Start Practicing
          </button>
        </div>
      </div>
    </form>
  );
};
