"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";

const MyProfile = () => {
  const router = useRouter();

  const { data: session } = useSession(); //  to fetch, we have to get that data

  const [myPosts, setMyPosts] = useState([]);

  // fetch
  // from the feed we have to make a GET request to our own next.js api
  // for it we'll use, useEffect... and here cause we want it to show as soon as the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`); //  `` instead of '' or other.. to make the route dynamic(depends on user). fetch the posts of the specific user only
      const data = await response.json();

      // now we can update our state(data), using post <by creating a new useState field, c/d posts>
      setMyPosts(data);
    };

    //  fetch only when we have a user logged in
    if (session?.user.id) fetchPosts();
  }, [session?.user.id]);

  const handleEdit = async (post) => {
    // i will not edit it immidiately, but we'll take the user to a page where they can edit in a nice way
    router.push(`/update-prompt?id=${post._id}`);
  };

  const handleDelete = async (post) => {
    // check if the user is sure he wants to delete it..
    const hasConfirmed = confirm(
      "Are you sure you want to delete this prompt?"
    ); //  this is built into the browser api

    if (hasConfirmed) {
      try {
        await fetch(`/api/prompt/${post._id.toString()}`, {
          method: 'DELETE',
        });

        // filter the posts: show the non-deleted ones
        const filteredPosts = myPosts.filter((item) => item._id !== post._id);

        setMyPosts(filteredPosts);
      } catch (error) {
        console.log("Error deleting the prompt. " + error);
      }
    }
  };

  return (
    <Profile
      name="My"
      desc="Welcome to your personalized profile page"
      data={myPosts}
      handleEdit={handleEdit}
      handleDelete={handleDelete}
    />
  );
};

export default MyProfile;
