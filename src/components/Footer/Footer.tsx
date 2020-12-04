import React from 'react';
import { CivicusIcon, CreativeCommonsIcon, GitHubIcon } from 'images';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logos">
        <a href="https://creativecommons.org">
          <img src={CreativeCommonsIcon} alt="Creative Commons" />
        </a>
        <a href="https://www.IcCivicusIcon.org">
          <img src={CivicusIcon} alt="Civicus" width="80px" height="80px" />
        </a>
        <a href="https://github.com">
          <img src={GitHubIcon} alt="GitHub" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
