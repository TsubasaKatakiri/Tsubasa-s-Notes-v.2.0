import { FC, ReactNode, useEffect, useRef } from 'react';

import { useOutsideClick } from '../../hooks/use-outside-click';
import { ReactComponent as Close } from '../../images/Close.svg';

import classes from './modal.module.scss';

interface IProps{
    setOpen: (open : boolean) => void,
    children?: ReactNode
}

export const Modal : FC<IProps> = ({setOpen, children} : IProps) => {
    const modalRef = useRef<HTMLDivElement>(null);

    useOutsideClick(modalRef, () => setOpen(false));

    useEffect(() => {
        document.body.classList.add(classes.noscroll);

        return () : void => document.body.classList.remove(classes.noscroll);
    }, [])

    return (
        <div className={classes.wrapper}>
            <div className={classes.modal} ref={modalRef}>
                <button type='button' className={classes.button} onClick={() => setOpen(false)}>
                    <Close className={classes.buttonIcon}/>
                </button>
                { children }
            </div>
        </div>
    );
};
