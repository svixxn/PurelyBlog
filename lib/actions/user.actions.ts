"use server";
import { getServerSession } from "next-auth";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";

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

export async function createUser({ name, username, email, password }: Params) {
  try {
    connectToDB();

    const isExisted = await User.findOne({ email });

    if (isExisted) return { error: "User already exists" };

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
}: {
  currentUser?: string | null;
}) {
  try {
    connectToDB();

    const users = await User.find({ email: { $ne: currentUser } }).select(
      "name username email image"
    );

    return { users };
  } catch (err: any) {
    return { error: err.message };
  }
}
