import { User } from "lucide-react";
import React from "react";

function TopSectionTitle({ note }) {
  return (
    <div>
      <div className="rounded-md border p-2 border-gray-300">
        <h2 className="text-primary font-bold text-[20px]">
          {note?.unitNo}.{note?.title}({note?.type})
        </h2>
        {/* <img
          src={note?.banner}
          className="mt-2 h-[300px] w-full object-contain "
        /> */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-1 text-gray-400 mt-2 cursor-pointer">
            <User />
            <h2>{note?.author}</h2>
          </div>
          <div className="p-1">
            <div className="flex">
              <h2>Posted On: </h2>
              <h2> {note?.createdAt?.split("T")[0]}</h2>
            </div>
            <div className="flex">
              <h2>At: </h2>
              <h2> {note?.createdAt?.split("T")[1]}</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopSectionTitle;
