export const LanguageGrid = ({
  type,
}: {
  type: "conversation-language" | "translation-language";
}) => {
  const languages = [
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

  return (
    <>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Choose a language for{" "}
        {type === "conversation-language"
          ? "the conversation."
          : "translating the conversation."}
      </h3>
      <div className="grid grid-cols-[repeat(auto-fit,minmax(158px,1fr))] gap-3 p-4">
        {languages.map((language, idx) => {
          return (
            <label
              key={idx}
              className="flex flex-1 gap-3 rounded-lg border border-[#dce0e5] bg-white p-4 flex-col hover:bg-[#D3D3D3] transition-all duration-300 ease-in-out cursor-pointer [&:has(input:checked)]:bg-[#D3D3D3]"
            >
              <input
                type="radio"
                name={type}
                value={language.code}
                className="absolute opacity-0 w-0 h-0"
              />
              <div
                className={`bg-center bg-no-repeat aspect-square bg-cover rounded-lg w-10 shrink-0 border border-[#dce0e5] ${language.flag}`}
              ></div>

              <h2 className="text-[#111418] text-base font-bold leading-tight">
                {language.text}
              </h2>
            </label>
          );
        })}
      </div>
    </>
  );
};
