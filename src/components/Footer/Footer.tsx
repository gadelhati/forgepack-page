import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../i18n/LanguageContext';
import './Footer.css';

export function Footer() {
  const { t } = useLanguage();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="logo-text">@forgepack</span>
          </Link>
          <p className="footer-description">{t.footer.description}</p>
        </div>

        <div className="footer-links">

          <div className="footer-column">
            <h4>{t.footer.resources}</h4>
            <ul>
              <li>
                <a href="https://www.npmjs.com/org/forgepack" target="_blank" rel="noopener noreferrer">
                  {t.footer.npmPackages}
                </a>
              </li>
              <li>
                <a href="https://www.npmjs.com/org/forgepack" target="_blank" rel="noopener noreferrer">
                  {t.footer.mavenPackages}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t.footer.community}</h4>
            <ul>
              <li>
                <a href="https://github.com/forgepack" target="_blank" rel="noopener noreferrer">
                  GitHub
                </a>
              </li>
              <li>
                <a href="https://twitter.com/forgepack" target="_blank" rel="noopener noreferrer">
                  {t.footer.twitter}
                </a>
              </li>
              <li>
                <a href="https://github.com/forgepack/page/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer">
                  {t.footer.contributing}
                </a>
              </li>
              <li>
                <a href="https://github.com/forgepack/page/blob/main/CODE_OF_CONDUCT.md" target="_blank" rel="noopener noreferrer">
                  {t.footer.codeOfConduct}
                </a>
              </li>
            </ul>
          </div>

          <div className="footer-column">
            <h4>{t.footer.legal}</h4>
            <ul>
              <li>
                <a href="https://github.com/forgepack/page/blob/main/LICENSE" target="_blank" rel="noopener noreferrer">
                  {t.footer.license}
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>{t.footer.copyright}</p>
      </div>
    </footer>
  );
}
