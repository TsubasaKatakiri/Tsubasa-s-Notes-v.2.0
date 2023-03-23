import axios from 'axios';

import { INoteData } from '../interface/INoteData';

const prodMode = process.env.NODE_ENV === 'production'

const BASE_URL = prodMode ? '.netlify/functions/' : 'http://localhost:5000/'

const instance = axios.create({
    baseURL: BASE_URL,
})

export const NoteAPI = {
    async getNotes(){
        const response = await instance.get('notes');

        return prodMode ? response.data.notes : response.data;
    },
    async getSingleNote(noteId: string){
        const response = await instance.get(`notes/${noteId}`);

        return response.data;
    },
    async addNote(data : INoteData){
        const response = await instance.post('notes', data);

        return response.data;
    },
    async editNote(id: string, data : INoteData){
        const response = await instance.put(`notes/${id}`, data);

        return response.data;
    },
    async deleteNote(id: string){
        const response = await instance.delete(`notes/${id}`);

        return response.data;
    },
}
