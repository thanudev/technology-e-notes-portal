"use client";
import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import BannerSection from "./_components/BannerSection";
import Skeleton from "./_components/Skeleton";
import { useRouter } from "next/navigation";
import Card from "./_components/Card";

function Home() {
  const [notes, setNotes] = useState();
  const router = useRouter();

  useEffect(() => {
    getAllNotes();
  }, [notes]);

  const getAllNotes = async () => {
    let n = [];

    const unsub = onSnapshot(collection(db, "Notes"), (snapshot) => {
      snapshot.forEach((doc) => {
        n.push({ id: doc?.id, ...doc.data() });
      });
      setNotes(n);
    });
    return unsub;
  };

  return (
    <div>
      <BannerSection />

      <div className="p-2 ">
        <h2 className="text-[18px] font-medium mb-3">Popular Notes...</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 border border-gray-300 rounded-md">
          {notes
            ? notes?.map((item, index) => <Card key={index} note={item} />)
            : [0, 1, 2, 3, 4].map((item, index) => <Skeleton key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
