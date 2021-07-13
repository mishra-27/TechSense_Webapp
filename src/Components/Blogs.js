import React, { useEffect, useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";

import "../styling/blogs.css";

const Blogs = () => {
  const searchInput = useSelector(selectUserInput);
  //const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=9a20e3bb45fcf65897af8407be1aec6a` ; <img src={blog.image} /> TotalArticles
  //const blog_url = `https://newsapi.org/v2/everything?q=${searchInput}&from=2021-04-10&sortBy=publishedAt&apiKey=02309a9a3d0b429ba8ef4dfd9c138535`;<img src={blog.urlToImage} /> TotalResults
  const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=621007d4ac653c5123fec34a2e492de4` ;
  const dispatch = useDispatch();
  const [blogs, setBlogs] = useState();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(blog_url)
      .then((response) => {
        dispatch(setBlogData(response.data));
        setBlogs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [searchInput]);

  return (
    <div className="blog__page">
      <h1 className="blog__page__header">Blogs</h1>
      {loading ? <h1 className="loading">Loading...</h1> : ""}
      <div className="blogs">
        {blogs?.articles?.map((blog) => (
          <a className="blog" target="_blank" href={blog.url} rel="noreferrer">
            <img src={blog.image} alt="blogimage"/>
            <div>
              <h3 className="sourceName">
                <span>{blog.source.name}</span>
                <p>{blog.publishedAt}</p>
              </h3>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </div>
          </a>
        ))}
        {blogs?.totalArticles === 0 && (
          <div className="no__blogs">
            <h1> Offo!! <br/> No blogs available :( </h1>
            <p> Why don't you try something else, huh?</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
