import React from "react";

// Outermost wrapper that positions the message left (Bot) or right (User)
export const MessageContainer = ({
  sender,
  children,
}: {
  sender: "user" | "bot";
  children: React.ReactNode;
}) => {
  return (
    <div
      className={`flex ${
        sender === "user" ? "justify-end" : "justify-start"
      } mb-4`}
    >
      {children}
    </div>
  );
};
