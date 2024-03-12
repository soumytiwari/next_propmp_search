"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import Profile from "@components/Profile";
import { data } from "autoprefixer";

const MyProfile = () => {

    const { data: session } = useSession();                   //  to fetch, we have to get that data

    const [posts, setPosts] = useState([]);

  // fetch
  // from the feed we have to make a GET request to our own next.js api
  // for it we'll use, useEffect... and here cause we want it to show as soon as the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch(`/api/users/${session?.user.id}/posts`);             //  `` instead of '' or other.. to make the route dynamic(depends on user). fetch the posts of the specific user only
      const data = await response.json();

      // now we can update our state(data), using post <by creating a new useState field, c/d posts>
      setPosts(data);
      
    };

    //  fetch only when we have a user logged in
    if(session?.user.id) fetchPosts();
  }, []);
  
  const handleEdit = async () => {

  };
  
  const handleDelete = async () => {
    
  };
  
  return (
    <Profile
    name="My"
    desc="Welcome to your personalized profile page"
    data={posts}
    handleEdit={handleEdit}
    handleDelete={handleDelete}
    />
    );
};

export default MyProfile;
