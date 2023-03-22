import { FC, useEffect } from 'react';

import { ReactComponent as Spinner } from '../../images/Preloader.svg';

import classes from './preloader.module.scss';

const Preloader : FC = () => {
    useEffect(() => {
        document.body.classList.add(classes.noscroll);

        return () : void => document.body.classList.remove(classes.noscroll);
    }, [])

    return (
        <div className={classes.preloaderBackground} data-test-id='loader'>
            <Spinner className={classes.preloaderSpinner}/>
        </div>
    );
};

export { Preloader };
