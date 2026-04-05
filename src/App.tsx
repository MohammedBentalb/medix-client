import {BrowserRouter, Route, Routes} from 'react-router';
import Home from './pages/public/Home';
import { MainLayout } from './layouts/MainLayout';
import { RoleSelection } from './sections/auth/RoleSelection';
import { DoctorSignIn } from './sections/auth/login/DoctorSignIn';
import { PatientSignIn } from './sections/auth/login/PatientSignIn';
import { AssistantSignIn } from './sections/auth/login/AssistantSignIn';


export default function () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route path="/auth/roles" element={<RoleSelection />} />
          <Route path="/auth/sign-in/doctor" element={<DoctorSignIn />} />
          <Route path="/auth/sign-in/patient" element={<PatientSignIn />} />
          <Route path="/auth/sign-in/assistant" element={<AssistantSignIn />} />
          
        </Routes>
      </BrowserRouter>
    </>
  );
}
