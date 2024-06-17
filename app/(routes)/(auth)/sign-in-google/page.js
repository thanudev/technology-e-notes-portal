"use client";
import useAuth from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { BsGoogle } from "react-icons/bs";

function page() {
  const { loading, signInWithGoogle, userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (userInfo) {
      router.push("/.");
    }
  }, []);

  return (
    <div className="mx-auto max-w-screen-xl px-4 py-16 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-lg rounded-md border p-5">
        <h1 className="text-center text-2xl font-bold text-primary sm:text-3xl">
          Get Started With Learn Technology Portal
        </h1>

        <p className="mx-auto mt-4 max-w-md text-center text-gray-500">
          create an account to access to the notes for free. and you can
          download all subject a/l pastpapers as well.
        </p>

        <p className="text-center text-lg font-medium">
          Sign in to your account
        </p>

        <button
          disabled={loading}
          onClick={signInWithGoogle}
          className={`w-full rounded-lg my-8 bg-primary px-5 py-3 text-md font-medium text-white flex items-center justify-center gap-5 cursor-pointer
            hover:bg-primary_dark
            ${
              loading && "bg-gray-300 hover:cursor-progress hover:bg-gray-300"
            } `}
        >
          <BsGoogle className="rounded-full h-[30px] w-[30px]" />
          <h2>Sign in with google</h2>
        </button>
      </div>
    </div>
  );
}

export default page;
