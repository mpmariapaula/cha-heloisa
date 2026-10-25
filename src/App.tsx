import PublicSite from "./PublicSite";
import AdminApp from "./AdminApp";

export default function App() {
  const isAdmin = window.location.pathname.startsWith("/admin");
  return isAdmin ? <AdminApp /> : <PublicSite />;
}
