import { FC, useEffect } from 'react';
import classNames from 'classnames';

import { ReactComponent as Close } from '../../images/Close.svg';

import classes from './toast.module.scss';

interface IProps{
    isError?: boolean,
    text: string,
    setToastVisible: (toastVisible : boolean) => void;
}

export const Toast : FC<IProps> = ({isError = false, text, setToastVisible} : IProps) => {
    useEffect(() => {
        setTimeout(() => setToastVisible(false), 3000);
    })

    return (
        <div className={classes.toastContainer}>
            <div className={classNames(classes.toast, isError && classes.error)} data-test-id='error'>
                <span className={classes.message}>{text}</span>
                <button type='button' className={classes.toastButton} onClick={() => setToastVisible(false)} data-test-id='alert-close'>
                    <Close className={classes.toastButtonIcon}/>
                </button>
            </div>
        </div>
    );
};
