import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from '../components/Header/Header';
import './DocsPageLayout.css';

export function DocsPageLayout() {
  return (
    <div className="docs-page-layout">
      <Header />
      <Outlet />
    </div>
  );
}
