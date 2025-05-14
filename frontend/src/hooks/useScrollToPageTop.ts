import { useEffect } from "react";

export const useScrollToPageTop = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
};
