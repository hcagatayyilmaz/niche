import axios from "axios";
import CreatePost from "./components/CreatePost";
import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const res = await axios.get("/api/posts/getPosts");
  console.log(res);
  return res.data;
};

export default function Home() {
  const { data, error, isLoading } = useQuery({
    queryFn: fetchPosts,
    queryKey: ["posts"],
  });
  if (error) return error;
  if (isLoading) return "Loading.....";

  return (
    <main>
      <CreatePost />
    </main>
  );
}
