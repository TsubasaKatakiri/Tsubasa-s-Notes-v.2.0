/* eslint-disable */

import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { PromiseState } from '../types/enums';
import { INoteData } from '../interface/INoteData';
import { NoteAPI } from '../api/notes-api';
import { RootState } from './store';

interface IThunkResolve{
    notes?: INoteData[],
    note?: INoteData,
    message?: string
}

const conditionalResponseBuilder = async (state: RootState, message?: string, noteId?: string) : Promise<IThunkResolve> => {
    if(state.note.note){
        const res : INoteData = await NoteAPI.getSingleNote(noteId || state.note.note.id);
        return { note: res, message: message || null } as IThunkResolve;
    } else {
        const res : INoteData[] = await NoteAPI.getNotes();
        return { notes: res, message: message || null } as IThunkResolve;
    }
}

const getNotes = createAsyncThunk<IThunkResolve, undefined, {rejectValue: string}>(
    'notes/getNotes',
    async(_, {rejectWithValue}) => {
        try {
            const res = await NoteAPI.getNotes();
            return { notes: res } as IThunkResolve;
        } catch (error : any) {
            return rejectWithValue('Something went wrong, please, try again later');
        }
    }
)

const getSingleNote = createAsyncThunk<IThunkResolve, string, {rejectValue: string}>(
    'notes/getSingleNote',
    async(noteId : string, {rejectWithValue}) => {
        try {
            const res = await NoteAPI.getSingleNote(noteId);
            return { note: res } as IThunkResolve;
        } catch (error : any) {
            return rejectWithValue('Something went wrong, please, try again later');
        }
    }
)

const addNote = createAsyncThunk<IThunkResolve, INoteData, {rejectValue: string}>(
    'notes/addNote',
    async(noteData : INoteData, {rejectWithValue}) => {
        try {
            await NoteAPI.addNote(noteData);
            const res : INoteData[] = await NoteAPI.getNotes();
            return { notes: res, message: 'New note added successfully!' } as IThunkResolve;
        } catch (error : any) {
            return rejectWithValue('Note creation failed. Please try again later');
        }
    }
)

const editNote = createAsyncThunk<IThunkResolve, [string, INoteData], {rejectValue: string, state: RootState}>(
    'notes/addNote',
    async([noteId, noteData], {rejectWithValue, getState}) => {
        const currentState = getState();
        try {
            await NoteAPI.editNote(noteId, noteData);
            return conditionalResponseBuilder(currentState, 'Note edited successfully!');
        } catch (error : any) {
            return rejectWithValue('Note edit failed. Please try again later');
        }
    }
)

const deleteNote = createAsyncThunk<IThunkResolve, string, {rejectValue: string}>(
    'notes/addNote',
    async(noteId, {rejectWithValue}) => {
        try {
            await NoteAPI.deleteNote(noteId);
            const res : INoteData[] = await NoteAPI.getNotes();
            return { notes: res, message: 'Note deleted successfully!' } as IThunkResolve;
        } catch (error : any) {
            return rejectWithValue('Note deletion failed. Please try again later');
        }
    }
)

interface INotesState{
    query: string,
    notes: null | INoteData[]
    note: null | INoteData,
    isFetching: boolean,
    error: null | string,
    message: null | string,
}

const initialState : INotesState = {
    query: '',
    notes: null,
    note: null,
    isFetching: false,
    error: null,
    message: null,
}

const notesSlice = createSlice({
    name: 'books',
    initialState,
    reducers: {
        setQuery: (state : INotesState, action) => {
            state.query = action.payload;
        },
        сlearError: (state : INotesState) => {
            state.error = null;
        },
        сlearMessage: (state : INotesState) => {
            state.message = null;
        },
        clearNotesState: (state: INotesState) => {
            state.notes = null;
            state.isFetching = false;
            state.error = null;
            state.message = null;
        },
        clearNoteState: (state: INotesState) => {
            state.note = null;
            state.isFetching = false;
            state.error = null;
            state.message = null;
        }
    },
    extraReducers: ( builder ) => {
        builder.addMatcher(action => action.type.endsWith(PromiseState.PENDING), (state : INotesState) => {
            state.isFetching = true;
            state.error = null;
            state.message = null;
        })
        .addMatcher(action => action.type.endsWith(PromiseState.FULFILLED), (state, action) => {
            state.isFetching = false;
            state.notes = action.payload.notes as INoteData[] || state.notes;
            state.note = action.payload.note as INoteData || state.note;
            state.message = action.payload.message as string || state.message;
            state.error = null;
        })
        .addMatcher(action => action.type.endsWith(PromiseState.REJECTED), (state, action) => {
            state.isFetching = false;
            state.error = action.payload as string;
            state.message = null;
        })
    }
})

const NotesReducer = notesSlice.reducer;

export const { setQuery, сlearError, сlearMessage, clearNotesState, clearNoteState } = notesSlice.actions;

export { NotesReducer, getNotes, getSingleNote, addNote, editNote, deleteNote };
