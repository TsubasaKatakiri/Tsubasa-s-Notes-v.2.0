import { ChangeEvent, FC, useEffect, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { ReactComponent as Add } from '../../images/Add.svg';
import { setQuery } from '../../redux/notes-slice';
import { DialogNote } from '../dialog-note/dialog-note';
import { Modal } from '../modal/modal';

import classes from './controls-bar.module.scss';

export const ControlsBar : FC = () => {
    const { query } = useAppSelector((state) => state.note);
    const dispatch = useAppDispatch();
    const [ search, setSearch ] = useState<string>(query);
    const [ createOpen, setCreateOpen ] = useState<boolean>(false);

    const setNewQuery = (e : ChangeEvent<HTMLInputElement>) => {
        const text = e.target.value;

        dispatch(setQuery(text));
        setSearch(text);
    }

    useEffect(() => {
        setSearch(query);
    }, [query])

    return (
        <div className={classes.controls}>
            <input type='text' className={classes.searchBar} onChange={setNewQuery} value={search} placeholder='Search...'/>
            <button type='button' className={classes.button} onClick={() => setCreateOpen(true)}>
                <Add className={classes.buttonIcon}/>
            </button>
            {createOpen &&
                <Modal setOpen={setCreateOpen}>
                    <DialogNote setOpen={setCreateOpen}/>
                </Modal>
            }
        </div>
    );
};
