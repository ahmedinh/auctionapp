// SocialIcons.jsx
import React from 'react';
import TwitterIcon from './TwitterIcon';
import FacebookIcon from './FacebookIcon';
import InstagramIcon from './InstagramIcon';
import "./SocialIcons.scss";

const SocialIcons = ({className}) => {
  return (
    <div className="icons">
      <FacebookIcon />
      <InstagramIcon />
      <TwitterIcon />
    </div>
  );
};

export default SocialIcons;
