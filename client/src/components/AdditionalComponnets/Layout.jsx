import React from 'react';
import { Outlet } from 'react-router-dom';

import { Header } from './Header';
import Footer from './Footer';
import image from "@/components/ui/Image.jsx";

const Layout = () => {
  return (
    <>
      <Header />
      <div style={{backgroundImage:""}} className="mx-auto flex min-h-screen max-w-screen-xl flex-col">
        <Outlet />
      </div>
      <Footer />
    </>
  );
};

export default Layout;
