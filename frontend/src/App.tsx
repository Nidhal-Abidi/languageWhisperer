import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./App.css";
import { Form } from "./components/form/Form";
import { BrowserRouter, Route, Routes } from "react-router";
import { Session } from "./components/session/Session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/sessions/:sessionId" element={<Session />} />
        {/* Instead of a 404 Error page, move to the Form page + remove the wrong pathname */}
        <Route path="*" element={<Form />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
