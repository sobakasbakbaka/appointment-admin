import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { LoginPage } from "../pages/LoginPage.tsx";
import { ProtectedRoute } from "./ProtectedRoute.tsx";
import { HomePage } from "../pages/HomePage.tsx";
import { CreatePage } from "../pages/CreatePage.tsx";
import { MastersPage } from "../pages/MastersPage.tsx";
import { MasterPage } from "../pages/MasterPage.tsx";
import { Header } from "../components/Header.tsx";

export const AppRouter = () => {
  const shouldShowHeader = location.pathname !== "/login";

  return (
    <Router>
      {shouldShowHeader && <Header />}
      <Routes>
        <Route path={"/login"} element={<LoginPage />} />
        <Route path={"/"} element={<ProtectedRoute element={<HomePage />} />} />
        <Route
          path={"/create"}
          element={<ProtectedRoute element={<CreatePage />} />}
        />
        <Route path={"/masters"} element={<MastersPage />} />
        <Route path={"/master/:id"} element={<MasterPage />} />
      </Routes>
    </Router>
  );
};
