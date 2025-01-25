import { Navigate } from "react-router";
import { getCookie } from "typescript-cookie";

interface ProtectRouteProps {
  children: React.ReactNode
};

function ProtectRoute ({children}: ProtectRouteProps) {
  const userToken = getCookie('token');

  if (!userToken) {
    return <Navigate to={"/login"} replace />;
  }
  return children;
}

export default ProtectRoute;