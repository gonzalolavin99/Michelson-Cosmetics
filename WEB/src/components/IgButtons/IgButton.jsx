import React from "react";
import "./igButton.css";

export const IgButton = () => {
  const ig =
    "https://i.pinimg.com/originals/fa/39/00/fa390044775d75d12f13719dad8dca5c.jpg";
  return (
    <div className="tooltip-container">
      <div className="tooltip">
        <div className="profile">
          <div className="user">
            <div className="img">
              <img src={ig} alt="" />
            </div>
            <div className="details">
              <div className="name">Ignacia Michelson</div>
              <div className="username">@lamichelson11</div>
            </div>
          </div>
          <div className="about">2.5 M + Followers</div>
        </div>
      </div>
      <div className="text">
        <a
          className="icon"
          href="https://www.instagram.com/lamichelson11/?hl=es"
          target="_blank"
          rel="noopener noreferrer"
        >
         <img src={ig} alt="" className="img-insta" />
          <div className="text">Instagram</div>
        </a>
      </div>
    </div>
  );
};
