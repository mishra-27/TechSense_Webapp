import { Avatar } from "@material-ui/core";
import React, { useState} from "react";
import { GoogleLogout } from "react-google-login";
import { useDispatch, useSelector } from "react-redux";
import {
  selectSignedIn,
  selectUserData,
  setInput,
  setSignedIn,
  setUserData,
} from "../features/userSlice";

import "../styling/navbar.css";
import TechSenseLogo from '../assets/images/logo.png';
import TechSenseVideo from '../assets/video/ts.mp4'; //yeeeee bccchhhhhaaaaaaa hhhhaaaaiiiiiii abhiiiiii
import './Video';

const Navbar = () => {
  const [inputValue, setInputValue] = useState("tech");
  const isSignedIn = useSelector(selectSignedIn);
  const userData = useSelector(selectUserData);

  const dispatch = useDispatch();

  const logout = (response) => {
    dispatch(setSignedIn(false));
    dispatch(setUserData(null));
  };

  const handleClick = (e) => {
    e.preventDefault();
    dispatch(setInput(inputValue));
  };

  return (
    <div className="navbar">
          <div className="logo-image">
          <video controls className = 'video' width = '600'>
            <source src={TechSenseVideo} type="video/mp4" />
          </video>
          <img src={TechSenseLogo} alt="TechSense" />
        </div>
      {isSignedIn && (
        <div className="blog__search">
          <input
            className="search"
            placeholder="ENTER TOPIC"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
          />
          <button className="submit" onClick={handleClick}>
            SEARCH
          </button>
        </div>
      )}

      {isSignedIn ? (
        <div className="navbar__user__data">
          <Avatar
            className="user"
            src={userData?.imageUrl}
            alt={userData?.name}
          />
          <h1 className="signedIn">{userData?.givenName}</h1>
          <GoogleLogout
            clientId="57529085775-fk8rn8hren1q8o5ja2idq4m7hug5aong.apps.googleusercontent.com"
            render={(renderProps) => (
              <button
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
                className="logout__button"
              >
                LOGOUT, BYE!
              </button>
            )}
            onLogoutSuccess={logout}
          />
        </div>
      ) : (
        <h1 className="notSignedIn">HAPPY READING!</h1>
      )}
    </div>
  );
};

export default Navbar;