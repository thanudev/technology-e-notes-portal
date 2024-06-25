"use client";

import { useRouter } from "next/navigation";
import { useLayoutEffect } from "react";
import Loading from "./../public/_lottie/loading.json";
import Lottie from "lottie-react";

export default function Home() {
  const router = useRouter();

  useLayoutEffect(() => {
    router.push("/browse");
  }, []);

  return (
    <div className="flex flex-col justify-center items-center">
      <Lottie
        animationData={Loading}
        loop={true}
        height={300}
        width={300}
        autoPlay={true}
      />
    </div>
  );
}
