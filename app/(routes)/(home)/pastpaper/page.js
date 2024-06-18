"use client";
import React, { useEffect, useState } from "react";
import Top from "./_components/Top";
import useAuth from "@/app/_hooks/useAuth";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase-config";
import { BsFilePdf } from "react-icons/bs";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

function page() {
  const { userInfo } = useAuth();
  const [userSelectedYear, setUserSelectedYear] = useState("");
  const [userSelectedSubject, setUserSelectedSubject] = useState("");

  const [pastpaper, setPastpaper] = useState(null);

  const [buttonOff, setButtonOff] = useState(true);

  const [years, setYears] = useState();
  const [subjects, setSubjects] = useState();

  const router = useRouter();

  useEffect(() => {
    if (userSelectedYear === "" || userSelectedSubject === "") {
      setButtonOff(true);
    } else {
      setButtonOff(false);
    }
  }, [userSelectedSubject, userSelectedYear, userInfo]);

  useEffect(() => {
    getYears();
    getSubjects();
  }, []);

  const getYears = async () => {
    const unsub = onSnapshot(collection(db, "Years"), (snapshot) => {
      let y = [];
      snapshot?.docs?.forEach((doc) => {
        y.push({ id: doc.id, ...doc.data() });
        setYears(y);
      });
    });
    return unsub;
  };

  const getSubjects = async () => {
    const unsub = onSnapshot(collection(db, "Subjects"), (snapshot) => {
      let s = [];
      snapshot?.docs?.forEach((doc) => {
        s.push({ id: doc.id, ...doc.data() });
        setSubjects(s);
      });
    });
    return unsub;
  };

  const getPastpaper = async () => {
    const qry = query(
      collection(db, "Pastpapers"),
      where("year", "==", userSelectedYear),
      where("subject", "==", userSelectedSubject)
    );

    const querySnapshot = await getDocs(qry);
    if (querySnapshot.docs[0]) {
      let pp = [];
      querySnapshot?.docs?.forEach((doc) => {
        pp.push({ id: doc?.id, ...doc.data() });
        setPastpaper(pp);
        toast.success("Pastpaper Found. You Can Download it");
      });
    } else {
      setPastpaper([]);
      toast.error("Pastpaper Not Found. Try Another One..");
    }
  };

  const downloadFile = async (pdffile) => {
    const url = pdffile;
    const link = document.createElement("a");
    link.href = url;
    link.download = `${pastpaper[0]?.subject}(${pastpaper[0]?.year})தமிழ்.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.remove(link);
  };

  return years && subjects ? (
    <div className=" p-3 grid grid-cols-1 ">
      <div className="col-span-1 p-1">
        <Top />

        {/* Select Section */}
        <div className="">
          {/* Select Year */}
          <div className="flex flex-row items-center gap-2 mt-5">
            <h2 className="text-black font-medium ">Select</h2>
            <select
              className="bg-white p-2 rounded-md outline-none text-primary"
              value={userSelectedYear}
              onChange={(event) => setUserSelectedYear(event.target.value)}
            >
              <option value={null}>Year</option>
              {years?.map((year, index) => (
                <option key={index} value={year?.year}>
                  {year?.year}
                </option>
              ))}
            </select>
          </div>

          {/* Select Subject */}
          <div className="flex flex-row items-center gap-2 mt-5">
            <h2 className="text-black font-medium ">Select</h2>
            <select
              className="bg-white p-2 rounded-md outline-none text-primary"
              value={userSelectedSubject}
              onChange={(event) => setUserSelectedSubject(event.target.value)}
            >
              <option>Subject</option>
              {subjects?.map((subject, index) => (
                <option key={index} value={subject?.name}>
                  {subject?.name}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Get Pastpaper Button */}
        <button
          disabled={buttonOff}
          onClick={
            userInfo
              ? () => getPastpaper()
              : () => {
                  toast.error("Sign In Required To Proceed");
                  router.push("/sign-in-google");
                }
          }
          className={`mt-10 bg-primary  text-white px-3 py-2 rounded-md ${
            buttonOff ? "bg-gray-400 cursor-not-allowed text-black" : null
          }`}
        >
          Get Pastpaper
        </button>

        {/* Pastpaper */}
        {!pastpaper?.length ? null : (
          <div className="mt-3 border border-gray-300 p-3 rounded-md flex flex-row items-center justify-between">
            <h2>
              {pastpaper[0]?.year},{pastpaper[0]?.subject} தமிழ்{" "}
            </h2>
            <BsFilePdf className="text-green-600" size={35} />
            <Download
              className="text-green-600 cursor-pointer"
              size={35}
              onClick={
                userInfo
                  ? () => downloadFile(pastpaper[0]?.pdf)
                  : router.push("/sign-in-google")
              }
            />
          </div>
        )}
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h2>Loading</h2>
    </div>
  );
}

export default page;
