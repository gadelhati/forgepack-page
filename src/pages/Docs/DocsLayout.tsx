import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { DocsSidebar } from '../../components/DocsSidebar/DocsSidebar';
import './DocsLayout.css';

export function DocsLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="docs-layout">
      <button 
        className="sidebar-toggle"
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label="Toggle sidebar"
      >
        ☰ Menu
      </button>
      <DocsSidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <main className="docs-main">
        <div className="docs-content">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
