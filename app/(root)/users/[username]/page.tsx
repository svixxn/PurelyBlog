import { getUser } from "@/lib/actions/user.actions";

const page = async ({ params }: { params: { username: string } }) => {
  const result = await getUser({ username: params.username });

  if (result?.error) {
    alert(result.error);
    return;
  }

  return <div>{result.user.name}</div>;
};

export default page;
