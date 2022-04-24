import { Request, Response } from 'express';
import { NoFieldError, WrongFieldValueError } from '../error.types';
import { NOTES_SERVICE, AddNoteParams, UpdateNoteParams } from '../services/notes.service';


const handleError = (e: Error, res:Response) => {

    const errorClasses = [NoFieldError.name, WrongFieldValueError.name];

    if ( errorClasses.includes(e.constructor.name)) {
        return res.status(400)
            .json({error: e.message});
    } else {
        //todo залогировать
        return res.status(500);
    }
}

const parseIsActive = (isActive: any): boolean | undefined => {

    if (isActive === undefined) {
        return undefined;
    } else if (isActive === 'true') { 
        return true;
    } else if (isActive === 'false') {
        return false;
    } else {
        throw new WrongFieldValueError(
            `Wrong value isActive = '${isActive}'. It should be 'true' or 'false'.`);
    }
}

export const getNotes = (req:Request, res:Response) => {
    
    let notes;
    try {
        const isActive = parseIsActive(req.query.isActive);
        notes = NOTES_SERVICE.getNotes(isActive);
    } catch (e) {
        return handleError((e as Error), res);
    }
    
    return res.status(200).json(notes);
}


export const addNote = (req:Request<{}, {}, AddNoteParams, {}>, res:Response) => {

    try {
        NOTES_SERVICE.addNote(req.body);
    } catch (e) {
        return handleError((e as Error), res);
    }
    
    return res.sendStatus(200);
}


export const getNote = (req:Request, res:Response) => {
    const note = NOTES_SERVICE.getNote(req.params.id);
    if (note) {
        return res.status(200).json(note);
    } else {
        return res.sendStatus(404);
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
    
    let isUpdated;
    try {

        const params:UpdateNoteParams = {
            ...req.body, 
            id: req.params.id,
            isActive: parseIsActive(req.body.isActive)
        } 
        isUpdated = NOTES_SERVICE.updateNote(params);

    } catch (e) {
        return handleError((e as Error), res);
    }

    if(isUpdated) {
        return res.sendStatus(200);
    } else {
        return res.sendStatus(404);
    }
}

export const getNotesStats = (req:Request, res:Response) => {
    return res.status(200).json(NOTES_SERVICE.getNotesStats());
}

export const get404 = (req:Request, res:Response) => {
    return res.sendStatus(404);
}
