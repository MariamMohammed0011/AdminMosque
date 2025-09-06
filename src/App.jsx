import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Toaster } from "sonner"; 

import LoginAdmin from "./components/LoginAdmin";
import CreateTeacher from "./components/CreateTeacher";
import CreateStudent from "./components/CreateStudent";
import CreateCircle from "./components/CreateCircle";
import Dashboard from "./components/Dashboard";
import Challenges from "./components/challenges/Challenges";
import Statistics from "./components/statistics/Statistics";

import AdminProfile from "./components/profiles/AdminProfile";
import UserProfile from "./components/profiles/UserProfile";
function App() {
  return (
    <Router>
    
     <Toaster position="bottom-left" richColors closeButton  duration={4000} />

     
      <Routes>
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/createTeacher" element={<CreateTeacher />} />
        <Route path="/createStudent" element={<CreateStudent />} />
        <Route path="/createCircle" element={<CreateCircle />} />     
        <Route path="/createCircle/:circleId" element={<CreateCircle />} /> 
        <Route path="/createChallenge" element={<Challenges />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/adminPro" element={<AdminProfile />} />
        <Route path="/userPro/:id" element={<UserProfile />} />
      </Routes>
    </Router>
  );
}

export default App;
