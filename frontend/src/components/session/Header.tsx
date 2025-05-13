import { ArrowRightLeft } from "lucide-react";
import { getFlag, LanguageProficiency, Languages } from "../../utils/constants";
import { Logo } from "../Logo";

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
    <header className="sticky inset-x-0 top-0 z-50 flex items-center justify-between  border-b border-solid border-b-[#f0f2f4] bg-white px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <Logo />
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
