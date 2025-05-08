import { SenderIndicator } from "./SenderIndicator";

export const MessageFooter = ({
  sender,
  children,
}: {
  sender: "user" | "bot";
  children: React.ReactNode;
}) => {
  return (
    <div className="mt-2 pt-2 border-t border-gray-300">
      <div className="flex justify-between items-center">
        {children}
        <SenderIndicator sender={sender} />
      </div>
    </div>
  );
};
