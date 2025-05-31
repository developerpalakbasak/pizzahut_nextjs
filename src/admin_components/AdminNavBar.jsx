"use client";
import Link from 'next/link';
import React from 'react';
import AdminDesktopMenu from './AdminDesktopMenu';

const AdminNavBar = () => {
  return (
    <div className="fixed top-0 left-0 w-full z-10 flex justify-center">
      <nav className="w-full px-4">
        <div className="w-full max-w-5xl rounded-xl flex items-center justify-between bg-secondary mt-2 px-4 py-2 min-h-[2.5rem] sm:min-h-[3rem] mx-auto">
          {/* Logo Title */}
          <div className="text-xl font-bold logo flex items-center">
            <Link href="/">
              <span className="text-primary">Pizza</span>Hut
            </Link>
          </div>

          {/* Desktop menu */}
          <div>
            <AdminDesktopMenu />
          </div>
        </div>
      </nav>
    </div>
  );
};

export default AdminNavBar;
