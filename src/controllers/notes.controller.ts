import { Request, Response, NextFunction } from 'express';
import { NOTES_SERVICE, AddNoteParams } from '../services/notes.service';


export const getNotes = (req:Request, res:Response) => {
    return res.status(200).json(NOTES_SERVICE.getNotes());
}

export const addNote = (req:Request<{}, {}, AddNoteParams, {}>, res:Response) => {

    console.log('addNote', req.body);
    NOTES_SERVICE.addNote(req.body)
    return res.sendStatus(200);
}

export const getNote = (req:Request, res:Response) => {
    const note = NOTES_SERVICE.getNote(req.params.id);
    if (note) {
        return res.status(200).json(note);
    } else {
        return res.status(404);
    }
}

export const deleteNote = (req:Request, res:Response) => {
    if (NOTES_SERVICE.deleteNote(req.params.id)) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(404);
    }
}

export const updateNote = (req:Request, res:Response) => {
    console.log(req.body);
    return res.send(req.params);
}

