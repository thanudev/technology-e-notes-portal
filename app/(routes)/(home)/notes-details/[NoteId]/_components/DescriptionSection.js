import React from "react";

function DescriptionSection({ note }) {
  return (
    <div className="p-2 border mt-2 rounded-md">
      <h1 className="font-bold">Description</h1>
      <h2 className="mt-1 text-gray-800">{note?.description}</h2>
    </div>
  );
}

export default DescriptionSection;
