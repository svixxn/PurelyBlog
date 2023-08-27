"use server";

import z from "zod";
import User from "../models/user.model";
import { connectToDB } from "../mongoose";
import { UserValidation } from "../validations/user";

export async function createUser({
  name,
  email,
  password,
}: z.infer<typeof UserValidation>) {
  try {
    connectToDB();

    const user = await User.create({ name, email, password });

    return user;
  } catch (err: any) {
    throw new Error("Error creating a user");
  }
}
