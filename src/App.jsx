import SignUp from "./components/SignUp";
import Dashboard from "./components/Dashboard";
import Login from "./components/Login";

import { Container } from "react-bootstrap";
import AuthContextProvider from "./context/AuthContext";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from "./components/PrivateRoute";
import ForgotPassword from "./components/ForgotPassword";
import UpdateProfile from "./components/UpdateProfile";

function App() {
  return (
    <Container
      className="d-flex align-items-center justify-content-center"
      style={{ minHeight: "100vh" }}
    >
      <div className="w-100" style={{ maxWidth: "480px" }}>
        <Router>
          <AuthContextProvider>
            <Routes>
              <Route path="/signup" element={<SignUp />} />
              <Route
                path="/"
                element={<PrivateRoute component={<Dashboard />} />}
              />
              <Route path="/login" element={<Login />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/update-profile" element={<UpdateProfile />} />
              <Route path="*" element={<h1>Not Found</h1>} />
            </Routes>
          </AuthContextProvider>
        </Router>
      </div>
    </Container>
  );
}

export default App;
