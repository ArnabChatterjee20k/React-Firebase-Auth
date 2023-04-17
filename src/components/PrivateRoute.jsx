import { Route, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

// The {component: Component} syntax destructures the component property from the input object and assigns it to a new variable called Component.
export default function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();
  if (currentUser) return Component;
  return <Navigate to="/login" replace />;
}

// if wanted to return <Component {...rest} /> then in the Route component do this 
// element={<PrivateRoute component={Dashboard} props/>}