import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Footer from "./components/Footer";

function App() {
  const token = localStorage.getItem("token");

  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Main content */}
        <div className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={<Navigate to={token ? "/dashboard" : "/login"} />}
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/dashboard"
              element={token ? <Dashboard /> : <Navigate to="/login" />}
            />
          </Routes>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
}

export default App;
