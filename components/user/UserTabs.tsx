"use client";
import { useState } from "react";
import tabs from "../../constants/usertabs";
import { BiMessageSquareEdit } from "react-icons/bi";
import Link from "next/link";
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
              className={`flex flex-row gap-2 transition hover:cursor-pointer border-black p-4 ${
                active === tab.label ? "border-t-2 text-black" : "text-gray-500"
              }`}
            >
              {tab.icon} {tab.name}
            </div>
          );
        })}
      </div>
      {active === "posts" ? (
        <div className="flex flex-col items-center justify-center gap-4 mt-10">
          <span className="text-cyan-700">
            <BiMessageSquareEdit size={150} className="opacity-25" />
          </span>
          <span className="text-3xl">Creating posts</span>
          <span className="text-xl">
            After creating the post it will be available on your profile page.
          </span>
          <Link href="/new-post">
            <span className="text-xl text-cyan-700 underline">
              Create your first post
            </span>
          </Link>
        </div>
      ) : (
        <div className="flex flex-col gap-4">
          <div>
            You haven&#39;t saved any post yet.{" "}
            <Link href="/">
              <span className="text-cyan-700 underline hover:cursor-pointer">
                Go to Posts
              </span>
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default UserTabs;
