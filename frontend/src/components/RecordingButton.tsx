import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMicrophone } from "@fortawesome/free-solid-svg-icons";

export const RecordingButton = () => {
  const [active, setActive] = useState(false);
  const handleClick = () => {
    const newActiveState = !active;
    console.log("Active state changing to:", newActiveState);
    setActive(newActiveState);
  };

  return (
    <div
      className="relative flex items-center justify-center w-20 h-20 rounded-full bg-white shadow-xl ring ring-gray-100 transition duration-500 cursor-pointer"
      style={
        active
          ? {
              backgroundColor: "#1980e6",
              animation: "bounce-custom 1.5s ease-in-out infinite 0.25s",
            }
          : {}
      }
      onClick={handleClick}
    >
      <FontAwesomeIcon
        icon={faMicrophone}
        className={`
      text-[23px] transition duration-500
      ${active ? "text-gray-100" : "text-blue-600"}
    `}
      />
    </div>
  );
};
