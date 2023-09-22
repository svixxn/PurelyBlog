import PostForm from "@/components/posts/PostForm";
import { getPost } from "@/lib/actions/posts.actions";
import toast from "react-hot-toast";

const Page = async ({ params }: { params: { id: string } }) => {
  const result = await getPost(params.id);

  if (result?.error) {
    toast.error(result.error);
    return;
  }
  const { post } = result;

  return <PostForm title={post.title} text={post.text} image={post.image} />;
};

export default Page;
