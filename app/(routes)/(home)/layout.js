"use client";
import React, { useState } from "react";
import Header from "./components/Header";
import Navbar from "./components/Navbar";
import BannerSection from "./components/BannerSection";
import Footer from "./components/Footer";

function Layout({ children }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div>
      <div className="w-full  bg-bg">
        <Header toggle={toggle} setToggle={setToggle} />
      </div>

      {toggle && (
        <div className="h-screen  md:hidden w-60 bg-bg absolute top-0 left-0 ">
          <Navbar className="" closeNav={() => setToggle(false)} />
        </div>
      )}

      {children}

      <div className="bg-primary mt-10 w-full ">
        <Footer />
      </div>
    </div>
  );
}

export default Layout;
