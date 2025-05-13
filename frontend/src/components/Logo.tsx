import { useNavigate } from "react-router";
import { useLocalStorage } from "../hooks/useLocalStorage";
import axios from "axios";
import { BACKEND_URL } from "../utils/config";

export const Logo = () => {
  const navigate = useNavigate();
  const { clearSession } = useLocalStorage();

  const startNewConversation = async () => {
    // Reset the conversation on the backend to remove all the stored messages.
    try {
      const { data } = await axios.post(
        `${BACKEND_URL}/api/reset-conversation`
      );
      console.log(data);
      // Remove the session Data stored locally.
      clearSession();
      // Move to the form page.
      navigate("/", { replace: true });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="inline-block hover:text-[#5583B4] transition-colors">
      <svg
        className="cursor-pointer color-current"
        onClick={startNewConversation}
        xmlns="http://www.w3.org/2000/svg"
        width="150"
        height="50"
        viewBox="0 0 350 100"
      >
        <style>
          <style>
            @import
            url('https://fonts.googleapis.com/css2?family=Permanent+Marker&amp;display=swap');
          </style>
        </style>

        <rect x="0" y="0" width="100" height="100" fill="currentColor" />

        <text
          x="50"
          y="50"
          fill="#fff"
          fontFamily="Permanent Marker"
          fontSize="48"
          fontWeight="bold"
          textAnchor="middle"
          dominantBaseline="middle"
        >
          LW
        </text>

        <g
          transform="translate(120, 45)"
          fontFamily="Permanent Marker"
          fontWeight="bold"
          fontSize="36"
          fill="currentColor"
        >
          <text dominantBaseline="middle" dy="-0.6em">
            Language
          </text>
          <text dominantBaseline="middle" dy="0.9em">
            Whisperer
          </text>
        </g>
      </svg>
    </div>
  );
};
