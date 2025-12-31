import React, { useEffect, useState } from "react";
import appwriteService from "../appwrite/config";
import { Container, PostCard } from "../components";
import { useSelector } from "react-redux";

function AllPosts() {
  const [posts, setPosts] = useState([]);
  const authStatus = useSelector((state) => state.auth.status);

  useEffect(() => {
    if (!authStatus) return;

    appwriteService.getPosts().then((res) => {
      if (res) {
        setPosts(res.documents);
      }
    });
  }, [authStatus]);

  if (!authStatus) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-2xl font-bold">
            Please login to see posts
          </h1>
        </Container>
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div className="w-full py-8 text-center">
        <Container>
          <h1 className="text-xl">No posts available</h1>
        </Container>
      </div>
    );
  }

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

export default AllPosts;
