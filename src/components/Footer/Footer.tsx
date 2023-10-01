import React from 'react';
import { CreativeCommonsIcon, GitHubIcon } from 'images';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-logos">
        <a href="https://creativecommons.org/licenses/by-sa/4.0/">
          <img src={CreativeCommonsIcon} alt="Creative Commons" />
        </a>
        <a href="https://github.com/tinkery-tech/digicomp-perpendio">
          <img src={GitHubIcon} alt="GitHub" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
