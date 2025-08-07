import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import RegisterAdmin from './components/RegisterAdmin';
import CreateTeacher from './components/CreateTeacher';
import CreateCircle from './components/CreateCircle';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="*" element={<RegisterAdmin />} />
        <Route path="/createTeacher" element={<CreateTeacher />} />
           <Route path="/createCircle" element={<CreateCircle />} />
      </Routes>
    </Router>
  );
}

export default App;

