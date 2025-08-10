import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import LoginAdmin from './components/LoginAdmin';
import CreateTeacher from './components/CreateTeacher';
import CreateCircle from './components/CreateCircle';
import CreateStudent from './components/CreateStudent';
import Dashboard from './components/Dashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/loginAdmin" element={<LoginAdmin />} />
        <Route path="/createStudent" element={<CreateStudent />} />
        <Route path="/createTeacher" element={<CreateTeacher />} />
           <Route path="/createCircle" element={<CreateCircle />} />
           <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

