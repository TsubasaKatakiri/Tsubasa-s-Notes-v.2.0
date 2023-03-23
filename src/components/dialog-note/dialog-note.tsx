import { ChangeEvent, FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { SubmitHandler } from 'react-hook-form/dist/types';
import {v4} from 'uuid';

import { useAppDispatch } from '../../hooks/redux-hooks';
import { INoteInput } from '../../interface/INote';
import { INoteData } from '../../interface/INoteData';
import { addNote, editNote } from '../../redux/notes-slice';
import { getISODate } from '../../util/datetime-helpers';
import { extractTagsFromText, stringToTags, tagsToString } from '../../util/tag-helpers';
import { HighlightableTextarea } from '../highlightable-textarea/highlightable-textarea';

import classes from './dialog-note.module.scss'

interface IProps{
    id?: string,
    title?: string,
    text?: string,
    tags?: string[],
    setOpen: (open: boolean) => void,
}

export const DialogNote : FC<IProps> = ({id, title, text, tags, setOpen} : IProps) => {
    const dispatch = useAppDispatch();
    const [tagSet, setTagSet] = useState<string>(tags ? tagsToString(tags) : '');
    const { register, handleSubmit } = useForm<INoteInput>({
        defaultValues: {
            title: title || '',
            text: text || '',
            tags: tags ? tagsToString(tags) : ''
        }
    });

    const onSubmit : SubmitHandler<INoteInput> = async(data: INoteInput) => {
        const outputData : INoteData = {
            id: v4(),
            title: data.title,
            text: data.text,
            tags: tagSet ? stringToTags(tagSet.trim()) : undefined,
            dateCreated: getISODate(),
        }

        if(data.title && data.text){
            if(id) dispatch(editNote([id, outputData]));
            else dispatch(addNote(outputData));
            setOpen(false);
        }
    }

    const onChangeHandler = (e : ChangeEvent<HTMLTextAreaElement>) : void =>  {
        const textSample = e.target.value;

        setTagSet(extractTagsFromText(textSample));
    }

    return (
        <div className={classes.dialog}>
            <h3 className={classes.dialogHeader}>{id ? 'Update note' : 'Create new note'}</h3>
            <form className={classes.dialogForm} onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.dialogField}>
                    <label htmlFor='title' className={classes.dialogLabel}>Note title (required)</label>
                    <input type='text' className={classes.dialogInput} placeholder='Enter note title' {...register('title')}/>
                </div>
                <div className={classes.dialogField}>
                    <label htmlFor='text' className={classes.dialogLabel}>Note text (required)</label>
                    <HighlightableTextarea name='text' text={text} register={register} onChange={onChangeHandler} tagList={tagSet}/>
                </div>
                <div className={classes.dialogField}>
                    <label htmlFor='title' className={classes.dialogLabel}>Note tags</label>
                    <input type='text' className={classes.dialogInput} placeholder='Note tags will appear here' disabled={!id} {...register('tags')}  value={tagSet} onChange={(e) => setTagSet(e.target.value)}/>
                </div>
                <div className={classes.dialogControls}>
                    <button type='submit' className={classes.button}>{id ? 'Update note' : 'Create note'}</button>
                    <button type='button' className={classes.button} onClick={() => setOpen(false)}>Cancel</button>
                </div>
            </form>
        </div>
    );
};
