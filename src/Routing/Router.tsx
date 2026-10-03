import { Navigate, Outlet, Route, Routes } from "react-router";
import { observer } from "mobx-react-lite";
import { AuthPage } from "../pages/AuthPage";
import { ChatsPage } from "../pages/ChatsPage";
import { ProfilePage } from "../pages/ProfilePage";
import { authStore } from "@/store/authStore/auth";

const ProtectedRoute = observer(() => {
  if (!authStore.isAuthorized) {
    return <Navigate to="/auth" replace />;
  }
  return <Outlet />;
});

const PublicOnlyRoute = observer(() => {
  if (authStore.isAuthorized) {
    return <Navigate to="/" replace />;
  }
  return <Outlet />;
});

export const AppRouter = () => {
  return (
    <Routes>
      <Route element={<PublicOnlyRoute />}>
        <Route path="/auth" element={<AuthPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route path="/" element={<ChatsPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
};
