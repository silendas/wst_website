import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Home from "./components/pages/Home";
import Login from "./components/pages/Login";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { CustomToast } from "./components/notifications/CustomToast";

// Komponen utama aplikasi
function App() {
  return (
    // Menyediakan konteks autentikasi untuk seluruh aplikasi
    <AuthProvider>
      <CustomToast />
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<PrivateRoute component={HomeLayout} />} />
          <Route path="/" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Layout untuk halaman yang memiliki header dan footer
const HomeLayout = () => (
  <>
    <Header />
    <main className="flex-grow">
      <Home />
    </main>
    <Footer />
  </>
);

// Komponen untuk melindungi rute yang memerlukan autentikasi
const PrivateRoute = ({ component: Component, ...rest }) => {
  const { token } = React.useContext(AuthContext);
  return token ? <Component {...rest} /> : <Navigate to="/login" />;
};

export default App;