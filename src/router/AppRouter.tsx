import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import { CreatePage } from "../pages/CreatePage.tsx";

export const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/"} element={<ProtectedRoute element={<HomePage />} />} />
        <Route
          path={"/create"}
          element={<ProtectedRoute element={<CreatePage />} />}
        />
      </Routes>
    </Router>
  );
};
