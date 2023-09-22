"use client";
import dateParse from "@/lib/utils/dateParse";
import Image from "next/image";
import Link from "next/link";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { FaRegCommentDots } from "react-icons/fa";
import { HiOutlineDotsCircleHorizontal } from "react-icons/hi";
import MyModal from "../ui/Modal";
import { useSession } from "next-auth/react";
import { useState } from "react";
import MyButton from "../ui/Button";

type PostCardProps = {
  id: string;
  title: string;
  text: string;
  createdAt: string;
  image?: string;
  authorUsername: string;
  authorName: string;
  authorImage: string;
};

const PostCard = ({
  id,
  title,
  text,
  createdAt,
  image = "",
  authorUsername,
  authorName,
  authorImage,
}: PostCardProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const { data: session } = useSession();
  const isCurrentAuthor = session?.user?.username === authorUsername;
  const newCreatedAt = dateParse(createdAt);
  return (
    <div className="flex flex-row gap-2 shadow-lg p-4">
      <div className="flex flex-col gap-2">
        <div className="flex flex-row gap-2 items-center">
          <div>
            <Image
              src={authorImage}
              width={52}
              height={52}
              alt={title}
              className="rounded-full"
            />
          </div>
          <div className="flex flex-col">
            <div className="font-bold flex flex-row gap-1 items-center">
              <Link href={`/users/${authorUsername}`}>@{authorUsername}</Link>
              <span className="text-gray-400 text-sm"> - {newCreatedAt}</span>
              <span> - {title}</span>
              {isCurrentAuthor && (
                <HiOutlineDotsCircleHorizontal
                  size={24}
                  className="cursor-pointer"
                  onClick={() => setIsOpen(true)}
                />
              )}
            </div>
            <p className="text-gray-500">{authorName}</p>
          </div>
        </div>

        <p className="text-gray-700">{text}</p>

        <div className="mt-auto flex flex-row gap-8">
          <div className="flex flex-row gap-1 items-center">
            <AiOutlineHeart size={25} className="text-red-500" />
            <span className="text-gray-400">5</span>
          </div>
          <div className="flex flex-row gap-1 items-center">
            <FaRegCommentDots size={25} />
            <span className="text-gray-400">3</span>
          </div>
        </div>
      </div>
      {image && (
        <div className="ml-auto">
          <Image
            src={image}
            width={250}
            height={250}
            alt={title}
            className="rounded"
          />
        </div>
      )}
      {/* TODO: Add edit and delete functionality */}
      <MyModal title="Post Actions" openModal={isOpen} setOpenModal={setIsOpen}>
        <div className="flex flex-col gap-4 w-full">
          <MyButton text="Edit" src={`posts/${id}/edit`} />
          <MyButton text="Delete" bgColor="bg-red-500" textColor="text-white" />
        </div>
      </MyModal>
    </div>
  );
};

export default PostCard;
