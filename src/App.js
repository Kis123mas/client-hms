import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login'
import Register from './pages/Register'
import Receptionist from './pages/Receptionist/Receptionist';
import RegisterPatient from './pages/Receptionist/RegisterPatient';
import BookAppointment from './pages/Receptionist/BookAppointment';
import NotFound from './pages/Notfound';
import Doctor from './pages/Doctor/Doctor';
import Patient from './pages/Doctor/Patient';
import PatientEMR from './pages/Doctor/PatientEMR';
import Diagnosis from './pages/Doctor/Diagnosis';
import PatientDashboard from './pages/Patient/PatientDashboard';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* receptionist pages */}
          <Route path="/rep/receptionist" element={<Receptionist />} />
          <Route path="/rep/registerpatient" element={<RegisterPatient />} />
          <Route path="/rep/bookappointment" element={<BookAppointment />} />

          {/* doctors pages */}
          <Route path="/doc/doctor" element={<Doctor />} />
          <Route path="/doc/patient" element={<Patient />} />
          <Route path="/doc/patient-emr" element={<PatientEMR />} />
          <Route path="/doc/patient-diagnos" element={<Diagnosis />} />

          {/* patient pages */}
          <Route path="/pat/patient" element={<PatientDashboard />} />


          {/* Add this catch-all route at the end */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;