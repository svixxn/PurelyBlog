"use client";

import { Avatar, Button, Dropdown } from "flowbite-react";
import { useSession, signOut } from "next-auth/react";
import { AiOutlineLoading } from "react-icons/ai";

export default function AvatarDropDown() {
  const { data: session, status } = useSession();
  const user = session?.user;

  if (!user && status === "unauthenticated")
    return (
      <Button variant="primary" href="/auth/signin">
        Sign In
      </Button>
    );

  if (status === "loading") {
    return (
      <div className="flex items-center justify-center">
        <AiOutlineLoading className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  return (
    <Dropdown
      inline
      placement="top"
      label={
        <div className="flex flex-row gap-2 items-center">
          <Avatar alt="User settings" img={user?.image as string} rounded />
          <span className="text-base font-bold text-neutral-800">
            {user?.username || user?.name}
          </span>
        </div>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user?.username || user?.name}</span>
        <span className="block truncate text-sm font-medium">
          {user?.email}
        </span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item onClick={signOut}>Sign Out</Dropdown.Item>
    </Dropdown>
  );
}
