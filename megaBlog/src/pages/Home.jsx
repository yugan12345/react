import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function Home() {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) {
      setLoading(false);
      return;
    }

    appwriteService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents);
      }
      setLoading(false);
    });
  }, [authStatus]);

  // 🔄 Still loading
  if (loading) {
    return (
      <div className="w-full py-8 text-center">
        <h1 className="text-xl">Loading...</h1>
      </div>
    );
  }

  // 🚫 Not logged in
  if (!authStatus) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">
            Please login to read posts
          </h1>
        </Container>
      </div>
    );
  }

  // 📭 Logged in but no posts
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">
            No posts yet. Create one!
          </h1>
        </Container>
      </div>
    );
  }

  // ✅ Logged in + posts exist
  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <PostCard {...post} />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
}

export default Home;
