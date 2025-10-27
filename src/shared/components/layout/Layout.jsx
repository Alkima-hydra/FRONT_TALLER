import { useState } from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout({ title, children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="font-display bg-background-light dark:bg-background-dark text-foreground-light dark:text-foreground-dark min-h-screen">
      <div className="flex min-h-screen">
        <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />
        <main className="flex-1 min-w-0">
          <Header title={title} onMenuClick={() => setSidebarOpen(true)} />
          <div className="p-4 sm:p-6">{children}</div>
        </main>
      </div>
    </div>
  );
}