import { Logo } from "../Logo";

export const FormHeader = () => {
  return (
    <header className="sticky inset-x-0 top-0 z-50 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#f0f2f4] px-10 py-3">
      <div className="flex items-center gap-4 text-[#111418]">
        <Logo />
      </div>
    </header>
  );
};
