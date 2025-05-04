import { FormContainer } from "./FormContainer";
import { FormHeader } from "./FormHeader";

export const Form = () => {
  return (
    <div className="relative flex size-full min-h-screen flex-col bg-white group/design-root overflow-x-hidden">
      <div className="layout-container flex h-full grow flex-col">
        <FormHeader />
        <FormContainer />
      </div>
    </div>
  );
};
