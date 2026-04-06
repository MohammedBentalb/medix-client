import { BrowserRouter, Route, Routes } from "react-router";
import Home from "./pages/public/Home";
import { MainLayout } from "./layouts/MainLayout";
import { RoleSelection } from "./pages/auth/RoleSelection";
import { DoctorSignIn } from "./pages/auth/login/DoctorSignIn";
import { PatientSignIn } from "./pages/auth/login/PatientSignIn";
import { AssistantSignIn } from "./pages/auth/login/AssistantSignIn";
import { DoctorRegister } from "./pages/auth/register/DoctorRegister";
import { PatientRegister } from "./pages/auth/register/PatientRegister";
import { AssistantRegister } from "./pages/auth/register/AssistantRegister";

export default function () {
  return (
    <>
      <BrowserRouter>
        <Routes>
          
          <Route element={<MainLayout />}>
            <Route path="/" element={<Home />} />
          </Route>

          <Route
            path="/auth/sign-in/roles"
            element={<RoleSelection login={true} />}
          />
          <Route
            path="/auth/sign-up/roles"
            element={<RoleSelection login={false} />}
          />
          <Route path="/auth/sign-in/doctor" element={<DoctorSignIn />} />
          <Route path="/auth/sign-in/patient" element={<PatientSignIn />} />
          <Route path="/auth/sign-in/assistant" element={<AssistantSignIn />} />

          <Route path="/auth/sign-up/doctor" element={<DoctorRegister />} />
          <Route path="/auth/sign-up/patient" element={<PatientRegister />} />
          <Route path="/auth/sign-up/assistant" element={<AssistantRegister />} />

        </Routes>
      </BrowserRouter>
    </>
  );
}
