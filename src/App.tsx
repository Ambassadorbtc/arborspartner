import { Suspense } from "react";
import { Navigate, Route, Routes, useRoutes } from "react-router-dom";
import routes from "tempo-routes";
import LoginForm from "./components/auth/LoginForm";
import SignUpForm from "./components/auth/SignUpForm";
import AdminLoginForm from "./components/auth/AdminLoginForm";
import PartnerLoginForm from "./components/auth/PartnerLoginForm";
import AdminDashboard from "./components/admin/AdminDashboard";
import PartnerDashboard from "./components/partner/PartnerDashboard";
import PartnerProfile from "./components/partner/PartnerProfile";
import PartnerSettings from "./components/partner/PartnerSettings";
import PartnerShops from "./components/partner/PartnerShops";
import ShopProfile from "./components/partner/ShopProfile";
import PartnerUpload from "./components/partner/PartnerUpload";
import PartnerCommissions from "./components/partner/PartnerCommissions";
import LeadTracking from "./components/partner/LeadTracking";
import Dashboard from "./components/pages/dashboard";
import Success from "./components/pages/success";
import Home from "./components/pages/home";
import { AuthProvider, useAuth } from "../supabase/auth";
import { Toaster } from "./components/ui/toaster";
import { LoadingScreen, LoadingSpinner } from "./components/ui/loading-spinner";

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

function AppRoutes() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignUpForm />} />
        <Route path="/admin-login" element={<AdminLoginForm />} />
        <Route path="/partner-login" element={<PartnerLoginForm />} />
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="/success" element={<Success />} />

        {/* Admin routes */}
        <Route
          path="/admin"
          element={
            <PrivateRoute requiredRole="admin">
              <Navigate to="/admin/dashboard" />
            </PrivateRoute>
          }
        />
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
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
        <Route path="/partner/dashboard" element={<PartnerDashboard />} />
        <Route path="/partner/shops" element={<PartnerShops />} />
        <Route path="/partner/shop/:shopId" element={<ShopProfile />} />
        <Route path="/partner/success" element={<div>Track Success</div>} />
        <Route path="/partner/upload" element={<PartnerUpload />} />
        <Route path="/partner/tracking" element={<LeadTracking />} />
        <Route path="/partner/commissions" element={<PartnerCommissions />} />
        <Route path="/partner/profile" element={<PartnerProfile />} />
        <Route path="/partner/settings" element={<PartnerSettings />} />
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
