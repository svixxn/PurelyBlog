"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

const Page = () => {
  const { data: session } = useSession();
  const router = useRouter();
  if (session?.user?.username) router.push("/");

  return <div>{JSON.stringify(session?.user)}</div>;
};

export default Page;
