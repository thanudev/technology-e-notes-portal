"use client";
import React, { useEffect, useState } from "react";
import { db } from "../../../../../firebase-config";
import { doc, onSnapshot } from "firebase/firestore";
import TopSectionTitle from "./_components/TopSectionTitle";
import DescriptionSection from "./_components/DescriptionSection";
import FileSection from "./_components/FileSection";
import RightSection from "./_components/RightSection";

function page({ params }) {
  const [note, setNote] = useState();

  useEffect(() => {
    params?.NoteId && getNoteById();
  }, [params]);

  const getNoteById = async () => {
    let n = [];
    const unsub = onSnapshot(doc(db, "Notes", params.NoteId), (doc) => {
      n.push({ id: doc?.id, ...doc.data() });
      setNote(n[0]);
    });

    return unsub;
  };

  return note ? (
    <div className="grid grid-cols-1 md:grid-cols-3 p-5">
      <div className="col-span-1 md:col-span-2">
        <TopSectionTitle note={note} />
        <DescriptionSection note={note} />
        <FileSection note={note} />
      </div>
      <div>
        <RightSection note={note} />
      </div>
    </div>
  ) : (
    <div className="h-screen w-screen flex flex-col justify-center items-center">
      <h2>Loading</h2>
    </div>
  );
}

export default page;
