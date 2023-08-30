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

export async function createUser({ name, email, password }: Params) {
  try {
    connectToDB();

    const isExisted = await User.findOne({ email });

    if (isExisted) return { error: "User already exists" };

    const user = await User.create({
      name,
      email,
      password,
    });

    return user;
  } catch (err: any) {
    return { error: err.message };
  }
}
