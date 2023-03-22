import { FC, useState } from 'react';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { v4 } from 'uuid';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { ReactComponent as Delete } from '../../images/Delete.svg';
import { ReactComponent as Edit } from '../../images/Edit.svg';
import { ReactComponent as LockClosed } from '../../images/LockClosed.svg';
import { ReactComponent as LockOpen } from '../../images/LockOpen.svg';
import { INoteData } from '../../interface/INoteData';
import { setQuery } from '../../redux/notes-slice';
import { CardMode } from '../../types/enums';
import { formatDate } from '../../util/datetime-helpers';
import { DialogDelete } from '../dialog-delete/dialog-delete';
import { DialogNote } from '../dialog-note/dialog-note';
import { Modal } from '../modal/modal';

import classes from './note-card.module.scss';

interface IAdditionalAttributes {
    mode: CardMode;
}

export const NoteCard : FC<INoteData & IAdditionalAttributes> = ({id, title, text, tags, dateCreated, mode} : INoteData & IAdditionalAttributes) => {
    const dispatch = useAppDispatch();
    const [ blocked, setBlocked ] = useState<boolean>(true);
    const textStrings : string[] = text.split('\n');
    const [ openEdit, setOpenEdit ]= useState<boolean>(false);
    const [ openDelete, setOpenDelete ]= useState<boolean>(false)

    const setQueryString = (query: string) : void => {
        dispatch(setQuery(query));
    }

    return (
        <div className={classNames(classes.note, mode === CardMode.PRESENTATION && classes.presentation)}>
            {openEdit && <Modal setOpen={setOpenEdit}>
                <DialogNote id={id} title={title} text={text} tags={tags} setOpen={setOpenEdit}/>
            </Modal>}
            {openDelete && <Modal setOpen={setOpenDelete}>
                <DialogDelete id={id} title={title} setOpen={setOpenDelete}/>
            </Modal>}
            <span className={classes.noteDatetime}>{formatDate(dateCreated)}</span>
            <div className={classes.infoBlock}>
                <h3 className={classes.noteTitle}>{title}</h3>
                <div className={classes.noteTextContainer}>
                    <div className={classNames(classes.noteText, mode === CardMode.CARD && classes.noteTextCard)}>
                        {textStrings.map(string => <p key={v4()}>{string}</p>)}
                    </div>
                </div>
                <div className={classes.tagLine}>
                    {tags && tags.map(tag => <button type='button' key={v4()} className={classes.tag} onClick={() => setQueryString(tag)}>#{tag}</button>)}
                </div>
            </div>
            { mode === CardMode.CARD &&
                <div className={classes.controlBlock}>
                    <Link to={`/notes/${id}`} type='button' className={classNames(classes.button, classes.blue)}>
                        <span className={classes.buttonText}>View</span>
                    </Link>
                    <div className={classes.noteManipulation}>
                        <button type='button' className={classNames(classes.button, classes.buttonIcon, classes.green)} onClick={() => setBlocked(!blocked)}>
                            {blocked ? <LockOpen className={classes.icon}/> : <LockClosed  className={classes.icon}/>}
                        </button>
                        <button type='button' className={classNames(classes.button, classes.buttonIcon, classes.orange)} disabled={blocked} onClick={() => setOpenEdit(true)}>
                            <Edit  className={classes.icon}/>
                        </button>
                        <button type='button' className={classNames(classes.button, classes.buttonIcon, classes.red)} disabled={blocked} onClick={() => setOpenDelete(true)}>
                            <Delete  className={classes.icon}/>
                        </button>
                    </div>
                </div>
            }
        </div>
    );
};
