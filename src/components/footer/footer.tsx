import { FC } from 'react';

import classes from './footer.module.scss';

export const Footer : FC = () => (
    <footer className={classes.footer}>
        <span className={classes.footerText}>Created as test task for IVASHIN</span>
        <span className={classes.footerText}>Handcrafted by&nbsp;
            <a href='https://github.com/TsubasaKatakiri' className={classes.footerLink}>Katakiri Tsubasa</a>
        </span>
    </footer>
);
