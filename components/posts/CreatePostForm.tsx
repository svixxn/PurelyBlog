"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, TextInput, Textarea, FileInput } from "flowbite-react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { useRouter } from "next/navigation";
import { AiOutlineLoading } from "react-icons/ai";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { BiPhotoAlbum } from "react-icons/bi";
import { useState } from "react";
import { PostUpsertValidation } from "@/lib/validations/post/post";
import { createPost } from "@/lib/actions/posts.actions";
import handleImageChange from "@/lib/utils/handleImageChange";
import uploads from "@/lib/utils/cloudinary";

const CreatePostForm = () => {
  const [preview, setPreview] = useState<string | null>(null);
  const { data: session } = useSession();
  const userId = session?.user?.id as string;
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<z.infer<typeof PostUpsertValidation>>({
    resolver: zodResolver(PostUpsertValidation),
  });

  const onSubmit = async (values: z.infer<typeof PostUpsertValidation>) => {
    try {
      values.image = null;
      if (preview) {
        const result = await uploads({
          file: preview,
          folder: "purelyblog/posts",
          public_id: userId,
        });
        if (typeof result === "string") values.image = result;
      }
      const res = await createPost({ ...values, author: userId });
      if (res?.error) {
        toast.error(res.error);
        return;
      }

      toast.success("Post created successfully");
      router.push("/");
    } catch (err: any) {
      console.log(err);
      toast.error(err.message);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-4 w-full">
        <div
          className={`bg-gray-200 border-2 rounded-xl p-2 ${
            preview ? "h-80" : "h-48"
          } flex flex-row items-center justify-center gap-2`}
        >
          {preview ? (
            <Image
              width={225}
              height={225}
              src={preview}
              alt="Post image"
              className="rounded object-cover"
            />
          ) : (
            <span className="text-primary">
              <BiPhotoAlbum size={125} className="opacity-50" />
            </span>
          )}

          <div className="flex flex-col gap-1">
            <FileInput
              helperText={`${
                !preview ? "Upload the image to describe your post" : ""
              }`}
              id="image"
              onChangeCapture={(e) =>
                handleImageChange(
                  e as React.ChangeEvent<HTMLInputElement>,
                  setPreview
                )
              }
              {...register("image")}
            />
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <TextInput
            //  defaultValue={title}
            color={errors.title && "failure"}
            id="title"
            placeholder="Title"
            shadow
            type="text"
            className={`${!errors.title && "mb-4"}`}
            {...register("title")}
          />

          {errors.title && (
            <span className="text-sm italic text-red-500 mb-4">
              {errors.title.message}
            </span>
          )}

          <Textarea
            //  defaultValue={text}
            rows={10}
            color={errors.text && "failure"}
            id="text"
            placeholder="Tell your story..."
            shadow
            className={`${!errors.text && "mb-4"}`}
            {...register("text")}
          />

          {errors.text && (
            <span className="text-sm italic text-red-500 mb-4">
              {errors.text.message}
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

export default CreatePostForm;
