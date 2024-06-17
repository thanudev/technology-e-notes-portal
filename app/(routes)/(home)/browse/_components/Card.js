"use client";
import useAuth from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";
import { BsFilePdf } from "react-icons/bs";

function Card({ note }) {
  const router = useRouter();
  const { userInfo } = useAuth();
  return (
    <div className="p-2 border mx-2 my-3 rounded-md flex flex-col gap-2 border-gray-300 ">
      <h2 className="cursor-pointer font-bold text-[18px]">
        {note?.title}({note?.type})-Unit({note?.unitNo})
      </h2>

      <div
        onClick={
          userInfo
            ? () => router.push("/notes-details/" + note?.id)
            : () => router.push("/sign-in-google")
        }
        className="bg-primary rounded-full text-white p-2 flex flex-row items-center justify-center cursor-pointer hover:bg-primary_dark"
      >
        <h2 className="text-center">
          {note?.subjectCategory} (தமிழ்) Available
        </h2>
        <BsFilePdf color="#fff" size={30} />
      </div>
    </div>
  );
}

export default Card;
