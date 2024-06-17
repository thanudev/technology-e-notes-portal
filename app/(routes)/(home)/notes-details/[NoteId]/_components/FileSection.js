"use client";
import React from "react";

function FileSection({ note }) {
  return (
    <div className="p-2 border  border-gray-300 m-2 rounded-md ">
      <h2 className="text-primary text-[18px] my-2 ">Preview</h2>
      <iframe
        typeof="application/pdf"
        className="h-[500px] w-full"
        src={`${note?.pdf}#toolbar=0`}
      />
    </div>
  );
}

export default FileSection;
