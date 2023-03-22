import { FC } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { deleteNote } from '../../redux/notes-slice';

import classes from './dialog-delete.module.scss';

interface IProps{
    id: string,
    title: string,
    setOpen: (open: boolean) => void,
}

export const DialogDelete : FC<IProps> = ({id, title, setOpen} : IProps) => {
    const { noteId } = useParams();
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    const handleDelete = () => {
        if( noteId ) navigate('/notes');
        dispatch(deleteNote(id));
        setOpen(false);
    }

    return (
        <div className={classes.dialog}>
            <h3 className={classes.dialogHeader}>Confirm deletion</h3>
            <p className={classes.dialogText}>Are you sure you want to delete &quot;{title}&quot;?</p>
            <div className={classes.dialogControls}>
                <button type='button' className={classes.button} onClick={handleDelete}>OK</button>
                <button type='button' className={classes.button} onClick={() => setOpen(false)}>Cancel</button>
            </div>
        </div>
    );
};
