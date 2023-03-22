import React from 'react';
import { Outlet } from 'react-router-dom';

import { Footer } from '../footer/footer';
import { Header } from '../header/header';

import classes from './layout.module.scss';

const Layout = () => (
    <div className={classes.page}>
        <Header/>
        <main className={classes.main}>
            <Outlet/>
        </main>
        <Footer/>
    </div>
);

export { Layout };
