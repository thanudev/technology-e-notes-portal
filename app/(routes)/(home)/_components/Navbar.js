"use client";
import { Book, BookOpenCheck, PlayCircleIcon, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

function Navbar({ closeNav }) {
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
    <div className="p-2">
      {/* Logo */}
      <div className=" p-2 flex items-center justify-center border-b  ">
        <img src="/logo.png" className="h-16 w-16 rounded-full" />
      </div>

      <h2
        className={`text-primary font-semibold cursor-pointer text-center my-5 text-[18px] `}
      >
        Technology E-Learn-Portal{" "}
      </h2>

      {/* Menu */}
      <div className="flex-col space-y-3">
        {menu?.map((item, index) => (
          <div
            onClick={() => {
              setActiveIndex(index);
              router.push(item.path);

              closeNav();
            }}
            key={index}
            className={`group flex items-center  gap-2 text-[18px] font-medium my-1 cursor-pointer py-2 px-1 rounded-md hover:bg-primary hover:text-white scroll-smooth transition-all duration-200`}
          >
            <item.icon className="group hover:ease-in-out duration-200" />
            <h2>{item?.name}</h2>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Navbar;
