import { CopyrightIcon } from "lucide-react";
import React from "react";

function Footer() {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-3 justify-evenly p-5 gap-3">
        <div>
          <h2 className="text-white text-[20px] shadow-sm cursor-pointer">
            Technology E Learning Portal
          </h2>
          <p className="text-white cursor-pointer">
            This product developed by Easy Solutions Pvt Ltd Company. The Ceo Is
            @Thanushan. This is a free open source product for students..
          </p>
        </div>
        <div>
          <h2 className="text-white text-[20px] shadow-sm cursor-pointer">
            Company - Easy Solutions
          </h2>
          <ul className="text-white text-[16px] underline cursor-pointer">
            <li>Share</li>
            <li>Details</li>
          </ul>
        </div>
        <div>
          <h2 className="text-white text-[20px] shadow-sm cursor-pointer">
            Support
          </h2>
          <h2 className="text-white text-[16px] underline cursor-pointer">
            Privacy Policy
          </h2>
          <h2 className="text-white text-[16px] underline cursor-pointer">
            Donate To Company
          </h2>
        </div>
      </div>
      <div className="pt-4 pb-5">
        <hr />
        <p className="text-white mt-3 px-2 flex gap-2 items-center justify-start">
          <CopyrightIcon />
          Developed by @Thanushan, All rights reserved
        </p>
      </div>
    </div>
  );
}

export default Footer;
