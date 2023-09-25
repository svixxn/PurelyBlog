"use client";
import { useState } from "react";
import tabs from "../../constants/usertabs";
import { BiMessageSquareEdit } from "react-icons/bi";
import Link from "next/link";
import { useSession } from "next-auth/react";
import UserPosts from "./UserPosts";
import SavedPosts from "./SavedPosts";
const UserTabs = ({ userId }: { userId: string }) => {
  const [active, setActive] = useState(tabs[0].label);

  return (
    <>
      <div className="flex flex-row justify-center gap-16">
        {tabs.map((tab) => {
          return (
            <div
              key={tab.label}
              onClick={() => setActive(tab.label)}
              className={`flex flex-row gap-2 transition hover:cursor-pointer border-black p-4 ${
                active === tab.label ? "border-t-2 text-black" : "text-gray-500"
              }`}
            >
              {tab.icon} {tab.name}
            </div>
          );
        })}
      </div>
      {active === "posts" ? <UserPosts /> : <SavedPosts />}
    </>
  );
};

export default UserTabs;
