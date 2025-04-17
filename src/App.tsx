import { Suspense, lazy } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";
import Home from "./components/pages/home";

// Lazy load components to reduce initial bundle size
const LoginForm = lazy(() => import("./components/auth/LoginForm"));
const SignUpForm = lazy(() => import("./components/auth/SignUpForm"));
const AdminLoginForm = lazy(() => import("./components/auth/AdminLoginForm"));
const PartnerLoginForm = lazy(
  () => import("./components/auth/PartnerLoginForm"),
);
const AdminDashboard = lazy(() => import("./components/admin/AdminDashboard"));
const PartnerDashboard = lazy(
  () => import("./components/partner/PartnerDashboard"),
);
const PartnerProfile = lazy(
  () => import("./components/partner/PartnerProfile"),
);
const PartnerSettings = lazy(
  () => import("./components/partner/PartnerSettings"),
);
const PartnerShops = lazy(() => import("./components/partner/PartnerShops"));
const ShopProfile = lazy(() => import("./components/partner/ShopProfile"));
const PartnerUpload = lazy(() => import("./components/partner/PartnerUpload"));
const PartnerCommissions = lazy(
  () => import("./components/partner/PartnerCommissions"),
);
const LeadTracking = lazy(() => import("./components/partner/LeadTracking"));
const Dashboard = lazy(() => import("./components/pages/dashboard"));
const Success = lazy(() => import("./components/pages/success"));

function PrivateRoute({
  children,
  requiredRole,
}: {
  children: React.ReactNode;
  requiredRole?: string;
}) {
  const { user, loading } = useAuth();

  if (loading) {
    return <LoadingScreen text="Authenticating..." />;
  }

  if (!user) {
    return <Navigate to="/" />;
  }

  // If a specific role is required, we would check it here
  // This would require fetching the user's role from the database
  // For now, we'll just return the children

  return <>{children}</>;
}

// Wrap components with Suspense to handle loading state
const SuspenseWrapper = ({ children }) => (
  <Suspense fallback={<LoadingScreen text="Loading..." />}>{children}</Suspense>
);

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/login"
          element={
            <SuspenseWrapper>
              <LoginForm />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/signup"
          element={
            <SuspenseWrapper>
              <SignUpForm />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/admin-login"
          element={
            <SuspenseWrapper>
              <AdminLoginForm />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner-login"
          element={
            <SuspenseWrapper>
              <PartnerLoginForm />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <SuspenseWrapper>
                <Dashboard />
              </SuspenseWrapper>
            </PrivateRoute>
          }
        />
        <Route
          path="/success"
          element={
            <SuspenseWrapper>
              <Success />
            </SuspenseWrapper>
          }
        />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <Navigate to="/admin/dashboard" />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/dashboard"
          element={
            <SuspenseWrapper>
              <AdminDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/admin/reports"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Reports</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Partner Management</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/commissions"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Commission Settings</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/settings"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Settings</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/emails"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Email Management</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/onboarding"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Onboarding</div>
            </PrivateRoute>
          }
        />
        <Route
          path="/admin/leads"
          element={
            <PrivateRoute requiredRole="admin">
              <div>Leads Management</div>
            </PrivateRoute>
          }
        />

        {/* Partner routes */}
        <Route
          path="/partner"
          element={
            <PrivateRoute requiredRole="partner">
              <Navigate to="/partner/dashboard" />
            </PrivateRoute>
          }
        />
        <Route
          path="/partner/dashboard"
          element={
            <SuspenseWrapper>
              <PartnerDashboard />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner/shops"
          element={
            <SuspenseWrapper>
              <PartnerShops />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner/shop/:shopId"
          element={
            <SuspenseWrapper>
              <ShopProfile />
            </SuspenseWrapper>
          }
        />
        <Route path="/partner/success" element={<div>Track Success</div>} />
        <Route
          path="/partner/upload"
          element={
            <SuspenseWrapper>
              <PartnerUpload />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner/tracking"
          element={
            <SuspenseWrapper>
              <LeadTracking />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner/commissions"
          element={
            <SuspenseWrapper>
              <PartnerCommissions />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner/profile"
          element={
            <SuspenseWrapper>
              <PartnerProfile />
            </SuspenseWrapper>
          }
        />
        <Route
          path="/partner/settings"
          element={
            <SuspenseWrapper>
              <PartnerSettings />
            </SuspenseWrapper>
          }
        />
      </Routes>
      {/* Add tempo routes */}
      {useRoutes(routes)}
    </>
  );
}

function App() {
  return (
    <AuthProvider>
      <Suspense fallback={<LoadingScreen text="Loading application..." />}>
        <AppRoutes />
      </Suspense>
      <Toaster />
    </AuthProvider>
  );
}

export default App;
