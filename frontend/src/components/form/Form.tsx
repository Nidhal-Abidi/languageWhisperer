import { FormContainer } from "./FormContainer";
import { FormHeader } from "./FormHeader";
import { useScrollToPageTop } from "../../hooks/useScrollToPageTop";

export const Form = () => {
  useScrollToPageTop();

  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <FormHeader />
        <FormContainer />
      </div>
    </div>
  );
};
