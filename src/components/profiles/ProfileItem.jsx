import React from "react";

export default function ProfileItem({ icon, label, value, isLast }) {
  return (
    <div
      className={`flex items-center justify-between bg-[#F8FAF9] rounded-xl p-3 shadow-sm hover:shadow-md transition-shadow duration-300 font-zain ${
        !isLast ? "border-b border-gray-200" : ""
      }`}
    >
      <span className="text-gray-700 text-sm md:text-base font-zain">
        {value || "—"}
      </span>

      <div className="flex flex-row-reverse items-center gap-2 text-[#2A603F] text-lg">
        {icon}
        <span className="font-[500] font-ruqaa">
          <span className=" mr-2">:</span> {label}
        </span>
      </div>
    </div>
  );
}
