import { BrowserRouter, Route, Routes } from "react-router";
import { Toaster } from "sonner";
import Home from "./pages/public/Home";
import { MainLayout } from "./layouts/MainLayout";
import { RoleSelection } from "./pages/auth/RoleSelection";
import { DoctorSignIn } from "./pages/auth/login/DoctorSignIn";
import { PatientSignIn } from "./pages/auth/login/PatientSignIn";
import { AssistantSignIn } from "./pages/auth/login/AssistantSignIn";
import { DoctorRegister } from "./pages/auth/register/DoctorRegister";
import { PatientRegister } from "./pages/auth/register/PatientRegister";
import { AssistantRegister } from "./pages/auth/register/AssistantRegister";
import PublicOnly from "./auth/PublicOnly";
import { DoctorsListing } from "./pages/doctor/DoctorsListing";
import Protected from "./auth/Protected";
import { roles } from "./constants/Constant";
import { DoctorProfile } from "./pages/doctor/DoctorProfile";
import { DoctorAvailability } from "./pages/doctor/DoctorAvailability";
import { AssistantListing } from "./pages/assistant/AssistantListing";
import { AssistantProfile } from "./pages/assistant/AssistantProfile";
import { BookAppointment } from "./pages/patients/BookAppointment";
import { UserProfile } from "./pages/public/UserProfile";
import { MyAppointments } from "./pages/public/MyAppointments";
import { AppointmentProcess } from "./pages/doctor/AppointmentProcess";
import { MyPatients } from "./pages/public/MyPatients";
import { PatientHistory } from "./pages/public/PatientHistory";
import { MyVisits } from "./pages/public/MyVisits";
import { VisitDetails } from "./pages/doctor/VisitDetails";

export default function () {
  return (
    <>
      <Toaster richColors position="top-right" />
      <BrowserRouter>
        <Routes> 

          <Route element={<PublicOnly />}>
            <Route path="/auth/sign-in/roles" element={<RoleSelection login={true} />} />
            <Route path="/auth/sign-up/roles" element={<RoleSelection login={false} />} />

            <Route path="/auth/sign-in/doctor" element={<DoctorSignIn />} />
            <Route path="/auth/sign-in/patient" element={<PatientSignIn />} />
            <Route path="/auth/sign-in/assistant" element={<AssistantSignIn />} />

            <Route path="/auth/sign-up/doctor" element={<DoctorRegister />} />
            <Route path="/auth/sign-up/patient" element={<PatientRegister />} />
            <Route path="/auth/sign-up/assistant" element={<AssistantRegister />} />
          </Route>


          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
 
            <Route element={<Protected roles={[roles.doctor, roles.assistant, roles.patient]} />}>
              <Route path="/assistants" element={<AssistantListing />} />
              <Route path="/assistants/:id" element={<AssistantProfile />} />
              <Route path="/profile" element={<UserProfile />} />
            </Route>

            <Route element={<Protected roles={[roles.patient]} />}>
              <Route path="/doctors" element={<DoctorsListing />} />
              <Route path="/doctors/:id" element={<DoctorProfile />} />
              <Route path="/doctors/:id/book" element={<BookAppointment />} />
              <Route path="/my-visits" element={<MyVisits />} />
            </Route>

            <Route element={<Protected roles={[roles.doctor]} />}>
              <Route path="/doctors/availability" element={<DoctorAvailability />} />
            </Route>

            <Route element={<Protected roles={[roles.patient, roles.doctor, roles.assistant]} />}>
              <Route path="/appointments" element={<MyAppointments />} />
            </Route>

            <Route element={<Protected roles={[roles.doctor, roles.assistant]} />}>
              <Route path="/appointments/:id" element={<AppointmentProcess />} />
              <Route path="/my-patients" element={<MyPatients />} />
              <Route path="/patients/history/:id" element={<PatientHistory />} />
              <Route path="/visits/:visitId" element={<VisitDetails />} />
            </Route>
          </Route>

        </Routes>
      </BrowserRouter>
    </>
  );
}
