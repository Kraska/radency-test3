import { Express } from 'express';
import { getNotes, addNote, getNote, deleteNote, updateNote } from './controllers/notes.controller';

const routes = (app:Express) => {

    app.get('/api/notes', getNotes);

    app.post('/api/notes', addNote);

    app.get('/api/notes/:id', getNote)
    
    app.delete('/api/notes/:id', deleteNote)

    app.patch('/api/notes/:id', updateNote)

}

export default routes;