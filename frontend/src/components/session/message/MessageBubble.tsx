// Styling for the message bubble based on sender
export const MessageBubble = ({
  sender,
  children,
}: {
  sender: "user" | "bot";
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`max-w-xs md:max-w-md ${
        sender === "user"
          ? "bg-blue-100 rounded-tl-xl rounded-bl-xl rounded-tr-xl"
          : "bg-white border border-gray-300 rounded-tr-xl rounded-br-xl rounded-tl-xl"
      } shadow-sm`}
    >
      {children}
    </div>
  );
};
