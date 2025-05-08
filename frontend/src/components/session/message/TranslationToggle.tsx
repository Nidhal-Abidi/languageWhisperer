import { ChevronDown, ChevronUp, Globe } from "lucide-react";

export const TranslationToggle = ({
  isExpanded,
  onToggle,
}: {
  isExpanded: boolean;
  onToggle: () => void;
}) => {
  return (
    <button
      onClick={onToggle}
      className="flex items-center text-xs text-gray-500 hover:text-gray-700 cursor-pointer"
    >
      <Globe size={14} className="mr-1" />
      {isExpanded ? "Hide translation" : "Show translation"}
      {isExpanded ? (
        <ChevronUp size={14} className="ml-1" />
      ) : (
        <ChevronDown size={14} className="ml-1" />
      )}
    </button>
  );
};
