import z from "zod";

export const UserSignupValidation = z
  .object({
    username: z
      .string()
      .min(3, "Name should be al least 3 characters long!")
      .optional(),
    email: z
      .string()
      .email("You should provide a valid email")
      .min(3, "Email should be al least 3 characters long!"),
    password: z
      .string()
      .min(6, "Password should be al least 6 characters long!"),
    confirm: z
      .string()
      .min(6, "Password should be al least 6 characters long!")
      .optional(),
  })
  .refine((data) => data.password === data.confirm, {
    message: "Passwords don't match",
    path: ["confirm"],
  });
