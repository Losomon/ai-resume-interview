import { Routes, Route } from "react-router-dom";

import { DashboardLayout } from "../components/layout/DashboardLayout";

import Landing from "../pages/Landing";
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgotPassword from "../pages/ForgotPassword";

import Dashboard from "../pages/Dashboard";
import Resumes from "../pages/Resumes";
import ResumeBuilder from "../pages/ResumeBuilder";
import ATSAnalyzer from "../pages/ATSAnalyzer";
import Jobs from "../pages/Jobs";

import Interview from "../pages/Interview";
import InterviewRoom from "../pages/InterviewRoom";
import InterviewResults from "../pages/InterviewResults";

import CareerCoach from "../pages/CareerCoach";
import Applications from "../pages/Applications";
import Settings from "../pages/Settings";

import NotFound from "../pages/NotFound";
import DesignSystem from "../pages/DesignSystem";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route path="/"                element={<Landing />} />
      <Route path="/login"           element={<Login />} />
      <Route path="/register"        element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />

      {/* Dev-only design system reference */}
      <Route path="/design-system" element={<DesignSystem />} />

      {/* Focused, no sidebar — per spec §17 */}
      <Route path="/interview/room" element={<InterviewRoom />} />

      {/* Dashboard shell */}
      <Route element={<DashboardLayout />}>
        <Route path="/dashboard"        element={<Dashboard />} />
        <Route path="/resumes"          element={<Resumes />} />
        <Route path="/resumes/:id"      element={<ResumeBuilder />} />
        <Route path="/ats"              element={<ATSAnalyzer />} />
        <Route path="/jobs"             element={<Jobs />} />
        <Route path="/interview"        element={<Interview />} />
        <Route path="/interview/results" element={<InterviewResults />} />
        <Route path="/coach"            element={<CareerCoach />} />
        <Route path="/applications"     element={<Applications />} />
        <Route path="/settings"         element={<Settings />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}