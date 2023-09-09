"use client";

import { updateUser } from "@/lib/actions/user.actions";
import { UserEditValidation } from "@/lib/validations/user.edit";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import Link from "next/link";
import { useSession } from "next-auth/react";
import Image from "next/image";

type Props = {
  name: string;
  username: string;
  email: string;
  image: string;
  bio: string;
};

const UserEditForm = ({ name, username, email, image, bio }: Props) => {
  const router = useRouter();
  const { data: session, update: sessionUpdate } = useSession();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof UserEditValidation>>({
    resolver: zodResolver(UserEditValidation),
  });

  const onSubmit = async (values: z.infer<typeof UserEditValidation>) => {
    try {
      const { email, name, username, bio } = values;
      const res = await updateUser({ name, username, email, bio });
      if (res?.error) {
        toast.error(res.error);
        return;
      }
      sessionUpdate({
        name: name,
        username: username,
        email: email,
        image: image,
        bio: bio,
      });
      toast.success("User updated successfully");
      router.push(`/users/${username}`);
    } catch (err: any) {
      toast.error(err.message);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6">
      <div className="flex flex-row justify-between items-center">
        <div className="flex flex-col gap-4 w-1/2 items-center">
          <Image
            src={image}
            width={225}
            height={225}
            alt={username}
            className="rounded-full object-cover"
          />
          <FileInput
            id="image"
            // {...register("image")}
          />
        </div>
        <div className="flex flex-col w-full">
          <TextInput
            defaultValue={name}
            color={errors.name && "failure"}
            id="Name"
            placeholder="Name"
            shadow
            type="text"
            className={`${!errors.name && "mb-4"}`}
            {...register("name")}
          />

          {errors.name && (
            <span className="text-sm italic text-red-500 mt-1 mb-4">
              {errors.name.message}
            </span>
          )}

          <TextInput
            defaultValue={username}
            color={errors.username && "failure"}
            id="username"
            placeholder="Username"
            shadow
            type="text"
            className={`${!errors.username && "mb-4"}`}
            {...register("username")}
          />

          {errors.username && (
            <span className="text-sm italic text-red-500 mt-1 mb-4">
              {errors.username.message}
            </span>
          )}

          <TextInput
            defaultValue={email}
            id="email"
            color={errors.email && "failure"}
            placeholder="Email"
            shadow
            type="text"
            className={`${!errors.email && "mb-4"}`}
            {...register("email")}
          />
          {errors.email && (
            <span className="text-sm italic text-red-500 mt-1 mb-4">
              {errors.email.message}
            </span>
          )}
          <TextInput
            defaultValue={bio}
            id="bio"
            color={errors.bio && "failure"}
            placeholder="Bio"
            shadow
            type="text"
            className={`${!errors.bio && "mb-4"}`}
            {...register("bio")}
          />
          {errors.bio && (
            <span className="text-sm italic text-red-500 mt-1 mb-4">
              {errors.bio.message}
            </span>
          )}

          <Button
            type="submit"
            variant="primary"
            isProcessing={isSubmitting}
            disabled={isSubmitting}
            processingSpinner={
              <AiOutlineLoading className="h-6 w-6 animate-spin" />
            }
          >
            Save
          </Button>
        </div>
      </div>
    </form>
  );
};

export default UserEditForm;
