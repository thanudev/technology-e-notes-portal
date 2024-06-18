"use client";
import React, { useEffect, useState } from "react";
import TopSec from "./_components/TopSec";
import {
  collection,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "@/firebase-config";
import useAuth from "@/app/_hooks/useAuth";
import { useRouter } from "next/navigation";
import Card from "../browse/_components/Card";
import toast from "react-hot-toast";

function page() {
  const [subjects, setSubjects] = useState();
  const [types, setTypes] = useState();
  const [unitNums, setUnitNums] = useState();
  const [notes, setNotes] = useState();
  const [btnOff, setBtnOff] = useState(true);

  const [userSelectedSubject, setUserSelectedSubject] = useState("");
  const [userSelectedType, setUserSelectedType] = useState("");
  const [userSelectedUnitNo, setUserSelectedUnitNo] = useState("");

  const { userInfo } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (
      (userSelectedSubject === "" || userSelectedType === "",
      userSelectedUnitNo === "")
    ) {
      setBtnOff(true);
    } else {
      setBtnOff(false);
    }
  }, [userSelectedSubject, userSelectedType, userSelectedUnitNo]);

  useEffect(() => {
    getSubjects();
    getNotesTypes();
    getUnitNums();
  }, []);

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

  const getNotesTypes = async () => {
    const unsub = onSnapshot(collection(db, "Types"), (snapshot) => {
      let t = [];
      snapshot?.docs?.forEach((doc) => {
        t.push({ id: doc.id, ...doc.data() });
        setTypes(t);
      });
    });
    return unsub;
  };

  const getUnitNums = async () => {
    const unsub = onSnapshot(collection(db, "UnitNums"), (snapshot) => {
      let un = [];
      snapshot?.docs?.forEach((doc) => {
        un.push({ id: doc.id, ...doc.data() });
        setUnitNums(un);
      });
    });
    return unsub;
  };

  const getNotes = async (subjectCategory, type, unitNo) => {
    const qry = query(
      collection(db, "Notes"),
      where("subjectCategory", "==", subjectCategory),
      where("type", "==", type),
      where("unitNo", "==", unitNo)
    );

    const querySnapshot = await getDocs(qry);
    if (querySnapshot.docs[0]) {
      let no = [];
      querySnapshot?.docs?.forEach((doc) => {
        no.push({ id: doc?.id, ...doc.data() });
        setNotes(no);
        toast.success(type + " Found. You Can Download it");
      });
    } else {
      setNotes([]);
      toast.error(type + " Not Found.  Try Another One..");
    }
  };

  return subjects && types && unitNums ? (
    <div className="grid grid-cols-1 p-3">
      <TopSec />

      {/* Filter section */}
      <div className="flex flex-col items-center ">
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

        {/* Select Type */}
        <div className="flex flex-row items-center gap-2 mt-5">
          <h2 className="text-black font-medium ">Select</h2>
          <select
            className="bg-white p-2 rounded-md outline-none text-primary"
            value={userSelectedType}
            onChange={(event) => setUserSelectedType(event.target.value)}
          >
            <option>Type</option>
            {types?.map((type, index) => (
              <option key={index} value={type?.name}>
                {type?.name}
              </option>
            ))}
          </select>
        </div>

        {/* Select Unit Nums */}
        <div className="flex flex-row items-center gap-2 mt-5">
          <h2 className="text-black font-medium ">Select</h2>
          <select
            className="bg-white p-2 rounded-md outline-none text-primary"
            value={userSelectedUnitNo}
            onChange={(event) => setUserSelectedUnitNo(event.target.value)}
          >
            <option>Unit No</option>
            {unitNums?.map((unitNo, index) => (
              <option key={index} value={unitNo?.unum}>
                {unitNo?.unum}
              </option>
            ))}
          </select>
        </div>

        {/* Button */}
        <div>
          <button
            disabled={btnOff}
            onClick={
              userInfo
                ? () =>
                    getNotes(
                      userSelectedSubject,
                      userSelectedType,
                      userSelectedUnitNo
                    )
                : () => {
                    toast.error("Sign In Required To Proceed");
                    router.push("/sign-in-google");
                  }
            }
            className={`px-5 py-2 bg-primary text-white rounded-md mt-10 ${
              btnOff ? "bg-gray-500 cursor-not-allowed" : null
            } `}
          >
            Find Notes
          </button>
        </div>

        {/* Show Note Section */}
        {notes?.length > 0 ? (
          <div>
            <Card note={notes[0]} />
          </div>
        ) : null}
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h2>Loading</h2>
    </div>
  );
}

export default page;
