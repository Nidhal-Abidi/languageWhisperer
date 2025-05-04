import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { StrictMode } from "react";
import { library } from "@fortawesome/fontawesome-svg-core";

import {
  faComments,
  faBriefcase,
  faGlobe,
  faFilm,
  faWandMagicSparkles,
} from "@fortawesome/free-solid-svg-icons";

library.add(faComments, faBriefcase, faGlobe, faFilm, faWandMagicSparkles);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
