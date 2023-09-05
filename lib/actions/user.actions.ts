"use server";
import { getServerSession } from "next-auth";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { FilterQuery, SortOrder } from "mongoose";

type Params = {
  name: string;
  email: string;
  password: string;
  username: string;
  bio?: string;
  image?: string;
};

type GetUserParams = {
  email?: string;
  username?: string;
  id?: string;
};

type GetAllUsersParams = {
  currentUser?: string;
  searchString?: string;
  pageNumber?: number;
  pageSize?: number;
  sortBy?: SortOrder;
};

export async function createUser({ name, username, email, password }: Params) {
  try {
    connectToDB();

    const isExisted = await User.findOne({
      $or: [{ email }, { username }],
    });

    if (isExisted) return { error: "Email or username is already used." };

    const user = await User.create({
      name,
      email,
      username,
      password,
    });

    return { success: true };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function updateUser({ name, username, email, bio }: Params) {}

export async function deleteUser({ email }: Params) {}

export async function getUser(Params: GetUserParams) {
  try {
    connectToDB();

    const user = await User.findOne(Params);

    return { user };
  } catch (err: any) {
    return { error: err.message };
  }
}

export async function getUsers({
  currentUser,
  searchString = "",
  pageNumber = 1,
  pageSize = 20,
  sortBy = "desc",
}: GetAllUsersParams) {
  try {
    connectToDB();

    const regex = new RegExp(searchString, "i");

    const query: FilterQuery<typeof User> = {
      email: { $ne: currentUser },
    };

    if (searchString.trim() !== "") {
      query.$or = [
        { username: { $regex: regex } },
        { name: { $regex: regex } },
        { email: { $regex: regex } },
      ];
    }

    const usersQuery = User.find(query)
      .sort({ createdAt: sortBy })
      .skip((pageNumber - 1) * pageSize)
      .limit(pageSize)
      .select("email name username image");

    const users = await usersQuery.exec();

    return { users, results: users.length };
  } catch (err: any) {
    return { error: err.message };
  }
}
