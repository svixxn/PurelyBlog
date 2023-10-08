"use client";

import { followUnFollowUser } from "@/lib/actions/user.actions";
import Button from "../ui/Button";
import toast from "react-hot-toast";
import { AiOutlineCheck } from "react-icons/ai";
import { useState } from "react";
import { Spinner } from "flowbite-react";

type Props = {
  isAbleToFollow: boolean;
  isFollowing: boolean;
  userId: string;
  followerId: string;
};

const FollowButton = ({
  isAbleToFollow,
  isFollowing,
  userId,
  followerId,
}: Props) => {
  const [loading, setLoading] = useState(false);
  const handleFollowUnFollow = async (userId: string, followerId: string) => {
    if (!isAbleToFollow) {
      toast.error("You must be logged in to follow someone.");
      return;
    }
    setLoading(true);
    const { error } = await followUnFollowUser(userId, followerId);
    setLoading(false);

    if (error) {
      toast.error(error);
      return;
    }
  };

  return (
    <>
      {isFollowing ? (
        <Button
          text="Following"
          bgColor="bg-gray-100"
          textColor="text-green-500"
          icon={loading ? <Spinner /> : <AiOutlineCheck />}
          onClickHandler={() => handleFollowUnFollow(userId, followerId)}
        />
      ) : (
        <Button
          text="Follow"
          icon={loading ? <Spinner /> : null}
          onClickHandler={() => handleFollowUnFollow(userId, followerId)}
        />
      )}
    </>
  );
};

export default FollowButton;
