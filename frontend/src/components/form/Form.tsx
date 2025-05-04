import { FormFields } from "./FormFields";
import { FormHeader } from "./FormHeader";

export const Form = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <FormHeader />
        <form className="px-40 flex flex-1 justify-center py-5">
          <div className="flex flex-col w-[512px] py-5 max-w-[960px] flex-1">
            <h2 className="text-[#111418] tracking-light text-[28px] font-bold leading-tight px-4 text-center pb-3 pt-5">
              Fill the form
            </h2>
            <FormFields />
          </div>
        </form>
      </div>
    </div>
  );
};
