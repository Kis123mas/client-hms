import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Receptionist from './pages/Receptionist/Receptionist';
import RegisterPatient from './pages/Receptionist/RegisterPatient';
import BookAppointment from './pages/Receptionist/BookAppointment';
import NotFound from './pages/Notfound';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/receptionist" element={<Receptionist />} />
          <Route path="/registerpatient" element={<RegisterPatient />} />
          <Route path="/bookappointment" element={<BookAppointment />} />
          {/* Add this catch-all route at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;