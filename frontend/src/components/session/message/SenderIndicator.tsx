export const SenderIndicator = ({ sender }: { sender: string }) => {
  return (
    <span className="text-xs font-medium text-gray-500">
      {sender === "user" ? "You" : "Bot"}
    </span>
  );
};
