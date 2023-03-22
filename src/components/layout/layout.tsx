import React from 'react';
import { Outlet } from 'react-router-dom';
import classes from './layout.module.scss';
import { Footer } from '../footer/footer';
import { Header } from '../header/header';

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
