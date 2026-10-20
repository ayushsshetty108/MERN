import { Box } from "@chakra-ui/react";
import { Route, Routes } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Homepage from "../pages/Homepage.jsx";
import CreatePage from "../pages/CreatePage.jsx";

function App() {
  return (
    <Box minH="100vh">
      <Navbar />          
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App


//navbar is there that means which ever page you visit navbar will always present in every page
