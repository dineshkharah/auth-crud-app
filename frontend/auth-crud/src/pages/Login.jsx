import { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        form,
      );

      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <form
        onSubmit={handleSubmit}
        className="bg-slate-800 p-6 rounded-lg w-80 space-y-4"
      >
        <h2 className="text-xl text-blue-500">Login</h2>

        <input
          type="email"
          name="email"
          placeholder="Email"
          className="w-full p-2 bg-slate-700 rounded"
          onChange={handleChange}
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          className="w-full p-2 bg-slate-700 rounded"
          onChange={handleChange}
        />

        <button className="w-full bg-blue-600 p-2 rounded">Login</button>

        <p className="text-sm">
          No account?{" "}
          <Link to="/register" className="text-blue-400">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
