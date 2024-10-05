import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { AuthProvider, AuthContext } from "./context/AuthContext";
import Login from "./components/pages/Login";
import Register from './components/pages/Register';
import Courses from './components/pages/Courses';
import Lecturer from './components/pages/Lecturer';
import Students from './components/pages/Students';
import Room from './components/pages/Room';
import MainLayout from "./components/layout/MainLayout";
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
          <Route path="/register" element={<Register />} />
          <Route path="/courses" element={<PrivateRoute component={Courses} layout={MainLayout} />} />
          <Route path="/lecturer" element={<PrivateRoute component={Lecturer} layout={MainLayout} />} />
          <Route path="/students" element={<PrivateRoute component={Students} layout={MainLayout} />} />
          <Route path="/rooms" element={<PrivateRoute component={Room} layout={MainLayout} />} />
          <Route path="/" element={<Navigate to="/courses" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

// Komponen untuk melindungi rute yang memerlukan autentikasi
const PrivateRoute = ({ component: Component, layout: Layout, ...rest }) => {
  const { token } = React.useContext(AuthContext);
  return token ? (
    <Layout>
      <Component {...rest} />
    </Layout>
  ) : (
    <Navigate to="/login" />
  );
};

export default App;