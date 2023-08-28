"use client";
import Link from "next/link";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { createUser } from "@/lib/actions/user.actions";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { UserValidation } from "@/lib/validations/user";

export default function LoginForm({ isLogin }: { isLogin: boolean }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<z.infer<typeof UserValidation>>({
    resolver: zodResolver(UserValidation),
  });

  const onSubmit = async (values: z.infer<typeof UserValidation>) => {
    try {
      const { email, name, password } = values;
      if (isLogin) {
        const res = await signIn("credentials", {
          email,
          password,
          redirect: false,
        });

        console.log(res);
        if (res?.error) {
          alert("Invalid credentials");
          return;
        }

        router.push("/");
      } else {
        const res = await createUser({ ...values });

        router.push("/auth/signin");
      }
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="flex w-full items-center justify-center h-screen">
      <div className="rounded-2xl border-t-4 border-green-400 w-1/4 p-6 shadow-xl">
        <h1 className="font-bold text-xl">{isLogin ? "Login" : "Register"}</h1>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 mt-2"
        >
          {!isLogin && (
            <input
              type="text"
              className="p-4 border-2 rounded"
              placeholder="Name"
              {...register("name")}
            />
          )}
          {!isLogin && errors.name && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.name?.message}
            </p>
          )}

          <input
            type="text"
            className="p-4 border-2 rounded"
            placeholder="Email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.email?.message}
            </p>
          )}
          <input
            type="password"
            className="p-4 border-2 rounded"
            placeholder="Password"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-xs italic text-red-500 mt-2">
              {errors.password?.message}
            </p>
          )}
          <button className="bg-green-600 text-white font-bold p-4">
            {isLogin ? "Login" : "Register"}
          </button>
          <div className="ml-auto">
            {isLogin ? (
              <Link href={"/auth/signup"} className="text-sm mt-3">
                Dont have an account?{" "}
                <span className="underline">Register</span>
              </Link>
            ) : (
              <Link href={"/auth/signin"} className="text-sm mt-3">
                Already have an account?{" "}
                <span className="underline">Login</span>
              </Link>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
