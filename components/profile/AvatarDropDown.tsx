"use client";

import { Avatar, Dropdown } from "flowbite-react";

type Props = {
  imgUrl: string;
  name: string;
  email: string;
};

export default function AvatarDropDown({ imgUrl, name, email }: Props) {
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
          <span className="text-base font-bold text-neutral-800">{name}</span>
        </div>
      }
    >
      <Dropdown.Header>
        <span className="block text-sm">{name}</span>
        <span className="block truncate text-sm font-medium">{email}</span>
      </Dropdown.Header>
      <Dropdown.Item>Dashboard</Dropdown.Item>
      <Dropdown.Divider />
      <Dropdown.Item>Sign Out</Dropdown.Item>
    </Dropdown>
  );
}
