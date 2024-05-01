import React from "react";
import "./IgButtonJR.css";

export const IgButtonJR = () => {
  const ig =
    "https://i.pinimg.com/736x/e5/73/04/e573041fd771c40f7b4993df59f03f68.jpg";
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="profile">
          <div className="user">
            <div className="img">
              <img src={ig} alt="" />
            </div>
            <div className="details">
              <div className="name">Jr Genius Skills</div>
              <div className="username">@jrgeniuskills</div>
            </div>
          </div>
          {/* <div className="about">2.5 M + Followers</div> */}
        </div>
      </div>
      <div className="text">
        <a
          className="icon"
          href="https://www.instagram.com/jrgeniuskils/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
                     <img src={ig} alt="" />

          <div className="text">Instagram</div>
        </a>
      </div>
    </div>
  );
};
