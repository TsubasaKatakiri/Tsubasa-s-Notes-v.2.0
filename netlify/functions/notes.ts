import { Handler, HandlerEvent } from "@netlify/functions";
import notes from '../../db.json';
import fs from 'fs';

const handler: Handler = async (event: HandlerEvent) => {
    const pathId : string | undefined = (event.path.split('/')).pop() !== 'notes' ? (event.path.split('/')).pop() : undefined;
    const httpMethod = event.httpMethod;
    const body = event.body;

    switch(httpMethod){
        case 'GET':
            if(pathId){
                const value = notes.notes.find(note => note.id === pathId);
                return {
                    statusCode: 200,
                    body: JSON.stringify(value),
                };
            } else {
                return {
                    statusCode: 200,
                    body: JSON.stringify(notes),
                };
            }
        case 'POST':
            if(body){
                fs.readFile('db.json', (err, data)=>{
                    const contents = JSON.parse(data.toString('utf-8'));
                    const insertBody = JSON.parse(body);
                    contents.notes.push(insertBody);
                    fs.writeFile('db.json', JSON.stringify(contents), () => {})
                });
                return {
                    statusCode: 200,
                    body: 'Note successfully added',
                };
            } else {
                return {
                    statusCode: 400,
                    body: 'Note add failed',
                };
            }
        case 'PUT':
            if(body && pathId){
                fs.readFile('db.json', (err, data)=>{
                    const contents = JSON.parse(data.toString('utf-8'));
                    const insertBody = JSON.parse(body);
                    const newContents = {notes: contents.notes.map(item => item.id === pathId ? insertBody : item)};
                    fs.writeFile('db.json', JSON.stringify(newContents), () => {})
                });
                return {
                    statusCode: 200,
                    body: 'Note successfully edited',
                };
            } else {
                return {
                    statusCode: 400,
                    body: 'Note edit failed',
                };
            }
        case 'DELETE':
            if(pathId){
                fs.readFile('db.json', (err, data)=>{
                    const contents = JSON.parse(data.toString('utf-8'));
                    const newContents = {notes: contents.notes.filter(item => item.id !== pathId)};
                    fs.writeFile('db.json', JSON.stringify(newContents), () => {})
                });
                return {
                    statusCode: 200,
                    body: 'Note successfully deleted',
                };
            } else {
                return {
                    statusCode: 400,
                    body: 'Note deletion failed',
                };
            }
        default: {
            return {
                statusCode: 200,
                body: JSON.stringify(notes),
            };
        }
    }
};

export { handler };
