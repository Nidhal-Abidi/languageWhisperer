import React, { useEffect } from "react";
import { FieldErrors, FieldValues } from "react-hook-form";

// Custom hook that scrolls to the first form field with an error
export const useFormErrorScroll = (
  errors: FieldErrors<FieldValues>,
  refs: Record<string, React.RefObject<HTMLDivElement | null>>
) => {
  useEffect(() => {
    // If no errors or no refs, return early
    if (!errors || Object.keys(errors).length === 0 || !refs) return;

    // Get all field names that have errors
    const errorFields = Object.keys(errors);

    // Find the first field with an error that has a ref
    for (const fieldName of errorFields) {
      // Check if there's a direct ref for this field
      if (refs[fieldName] && refs[fieldName].current) {
        refs[fieldName].current.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
        return;
      }

      // Check for nested fields (like 'customScenario' in 'scenario')
      // This handles cases where the error might be in a child component
      for (const refKey of Object.keys(refs)) {
        if (fieldName.startsWith(refKey) && refs[refKey].current) {
          refs[refKey].current.scrollIntoView({
            behavior: "smooth",
            block: "start",
          });
          return;
        }
      }
    }
  }, [errors, refs]);
};
