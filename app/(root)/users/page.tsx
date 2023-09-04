import SearchBar from "@/components/shared/SearchBar";
import UserCard from "@/components/user/UserCard";
import { getUsers } from "@/lib/actions/user.actions";
import { getServerSession } from "next-auth";

//:TODO: Add search functionality

const Page = async () => {
  const session = await getServerSession();
  const result = await getUsers({ currentUser: session?.user?.email });

  if (result?.error) {
    alert(result.error);
    return;
  }

  if (result?.users?.length === 0) {
    return <div className="font-bold text-2xl">Users not found.</div>;
  }

  return (
    <div>
      <SearchBar searchType="users" />
      <ul className="my-4 divide-y divide-gray-200 dark:divide-gray-700">
        {result?.users?.map((user) => (
          <li key={user._id} className="py-3 sm:py-4">
            <UserCard
              name={user.name}
              username={user.username}
              email={user.email}
              image={user.image}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Page;
