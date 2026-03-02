import { Navigate } from 'react-router';

function ProtectedRoute(props) {
  const isAuthenticated = false;
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
}
export default ProtectedRoute;
