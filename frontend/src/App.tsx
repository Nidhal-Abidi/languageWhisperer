import "/node_modules/flag-icons/css/flag-icons.min.css";
import "./App.css";
import { Form } from "./components/form/Form";
import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import { Session } from "./components/session/Session";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Form />} />
        <Route path="/sessions/:sessionId" element={<Session />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
