"use client";
import React, { useEffect, useState } from "react";
import { collection, doc, onSnapshot } from "firebase/firestore";
import { db } from "@/firebase-config";
import BannerSection from "./_components/BannerSection";
import Skeleton from "./_components/Skeleton";
import { useRouter } from "next/navigation";

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
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 border rounded-md">
          {notes
            ? notes?.map((item, index) => (
                <div
                  onClick={() => router.push("/notes-details/" + item?.id)}
                  key={index}
                  className="col-span-1 m-2 border rounded-md cursor-pointer shadow-sm hover:shadow-md"
                >
                  <img
                    src={item?.banner}
                    className="w-full h-[250px] object-cover md:w-full md:h-[300px] rounded-t-md"
                  />
                  <div className="p-2 flex justify-between items-center">
                    <div>
                      <h2>
                        {item?.unitNo}.{item?.title}
                      </h2>
                      {item?.free ? (
                        <h2 className="text-green-400 font-medium text-[15px]">
                          Free
                        </h2>
                      ) : (
                        <h2 className="text-red-400 font-medium text-[15px]">
                          Paid
                        </h2>
                      )}
                    </div>
                    <div className="flex-col items-center justify-center gap-2">
                      <div className="bg-primary rounded-full text-white p-2">
                        <h2 className="text-center">{item?.subjectCategory}</h2>
                      </div>
                      {item?.type === "short-notes" ? (
                        <h2 className="text-center">Short Notes</h2>
                      ) : (
                        <h2 className="text-center"> Notes</h2>
                      )}
                    </div>
                  </div>
                </div>
              ))
            : [0, 1, 2, 3, 4].map((item, index) => <Skeleton key={index} />)}
        </div>
      </div>
    </div>
  );
}

export default Home;
