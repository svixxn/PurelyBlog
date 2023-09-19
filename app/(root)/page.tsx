import PostCard from "@/components/posts/PostCard";
import { getPosts } from "@/lib/actions/posts.actions";

export default async function Home() {
  const result = await getPosts();

  if (result?.error) {
    console.log(result.error);
    return;
  }

  return (
    <main>
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-10">Latest posts</h1>
        <div className="flex flex-col gap-8">
          {result?.posts?.map((post) => (
            <PostCard
              key={post._id}
              text={post.text}
              title={post.title}
              image={post.image}
              createdAt={post.createdAt}
              authorUsername={post.author.username}
              authorName={post.author.name}
              authorImage={post.author.image}
            />
          ))}
        </div>
      </div>
    </main>
  );
}
