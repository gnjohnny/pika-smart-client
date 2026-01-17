import { Route, Routes } from "react-router";
import NavbarLayout from "./components/NavbarLayout";
import AuthHomepage from "./pages/AuthHomepage";

const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <NavbarLayout>
            <AuthHomepage />
          </NavbarLayout>
        }
      />
    </Routes>
  );
};

export default App;
