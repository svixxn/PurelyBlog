import PostForm from "@/components/posts/PostForm";
import { getPost } from "@/lib/actions/posts.actions";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Page = async ({ params }: { params: { id: string } }) => {
  const session = await getServerSession();
  const { post, error } = await getPost(params.id);

  if (error) {
    redirect("/");
  }

  if (post.author.email !== session?.user?.email) {
    redirect("/");
  }

  return (
    <PostForm
      title={post.title}
      text={post.text}
      image={post.image}
      id={post.id.toString()}
    />
  );
};

export default Page;
