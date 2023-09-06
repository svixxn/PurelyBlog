import Button from "@/components/ui/Button";
import { getUser } from "@/lib/actions/user.actions";
import Image from "next/image";
import { toast } from "react-hot-toast";

const page = async ({ params }: { params: { username: string } }) => {
  const result = await getUser({ username: params.username });

  if (result?.error) {
    toast.error(result.error);
    return;
  }

  return (
    <div className="border-2">
      <div className="flex flex-row gap-12 px-10">
        <Image
          src={result.user.image}
          width={175}
          height={175}
          alt={result.user.username}
          className="rounded-full"
        />
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-xl font-bold">{result.user.username}</span>
            <Button
              text="Edit profile"
              bgColor="bg-gray-100"
              textColor="text-black"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
