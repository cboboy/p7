import React from 'react';

import Header from '../../components/public/Header';
import { Outlet } from 'react-router-dom';
import Footer from '../../components/public/Footer';

const layout = () => {
    return (
        <div className="layout">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
};

export default layout;