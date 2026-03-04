import { Navigate } from 'react-router';

function ProtectedRoute(props) {
  const isAuthenticated = true; //aqui deberas implementar tu logica de autenticacion

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return props.children;
}
export default ProtectedRoute;
