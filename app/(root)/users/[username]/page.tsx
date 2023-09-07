import Button from "@/components/ui/Button";
import UserTabs from "@/components/user/UserTabs";
import { getUser } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";
import Image from "next/image";
import { toast } from "react-hot-toast";

const page = async ({ params }: { params: { username: string } }) => {
  const result = await getUser({ username: params.username });
  const session = await getServerSession();

  const isSelf = result?.user?.email === session?.user?.email;

  if (result?.error) {
    toast.error(result.error);
    return;
  }

  return (
    <div>
      <div className="flex flex-row gap-28 px-10 mb-10">
        <div>
          <Image
            src={result.user.image}
            width={175}
            height={175}
            alt={result.user.username}
            className="rounded-full"
          />
        </div>
        <div className="flex flex-col gap-6">
          <div className="flex flex-row gap-4 items-center">
            <span className="text-xl font-bold">{result.user.username}</span>
            {isSelf ? (
              <>
                <Button
                  text="Edit profile"
                  bgColor="bg-gray-100"
                  textColor="text-black"
                />
                <Button
                  text="Show archive"
                  bgColor="bg-gray-100"
                  textColor="text-black"
                />
              </>
            ) : (
              <Button
                text="Follow"
                bgColor="bg-cyan-700"
                textColor="text-white"
              />
            )}
          </div>
          <div className="flex flex-row gap-8 items-center">
            <div>
              <span className="font-bold">0</span> posts
            </div>
            <div>
              <span className="font-bold">0</span> followers
            </div>
            <div>
              <span className="font-bold">0</span> following
            </div>
          </div>
          <div className="text-sm">{result.user.bio || "no bio yet"}</div>
        </div>
      </div>
      <hr />
      <UserTabs />
    </div>
  );
};

export default page;
