"use client";
import useAuth from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

function BannerSection() {
  const router = useRouter();
  const { userInfo } = useAuth();

  return (
    <div className="flex items-center justify-center pb-5 pt-2 bg-bg ">
      <div className="flex flex-col justify-evenly items-center pb-6 gap-5 py-2 bg-primary rounded-[20px] w-[95%]  ">
        <h2 className="text-[25px] cursor-pointer text-white my-3 font-bold">
          Technology E Learn Portal
        </h2>
        <p className="text-center p-2 cursor-pointer text-white text-[16px] font-medium leading-10 text-wrap ">
          கா/பொ/த உயர்தர தொழில்நுட்ப பிரிவு மாணவர்களுக்காக, அவர்களின்
          பாடங்களுக்கான Notes,Short Notes, Pastpapers,Schemes மற்றும் பல
          பயனுறுதி மிக்க Materials ஐ இங்கே தமிழ் மொழியில் இலவசமாக
          பெற்றுக்கொள்ளலாம். உங்களுக்கான Account ஒன்றினை உருவாக்குவதன் மூலம்
          இவற்றை இலவசமாக பதிவிறக்கம் செய்ய முடியும். உங்கள் நண்பர்களும் பயன் பெற
          பகிருங்கள்.
        </p>

        {!userInfo ? (
          <div
            onClick={() => router.push("/sign-in-google")}
            className="bg-white px-6 py-3 text-center  rounded-md text-primary cursor-pointer hover:bg-slate-300 hover:shadow-md"
          >
            <h2>Get Started</h2>
          </div>
        ) : (
          <div>
            <h2 className="text-[17px] font-medium text-white">
              Explore What You Needed....
            </h2>
          </div>
        )}
      </div>
    </div>
  );
}

export default BannerSection;
