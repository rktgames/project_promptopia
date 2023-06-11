'use client';

import { useEffect, useState } from "react";
import PromptCard from "./PromptCard";

const PromptCardList = ({ data, handleTagClick }) => {
  return <div className="mt-16 prompt_layout">
    {
      data.map((post) => (
        <PromptCard
          key={post._id}
          post={post}
          handleTagClick={handleTagClick}
        />
      ))
    }
  </div>
}


const Feed = () => {
  //All Posts
  const [allPosts, setAllPosts] = useState([])

  //Search States
  const [searchText, setSearchText] = useState('');
  const [searchTimeout, setSearchTimeout] = useState(null);
  const [searchedResults, setSearchedResults] = useState([]);

  const fetchPosts = async () => {
    const response = await fetch('/api/prompt');
    const data = await response.json();
    setAllPosts(data)
  }

  useEffect(() => {
    fetchPosts();
  }, []);

  const filterPrompts = (searchtext) => {
    const regex = new RegExp(searchtext, "i");
    return allPosts.filter((item) => regex.test(item.creator.username) || regex.test(item.tag) || regex.test(item.prompt));
  }

  const handleSearchChange = (e) => {
    clearTimeout(searchTimeout);
    setSearchText(e.target.value);

    //Debounce
    setSearchTimeout(
      setTimeout(() => {
        const searchResult = filterPrompts(e.target.value);
        setSearchedResults(searchResult);
      }, 500)
    );
  }

  const handlesTagClick = (tag) => {
    setSearchText(tag);
    const searchResult = filterPrompts(tag);
    setSearchedResults(searchResult);
  }

  return (
    <section className="feed">
      <form className="relative w-full flex-center">
        <input
          type="text"
          placeholder="Search for a tag or username"
          value={searchText}
          onChange={handleSearchChange}
          required
          className="search_input peer"
        />
      </form>

      {searchText ? (
        <PromptCardList data={searchedResults} handleTagClick={handlesTagClick} />
      ) : (
        <PromptCardList data={allPosts} handleTagClick={handlesTagClick} />
      )}

    </section>
  )
}

export default Feed