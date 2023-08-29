"use server";

import z from "zod";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { UserSignupValidation } from "../validations/user.signup";

export async function createUser({
  username,
  email,
  password,
}: z.infer<typeof UserSignupValidation>) {
  try {
    connectToDB();

    const user = await User.create({ username, email, password });

    return user;
  } catch (err: any) {
    throw new Error("Error creating a user");
  }
}
