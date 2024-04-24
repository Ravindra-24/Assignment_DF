import { Route, Routes, useLocation } from "react-router";
import React, { useEffect, useState } from "react";
import { Toaster } from "react-hot-toast";

import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer";
import LoadingBar from "react-top-loading-bar";
import Login from "./layout/auth/login/Login";
import Signup from "./layout/auth/Signup";
import Home from "./layout/Home";
import { useSelector } from "react-redux";
import SpinningBubble from "./components/Loader/SpinningBubble";
import Category from "./layout/Category/Category";
import Product from "./layout/Product/Product";
import Sidebar from "./components/Sidebar/Sidebar";
import LogoutWarningModal from "./components/Modal/LogoutWarningModal";
import AddCategory from "./layout/Category/AddCategory";
import AddProduct from "./layout/Product/AddProduct";
import ForgotPasswordModal from "./layout/auth/ForgotPassword";

const AllRoutes = () => {
  const location = useLocation();
  const [progress, setProgress] = useState(0);
  const auth = useSelector((state) => state.authReducer);
  useEffect(() => {
    setProgress(40);
    const timeout = setTimeout(() => {
      setProgress(100);
    });
    return () => clearTimeout(timeout);
  }, [location.pathname]);
  return (
    <div>
      <Toaster />
      <LoadingBar
        color="#F4F4F4"
        height={4}
        shadow={true}
        progress={progress}
        loaderSpeed={500}
        containerStyle={{ zIndex: 1000 }}
        transitionTime={500}
        waitingTime={1000}
        onLoaderFinished={() => setProgress(0)}
      />
      <ForgotPasswordModal />
      {auth.loaded ? (
        <>
        {
          auth.token && (
        <>
          <Navbar setProgress={setProgress} />
          <Sidebar />
        </>
        )}
          <LogoutWarningModal />
          <Routes>
            <Route path="/" element={<Home setProgress={setProgress} />} />
            <Route path="/category" element={<Category setProgress={setProgress} />} />
            <Route path="/product" element={<Product setProgress={setProgress} />} />
            <Route path="/add-category" element={<AddCategory setProgress={setProgress} />} />
            <Route path="/add-product" element={<AddProduct setProgress={setProgress} />} />
            <Route
              path="/login"
              element={<Login setProgress={setProgress} />}
            />
            <Route
              path="/signup"
              element={<Signup setProgress={setProgress} />}
            />
          </Routes>
          {/* <Footer /> */}
        </>
      ):(
        <SpinningBubble size={50}/>
      )}
    </div>
  );
};

export default AllRoutes;
