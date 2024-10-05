import React, { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { login as loginApi } from "../../api/authApi";
import useApi from "../../hooks/useApi";
import { useNavigate, Link } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { CustomToast, notifySuccess, notifyError } from "../../components/notifications/CustomToast";

const Login = () => {
  const { login: setAuthToken } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { callApi, loading } = useApi(loginApi);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await callApi(email, password);
    if (response.success) {
      setAuthToken(response.data.token);
      notifySuccess("Login berhasil!");
      navigate("/courses");
    } else {
      //notifyError(response.message);
    }
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-cover bg-center" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1518770660439-4636190af475?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDJ8fHRlY2hub2xvZ3l8ZW58MHx8fHwxNjMyNjQ3NjQ1&ixlib=rb-1.2.1&q=80&w=1080)' }}>
      <div className="flex flex-col lg:flex-row items-center w-full max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-lg p-8">
        <div className="hidden lg:block lg:w-1/2">
          <img src="https://emcartago.com/wp-content/uploads/2023/05/5124556.jpg" alt="CMS Logo" className="w-full h-full object-cover" />
        </div>
        <div className="w-full lg:w-1/2 flex flex-col items-center">
          <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Selamat Datang Di Unbin!</h2>
          <form onSubmit={handleSubmit} className="w-full">
            <div className="mb-4">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Input Email"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
            </div>
            <div className="mb-4 relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Input Password"
                disabled={loading}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-lg"
              />
              <button
                type="button"
                onClick={toggleShowPassword}
                className="absolute inset-y-0 right-0 px-3 flex items-center text-gray-600"
              >
                {showPassword ? (
                  <AiOutlineEyeInvisible className="h-6 w-6" />
                ) : (
                  <AiOutlineEye className="h-6 w-6" />
                )}
              </button>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition duration-300 text-lg"
            >
              {loading ? "Logging in..." : "Masuk"}
            </button>
          </form>
          <div className="mt-4 text-center">
            belum punya akun?
            <Link to="/register" className="text-blue-600 ml-1 hover:underline">
             Register
            </Link>
          </div>
        </div>
      </div>
      <CustomToast />
    </div>
  );
};

export default Login;