import { ArrowRightLeft } from "lucide-react";
import { getFlag, LanguageProficiency, Languages } from "../../utils/constants";

export const Header = ({
  conversationLanguage,
  translationLanguage,
  proficiencyLevel,
}: {
  conversationLanguage: Languages;
  translationLanguage: Languages;
  proficiencyLevel: LanguageProficiency;
}) => {
  const conversationLanguageFlag = getFlag(conversationLanguage);
  const translationLanguageFlag = getFlag(translationLanguage);

  return (
    <header className="sticky top-0 flex items-center justify-between  border-b border-solid border-b-[#f0f2f4] bg-white px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <div className="size-4">
          <svg
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.0799 24L4 19.2479L9.95537 8.75216L18.04 13.4961L18.0446 4H29.9554L29.96 13.4961L38.0446 8.75216L44 19.2479L35.92 24L44 28.7521L38.0446 39.2479L29.96 34.5039L29.9554 44H18.0446L18.04 34.5039L9.95537 39.2479L4 28.7521L12.0799 24Z"
              fill="currentColor"
            ></path>
          </svg>
        </div>
        <h2 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em]">
          Language Whisperer
        </h2>
      </div>
      <div className="flex flex-1 justify-end wrap-normal gap-8">
        <div className="flex items-center rounded-xl px-4 py-2 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] cursor-not-allowed">
          <span
            className={`aspect-square w-10 shrink-0 rounded-lg border border-[#dce0e5] bg-center bg-no-repeat bg-cover ${conversationLanguageFlag}`}
          />
          <ArrowRightLeft />
          <span
            className={`aspect-square w-10 shrink-0 rounded-lg border border-[#dce0e5] bg-center bg-no-repeat bg-cover ${translationLanguageFlag}`}
          />
        </div>
        <div className="flex items-center rounded-xl px-4 py-2 bg-[#f0f2f4] text-[#111418] text-sm font-bold leading-normal tracking-[0.015em] cursor-not-allowed">
          {proficiencyLevel}
        </div>
      </div>
    </header>
  );
};
