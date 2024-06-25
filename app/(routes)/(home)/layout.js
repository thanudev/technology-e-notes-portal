"use client";
import React, { useState } from "react";
import Header from "./_components/Header";
import Navbar from "./_components/Navbar";

function Layout({ children }) {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="bg-bg">
      <div className="w-full  bg-bg">
        <Header toggle={toggle} setToggle={setToggle} />
      </div>

      {toggle && (
        <div className="h-screen  md:hidden w-60 bg-bg absolute top-0 left-0 ">
          <Navbar className="" closeNav={() => setToggle(false)} />
        </div>
      )}

      {children}
    </div>
  );
}

export default Layout;
