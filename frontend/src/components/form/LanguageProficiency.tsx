export const LanguageProficiency = () => {
  return (
    <>
      <h3 className="text-[#111418] text-lg font-bold leading-tight tracking-[-0.015em] px-4 pb-2 pt-4">
        Choose a language proficiency for the conversation
      </h3>
      <div className="flex max-w-[480px] flex-wrap items-end gap-4 px-4 py-3">
        <label className="flex flex-col min-w-40 flex-1">
          <select
            name="language-proficiency"
            className="form-input flex w-full min-w-0 flex-1 resize-none overflow-hidden rounded-xl text-[#111418] focus:outline-0 focus:ring-0 border border-[#dce0e5] bg-white focus:border-[#dce0e5] h-14 bg-[image:--select-button-svg] placeholder:text-[#637588] p-[15px] text-base font-normal leading-normal"
          >
            <option defaultValue="a1">A1</option>
            <option defaultValue="a2">A2</option>
            <option defaultValue="b1">B1</option>
            <option defaultValue="b2">B2</option>
            <option defaultValue="c1">C1</option>
            <option defaultValue="c2">C2</option>
          </select>
        </label>
      </div>
    </>
  );
};
