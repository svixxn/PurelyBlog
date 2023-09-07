"use client";
import { useState } from "react";
import tabs from "../../constants/usertabs";
const UserTabs = () => {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <>
      <div className="flex flex-row justify-center gap-16">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.label}
              onClick={() => setActive(tab.label)}
              className={`flex flex-row gap-2 border-black p-4 ${
                active === tab.label ? "border-t-2 text-black" : "text-gray-500"
              } transition hover:cursor-pointer}`}
            >
              {tab.icon} {tab.name}
            </div>
          );
        })}
      </div>
      {active === "posts" ? (
        <div className="flex flex-col gap-4">Posts</div>
      ) : (
        <div className="flex flex-col gap-4">Liked</div>
      )}
    </>
  );
};

export default UserTabs;
