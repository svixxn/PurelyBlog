"use server";

import { revalidatePath } from "next/cache";
import Post from "../models/post.model";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

type createPostParams = {
  title: string;
  text: string;
  author: string;
  image?: string;
  parentId?: string;
};

export const createPost = async ({
  title,
  text,
  image,
  parentId,
  author,
}: createPostParams) => {
  try {
    await connectToDB();
    await Post.create({ title, text, image, parentId, author });

    revalidatePath("/");
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
};

export const getPosts = async () => {
  try {
    await connectToDB();
    const query = Post.find({})
      .sort({ createdAt: -1 })
      .populate({ path: "author", model: User });

    const posts = await query.exec();
    return { posts };
  } catch (error: any) {
    console.log(error);
    return { error: error.message };
  }
};
