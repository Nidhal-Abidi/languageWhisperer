import { useNavigate } from "react-router";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import axios from "axios";
import { BACKEND_URL } from "../../utils/config";
import { useConversationStorage } from "../../hooks/useConversationStorage";

export const RestartConversation = () => {
  const navigate = useNavigate();
  const { clearSession } = useLocalStorage();
  const { clearMessages } = useConversationStorage();

  const startNewConversation = async () => {
    // Reset the conversation on the backend to remove all the stored messages.
    try {
      await axios.post(`${BACKEND_URL}/api/reset-conversation`);
      // Remove the session Data stored locally.
      clearSession();
      clearMessages();
      // Move to the form page.
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex px-4 py-3 justify-center">
      <button
        className="flex min-w-[84px] max-w-[480px] cursor-pointer items-center justify-center overflow-hidden rounded-xl h-12 px-5 bg-[#1980e6] text-white text-base font-bold leading-normal tracking-[0.015em]"
        onClick={startNewConversation}
      >
        Start a new conversation
      </button>
    </div>
  );
};
