import { FC } from 'react';
import { Link } from 'react-router-dom';

import classes from './header.module.scss';

export const Header : FC = () => (
    <header className={classes.header}>
        <Link to='/notes' className={classes.headerTitle}>Tsubasa&apos;s Notes v.2.0</Link>
    </header>
);
