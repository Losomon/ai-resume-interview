import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';

import { ProtectedRoute } from '../components/auth/ProtectedRoute';
import { DashboardLayout } from '../components/layout/DashboardLayout';

import Landing from '../pages/Landing';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import NotFound from '../pages/NotFound';

const Dashboard = lazy(() => import('../pages/Dashboard'));
const Resumes = lazy(() => import('../pages/Resumes'));
const ResumeBuilder = lazy(() => import('../pages/ResumeBuilder'));
const ATSAnalyzer = lazy(() => import('../pages/ATSAnalyzer'));
const Jobs = lazy(() => import('../pages/Jobs'));
const Interview = lazy(() => import('../pages/Interview'));
const InterviewRoom = lazy(() => import('../pages/InterviewRoom'));
const InterviewResults = lazy(() => import('../pages/InterviewResults'));
const CareerCoach = lazy(() => import('../pages/CareerCoach'));
const Applications = lazy(() => import('../pages/Applications'));
const Settings = lazy(() => import('../pages/Settings'));
const DesignSystem = lazy(() => import('../pages/DesignSystem'));

export default function AppRoutes() {
  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes>
        {/* Public */}
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />

        {/* Dev-only design system reference */}
        <Route path="/design-system" element={<DesignSystem />} />

        {/* Auth-guarded — everything below requires a token */}
        <Route element={<ProtectedRoute />}>
          {/* Builder — own shell, no dashboard chrome */}
          <Route path="/resumes/:id" element={<ResumeBuilder />} />

          {/* Focused, no sidebar — per spec §17 */}
          <Route path="/interview/room" element={<InterviewRoom />} />

          {/* Dashboard shell */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/resumes" element={<Resumes />} />
            <Route path="/ats" element={<ATSAnalyzer />} />
            <Route path="/jobs" element={<Jobs />} />
            <Route path="/interview" element={<Interview />} />
            <Route path="/interview/results" element={<InterviewResults />} />
            <Route path="/coach" element={<CareerCoach />} />
            <Route path="/applications" element={<Applications />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}

function RouteFallback() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-bg">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-orb-think rounded-full border-2 border-primary border-t-transparent" />
        <p className="text-small text-text-muted">Loading…</p>
      </div>
    </div>
  );
}
