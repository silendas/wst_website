import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { register as registerApi } from "../../api/authApi";
import useApi from "../../hooks/useApi";
import { CustomToast, notifyError } from "../../components/notifications/CustomToast";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { callApi, loading } = useApi(registerApi);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !email || !password) {
      notifyError("Name, Email, and Password cannot be empty");
      return;
    }
    if (password !== confirmPassword) {
      notifyError("Passwords do not match");
      return;
    }
    const response = await callApi({ name, email, password });
    if (response.success) {
      setTimeout(() => {
        navigate("/login");
      }, 2000);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRlY2hub2xvZ3l8ZW58MHx8fHwxNjMyNjQ3NjQ1&ixlib=rb-1.2.1&q=80&w=1080)' }}>
      <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        <div className="hidden lg:block lg:w-1/2">
          <img src="https://img.freepik.com/free-vector/login-concept-illustration_114360-739.jpg?t=st=1727705836~exp=1727709436~hmac=afd8be8232da4d102b5360ca487f6c853944a624ac1098f561736ad227d5278c&amp;w=740" alt="Register Image" className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Name"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Confirm Password"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
            >
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
          <div className="mt-4 text-center">
            Sudah punya akun?
            <Link to="/login" className="text-blue-600 ml-1 hover:underline">
              Login
            </Link>
          </div>
        </div>
      </div>
      <CustomToast />
    </div>
  );
};

export default Register;