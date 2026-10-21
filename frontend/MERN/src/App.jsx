import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Homepage from "../pages/Homepage.jsx";
import CreatePage from "../pages/CreatePage.jsx";
import "./app.css";

function App() {
  return (
    <div className="app-shell">
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
        <Route path="/edit/:id" element={<CreatePage />} />
      </Routes>
    </div>
  );
}

export default App;
