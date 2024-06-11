import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from "@/components/Header/Header.jsx";
import Footer from "@/components/Footer/Footer.jsx";

import './Layout.scss'

const Layout = () => {
  return (
    <div className={`layout`}>
        <Header/>
        <Outlet />
       <Footer/>
    </div>
  );
};

export default Layout;
