"use server";

import z from "zod";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { UserSignupValidation } from "../validations/user.signup";

type Params = {
  name: string;
  email: string;
  password: string;
  username?: string;
  bio?: string;
  image?: string;
};

export async function updateUser({
  name,
  email,
  password,
  username,
  bio,
  image,
}: Params) {
  try {
    connectToDB();

    const user = await User.create({
      name,
      email,
      password,
      username,
      bio,
      image,
    });

    return user;
  } catch (err: any) {
    throw new Error("Error creating a user");
  }
}
