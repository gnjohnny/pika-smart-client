import { Navigate, Route, Routes } from "react-router";
import NavbarLayout from "./components/NavbarLayout";
import AuthHomepage from "./pages/AuthHomepage";
import ProtectRoutes from "./components/route-protector";
import Dashboardpage from "./pages/Dashboardpage";
import SignInPage from "./pages/SignInPage";
import { useAuth } from "./hooks/auth.hooks";
import CustomLoader from "./components/loaders/main-loader";
import SignUpPage from "./pages/SignUpPage";
import GeneratePassResetLinkPage from "./pages/GeneratePassResetLinkPage";

const App = () => {
  const { authUser, isPending } = useAuth();

  if (isPending) {
    return (
      <div className="w-full h-screen flex justify-center items-center">
        <CustomLoader color="oklch(70.5% 0.213 47.604)" />
      </div>
    );
  }
  return (
    <Routes>
      <Route
        path="/"
        element={
          !authUser ? (
            <NavbarLayout>
              <AuthHomepage />
            </NavbarLayout>
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route
        path="/sign-in"
        element={
          !authUser ? <SignInPage /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route
        path="/sign-up"
        element={
          !authUser ? <SignUpPage /> : <Navigate to="/dashboard" replace />
        }
      />
      <Route
        path="/generate-password-reset-link"
        element={
          !authUser ? (
            <GeneratePassResetLinkPage />
          ) : (
            <Navigate to="/dashboard" replace />
          )
        }
      />
      <Route element={<ProtectRoutes isAllowed={!!authUser} />}>
        <Route path="/dashboard" element={<Dashboardpage />} />
      </Route>
    </Routes>
  );
};

export default App;
