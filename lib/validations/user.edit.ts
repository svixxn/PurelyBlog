import z from "zod";

export const UserEditValidation = z.object({
  name: z
    .string()
    .min(3, "Name should be al least 3 characters long!")
    .max(30, "Name should be less than 50 characters long!"),
  email: z
    .string()
    .email("You should provide a valid email")
    .min(4, "Email should be al least 3 characters long!")
    .max(50, "Email should be less than 50 characters long!"),
  username: z
    .string()
    .min(3, "Username should be al least 3 characters long!")
    .max(20, "Username should be less than 20 characters long!"),
  bio: z.string().max(160, "Bio should be less than 160 characters long!"),
  image: z.string().optional(),
});
