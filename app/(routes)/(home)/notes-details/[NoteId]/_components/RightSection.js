import useAuth from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import React from "react";

function RightSection({ note }) {
  const { userInfo } = useAuth();
  const router = useRouter();

  const downloadPdf = () => {
    const url = note?.pdf;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${note?.title}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.remove(link);
  };

  const user = true;
  return (
    <div
      className="border  border-gray-300 rounded-md mt-2 md:mt-0 md:ml-2 p-2 flex gap-4 flex-col justify-center items-center
  "
    >
      {!userInfo ? (
        <h2 className="text-gray-900 font-medium ">
          இந்த நோட் இனை பதிவிறக்கம் செய்வதற்கு தயவு செய்து Login செய்யுங்கள்
          அல்லது உங்களிடம் account இல்லை எனின் புதிதாக account ஒன்றினை
          உருவாக்குங்கள். இதன் மூலம் உங்களால் Download Option இனை செயட்படுத்த
          முடியும்.
        </h2>
      ) : (
        <h2 className="text-gray-900 font-medium ">
          இந்த நோட் இனை பதிவிறக்கம் செய்வதற்கு Download பட்டனை அழுத்தவும்.
        </h2>
      )}
      {!userInfo ? (
        <button
          onClick={() => router.push("/sign-in-google")}
          className="bg-primary px-4 py-2 rounded-md text-white cursor-pointer hover:bg-primary_dark"
        >
          Get Started
        </button>
      ) : (
        <button
          onClick={() => downloadPdf()}
          className="bg-primary px-4 py-2 rounded-md text-white cursor-pointer hover:bg-primary_dark"
        >
          Download Now
        </button>
      )}
    </div>
  );
}

export default RightSection;
