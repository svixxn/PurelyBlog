"use client";

import { Avatar, Button, Dropdown } from "flowbite-react";
import { useSession, signOut } from "next-auth/react";

export default function AvatarDropDown() {
  const { data: session } = useSession();
  const user = session?.user;

  if (!user)
    return (
      <Button variant="primary" href="/auth/signin">
        Sign In
      </Button>
    );

  return (
    <Dropdown
      inline
      placement="top"
      label={
        <div className="flex flex-row gap-2 items-center">
          <Avatar
            alt="User settings"
            // img="/images/people/profile-picture-5.jpg"
            rounded
          />
          <span className="text-base font-bold text-neutral-800">
            {user?.name}
          </span>
        </div>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{user?.name}</span>
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
