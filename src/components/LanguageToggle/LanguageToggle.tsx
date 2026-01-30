import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import './LanguageToggle.css';

export function LanguageToggle() {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="language-toggle">
      <button
        className={`lang-btn ${language === 'en' ? 'active' : ''}`}
        onClick={() => setLanguage('en')}
        aria-label="English"
      >
        EN
      </button>
      <button
        className={`lang-btn ${language === 'pt' ? 'active' : ''}`}
        onClick={() => setLanguage('pt')}
        aria-label="Português"
      >
        PT
      </button>
    </div>
  );
}
