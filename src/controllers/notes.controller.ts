import { Request, Response, NextFunction } from 'express';
import { NOTES_SERVICE, AddNoteParams, UpdateNoteParams } from '../services/notes.service';


export const getNotes = (req:Request, res:Response) => {
    
    const { isActive } = req.query;

    if (isActive === undefined) {
        
        return res.status(200)
            .json(NOTES_SERVICE.getNotes());

    } else if (isActive === 'true' || isActive === '1') {

        return res.status(200)
            .json(NOTES_SERVICE.getNotes(true));

    } else if (isActive === 'false' || isActive === '0') {

        return res.status(200)
            .json(NOTES_SERVICE.getNotes(false));

    } else {

        throw Error(`Wrong parameter isActive = '${isActive}'. It should be 'true' or 'false'.`)

    }
}

export const addNote = (req:Request<{}, {}, AddNoteParams, {}>, res:Response) => {
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
    
    const params:UpdateNoteParams = {
        ...req.body, 
        id: req.params.id,
        isActive: JSON.parse(req.body.isActive)
    } 

    if( NOTES_SERVICE.updateNote(params) ) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(404);
    }
}

export const getNotesStats = (req:Request, res:Response) => {
    return res.status(200).json(NOTES_SERVICE.getNotesStats());
}

