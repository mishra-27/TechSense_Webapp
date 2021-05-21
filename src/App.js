import React from "react";
import { useSelector } from "react-redux";
import Homepage from "./Components/Homepage";
import Navbar from "./Components/Navbar";
import Blogs from "./Components/Blogs";
import LocalBlogs from "./Components/LocalBlogs";
import { selectSignedIn } from "./features/userSlice";
import "./styling/app.css";

const App = () => {
  const isSignedIn = useSelector(selectSignedIn);

  return (
    <div className="app">
      <Navbar />
      <Homepage />
      {isSignedIn && <Blogs />}
      {isSignedIn && <LocalBlogs />}
    </div>
  );
};

export default App;
