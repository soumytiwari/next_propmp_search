"use client";

import { useState, useEffect } from "react";

import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return (
    <div className="mt-16 prompt_layout">
      {data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))}
    </div>
  )
}


const Feed = () => {

  const [searchText, setSearchText] = useState('');
  const [posts, setPosts] = useState([]);

  const handleSearchChange = (e) => {

  }

  // from the feed we have to make a GET request to our own next.js api
  // for it we'll use, useEffect... and here cause we want it to show as soon as the page loads
  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch('/api/prompt');
      const data = await response.json();
      // now we can update our state, using post <by creating a new useState field, c/d posts>
      setPosts(data);
    }

    fetchPosts();
  }, []);

  return (
    <section className="feed">
      {/* /form for the search of our feed */}
      <form className="relative w-full flex-center">
        <input 
        type="text" 
        placeholder="Search for a tag or a username" 
        value={searchText}
        onChange={handleSearchChange}
        required
        className="search_input peer"
        />
      </form>

    {/* now we gonna render our prompt */}
      <PromptCardList
      data= {posts}
      handleTagClick={() => {}}
      />
    </section>
  );
};

export default Feed;

// PromptCardList is gonna be used only in this specific feed
