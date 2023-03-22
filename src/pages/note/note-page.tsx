import React, { FC, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { DialogDelete } from '../../components/dialog-delete/dialog-delete';
import { DialogNote } from '../../components/dialog-note/dialog-note';
import { Modal } from '../../components/modal/modal';
import { NoteCard } from '../../components/note-card/note-card';
import { Preloader } from '../../components/preloader/preloader';
import { Toast } from '../../components/toast/toast';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { clearNoteState, getSingleNote, сlearError, сlearMessage } from '../../redux/notes-slice';
import { CardMode } from '../../types/enums';

import classes from './note-page.module.scss';

export const NotePage : FC = () => {
    const { noteId } = useParams();
    const dispatch = useAppDispatch();
    const { note, isFetching, message, error } = useAppSelector((state) => state.note);
    const [ openDelete, setOpenDelete ]= useState<boolean>(false);
    const [ openEdit, setOpenEdit ]= useState<boolean>(false);
    const [ toastVisible, setToastVisible ] = useState<boolean>(false);

    useEffect(() => {
        if(noteId) dispatch(getSingleNote(noteId));

        const cleanup = () : void => {
            dispatch(clearNoteState())
        }

        return () : void => cleanup();
    }, [dispatch, noteId])

    useEffect(() => {
        if(error || message) setToastVisible(true);

        return () : void => {
            setToastVisible(false);
            if(error) dispatch(сlearError());
            if(message) dispatch(сlearMessage());
        }
    }, [error, message, dispatch]);

    return (
        <section className={classes.container}>
            {isFetching && <Preloader/>}
            {error && toastVisible && <Toast isError={true} text={error} setToastVisible={setToastVisible}/>}
            {message && toastVisible && <Toast isError={false} text={message} setToastVisible={setToastVisible}/>}
            <div className={classes.content}>
                <div className={classes.controlsBar}>
                    <Link to='/' className={classes.button}>Back</Link>
                    {note &&
                        <div className={classes.controls}>
                            <button type='button' className={classes.button} onClick={() => setOpenEdit(true)}>Edit</button>
                            <button type='button' className={classes.button} onClick={() => setOpenDelete(true)}>Delete</button>
                            {openDelete && <Modal setOpen={setOpenDelete}>
                                <DialogDelete id={note.id} title={note.title} setOpen={setOpenDelete}/>
                            </Modal>}
                            {openEdit && <Modal setOpen={setOpenEdit}>
                                <DialogNote id={note.id} title={note.title} text={note.text} tags={note.tags} setOpen={setOpenEdit}/>
                            </Modal>}
                        </div>
                    }
                </div>
                <div className={classes.noteContainer}>
                    {note && <NoteCard id={note.id} title={note.title} text={note.text} tags={note.tags} dateCreated={note.dateCreated} mode={CardMode.PRESENTATION}/>}
                </div>
            </div>
        </section>
    );
};
