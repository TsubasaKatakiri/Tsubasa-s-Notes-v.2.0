import { FC, useEffect, useState } from 'react';
import { v4 } from 'uuid';

import { ControlsBar } from '../../components/controls-bar/controls-bar';
import { NoteCard } from '../../components/note-card/note-card';
import { Preloader } from '../../components/preloader/preloader';
import { Toast } from '../../components/toast/toast';
import { useAppDispatch, useAppSelector } from '../../hooks/redux-hooks';
import { INoteData } from '../../interface/INoteData';
import { clearNotesState, getNotes, setQuery, сlearError, сlearMessage } from '../../redux/notes-slice';
import { CardMode } from '../../types/enums';

import classes from './main-page.module.scss'

export const MainPage : FC = () => {
    const dispatch = useAppDispatch();
    const { query, notes, isFetching, error, message } = useAppSelector((state) => state.note);
    const [ noteList, setNoteList ] = useState<null | INoteData[]>(null);
    const [ tagList, setTagList ] = useState<string[]>([]);
    const [ toastVisible, setToastVisible ] = useState<boolean>(false);

    useEffect(() => {
        dispatch(getNotes());

        const cleanup = () : void => {
            setNoteList(null);
            setTagList([]);
            dispatch(clearNotesState());
        }

        return () : void => cleanup();
    }, [dispatch])

    useEffect(() => {
        if(notes) {
            setNoteList(notes);
            const tagArr : string[] = [];

            notes.forEach(note => note.tags && tagArr.push(...note.tags));
            setTagList(Array.from(new Set(tagArr)));
        }
    }, [notes])

    useEffect(() => {
        if(notes){
            const filteredNotes = notes.filter(note => note.tags?.some(el => el.match(query ? new RegExp(`^(${query})`, 'gi') : '')));

            setNoteList(filteredNotes);
        }
    }, [query, notes])

    useEffect(() => {
        if(error || message) setToastVisible(true);

        return () : void => {
            setToastVisible(false);
            if(error) dispatch(сlearError());
            if(message) dispatch(сlearMessage());
        }
    }, [error, message, dispatch])

    const setQueryString = (queryString: string) => {
        dispatch(setQuery(queryString));
    }

    return (
        <section className={classes.container}>
            {error && toastVisible && <Toast isError={true} text={error} setToastVisible={setToastVisible}/>}
            {message && toastVisible && <Toast isError={false} text={message} setToastVisible={setToastVisible}/>}
            <div className={classes.content}>
                <ControlsBar/>
                {tagList &&
                    <div className={classes.tagList}>
                        {tagList.map(tag => <button type='button' key={v4()} className={classes.tag} onClick={() => setQueryString(tag)}>#{tag}</button>)}
                    </div>
                }
                <div className={classes.noteList}>
                    {isFetching && <Preloader/>}
                    {noteList && noteList.map(note =>
                        <NoteCard key={note.id} id={note.id} title={note.title} text={note.text} tags={note.tags} dateCreated={note.dateCreated} mode={CardMode.CARD}/>
                    )}
                </div>
            </div>
        </section>
    )
}
