import { Request, Response } from 'express';
import { NoFieldError, WrongFieldValueError } from '../error.types';
import { CATEGORIES, NOTES } from '../db';
import { InferCreationAttributes } from 'sequelize/types';
import { Note } from '../db/Note';


const handleError = (e: Error, res:Response) => {

    const errorClasses = [NoFieldError.name, WrongFieldValueError.name];

    if ( errorClasses.includes(e.constructor.name)) {
        return res.status(400)
            .json({error: e.message});
    } else {
        //todo залогировать
        return res.status(500)
            .json({error: e.message});
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

export const getNotes = async (req:Request, res:Response) => {

    try {
        const notes = await NOTES.findAll();
        return res.status(200).json({notes});
    } catch (e) {
        return res.status(500)
            .json({error: (e as Error).message});
    }
}


export const addNote = async (req:Request<{}, {}, InferCreationAttributes<Note>, {}>, res:Response) => {

    try {
        await NOTES.create(req.body);
        return res.sendStatus(200);
    } catch (e) {
        return handleError((e as Error), res);
    }
}


export const getNote = async (req:Request, res:Response) => {

    try {
        const note = await NOTES.findOne({ where: { id: req.params.id } });
        if (note) {
            return res.status(200).json(note);
        } else {
            return res.sendStatus(404);
        }

    } catch (e) {
        return handleError((e as Error), res);
    }
}

export const deleteNote = async (req:Request, res:Response) => {
    try {

        const count = await NOTES.destroy({ where: { id: req.params.id } })

        if (count) {
            return res.sendStatus(200);
        } else {
            return res.sendStatus(404);
        }
    
    } catch (e) {
        return handleError((e as Error), res);
    }
}


export const updateNote = async (req:Request, res:Response) => {
    
    try {

        const note = await NOTES.findOne({ where: { id: req.params.id } });

        if (!note) {
            return res.sendStatus(404);
        }

        note.set({ 
            ...req.body, 
            isActive: parseIsActive(req.body.isActive) 
        });

        const newNote = await note.save();

        return res.status(200).json(newNote);

    } catch (e) {
        return handleError((e as Error), res);
    }
}

type NotesState = Record<number, 
        {
            categoryId: number, 
            activeNotes: number,
            archivedNotes: number
        }>;

export const getNotesStats = async (req:Request, res:Response) => {

    const categories = await CATEGORIES.findAll();
    
    const notesStats:NotesState = categories
        .reduce<NotesState>((stateMap, cat) => ({
            ...stateMap, 
            [cat.id]: {categoryId: cat.id, activeNotes: 0, archivedNotes: 0}
        }), {});

    (await NOTES.findAll())
        .forEach(({categoryId, isActive}) => {
            if(isActive) {
                notesStats[categoryId].activeNotes++;
            } else {
                notesStats[categoryId].archivedNotes++;
            }
        });

    return res.status(200).json(notesStats);
}

export const get404 = (req:Request, res:Response) => {
    return res.sendStatus(404);
}
