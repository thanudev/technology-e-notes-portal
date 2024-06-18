"use client";
import {
  AlignJustify,
  Book,
  BookOpenCheck,
  PlayCircleIcon,
  Search,
  Users,
} from "lucide-react";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import useAuth from "@/app/_hooks/useAuth";

function Header({ toggle, setToggle }) {
  const { userInfo, logout } = useAuth();

  const menu = [
    {
      id: 0,
      name: "Browse",
      icon: Book,
      path: "/browse",
    },
    {
      id: 2,
      name: "Pastpaper",
      icon: BookOpenCheck,
      path: "/pastpaper",
    },
    {
      id: 3,
      name: "Play Ground",
      icon: PlayCircleIcon,
      path: "/play",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const router = useRouter();

  return (
    <div className="py-3 flex items-center justify-between px-3">
      {/* Menu icon */}
      <div className="md:hidden cursor-pointer" onClick={() => setToggle(true)}>
        <AlignJustify />
      </div>

      {/* Slogan */}
      <div className="flex items-center gap-1">
        <img src="/logo.png" className="h-12 w-12 rounded-full" />
        <h2
          className={`text-primary font-semibold cursor-pointer ${
            toggle && "hidden"
          }`}
        >
          Technology E-Learn-Portal{" "}
        </h2>
      </div>

      {/* Search Box */}
      {/* <div className="bg-white p-3 hidden md:flex rounded-full gap-1 ">
        <Search className="cursor-pointer" />
        <input
          className="text-gray-700 border-none outline-none "
          placeholder="Search"
        />
      </div> */}

      {/* Menu Items */}
      <div className="hidden md:flex items-center gap-3">
        {menu?.map((item, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer"
              onClick={() => {
                setActiveIndex(index);
                router.push(item.path);
              }}
            >
              <h2
                className={`font-medium hover:text-primary text-black ${
                  activeIndex === index && "text-primary"
                }`}
              >
                {item?.name}
              </h2>
            </div>
          );
        })}
      </div>

      {/* Get Started Button */}
      <div>
        {userInfo ? (
          <img
            onClick={logout}
            src={userInfo?.photoURL}
            className=" rounded-full h-[40px] w-[40px] cursor-pointer  hover:shadow-md"
          />
        ) : (
          <div
            onClick={() => router.push("/sign-in-google")}
            className="bg-primary py-3 px-2 rounded-md text-white cursor-pointer hover:bg-primary_dark hover:shadow-md"
          >
            <h2>Get Started</h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
