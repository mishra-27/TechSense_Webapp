import React, { /*useEffect, useState*/} from "react";
/*import axios from "axios";*/
/*import { useDispatch, useSelector } from "react-redux";
import { selectUserInput, setBlogData } from "../features/userSlice";*/

import "../styling/blogs.css";
import articles from './Article.json';
import ReadMoreReact from 'read-more-react';

const Blogs = () => {
  /*const searchInput = useSelector(selectUserInput);*/
  /*const blog_url = `https://gnews.io/api/v4/search?q=${searchInput}&token=9a20e3bb45fcf65897af8407be1aec6a`;
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
  }, [searchInput]);*/

  return (
    <div className="blog__page">
      <p className="info">Fall short of blogs? Dive in here nerd ;)</p>
      <h1 className="blog__page__header">Trending Tech</h1>
      <div className="blogs">
        {
            articles.map(article => (
                <a className="blog" target="_blank" href={article.url} rel="noreferrer">
                  <div>
                    <h3 className="sourceName">
                      <span>Beebom</span>
                      <p>{article.date}</p>
                    </h3>
                    <h1>{article.title}</h1>
                    <p><ReadMoreReact text={article.text} readMoreText="READ MORE"/></p>
                  </div>
                </a> ))
        }
     </div>
    </div>
  );
};

export default Blogs;
