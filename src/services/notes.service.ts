import { INote } from "../models/notes.model";
import { NOTES } from '../init-data';
import { v4 } from 'uuid';
import { CATEGORIES } from "../init-data";


export type AddNoteParams = {
    title: string,
    categoryId: string,
    content: string,
}

export type UpdateNoteParams = {
    id: string,
    title: string,
    categoryId: string,
    content: string,
    isActive: boolean
}

class NotesService {

    notes: INote[];

    constructor(notes: INote[]) {
        this.notes = notes;
    }

    getNotes = ():INote[] => {
        return this.notes;
    }

    getNote = (id:string):INote | null => {
        return this.notes.find(note => note.id === id) || null;
    }

    addNote = ( { title, categoryId, content }: AddNoteParams) => {
        const note: INote = {
            id: v4(), 
            title,
            created: new Date(),
            category: CATEGORIES[categoryId],
            content,
            isActive: true,
        };
        this.notes.push(note);
    }

    updateNote = ( { 
        id, 
        title, 
        categoryId, 
        content, 
        isActive 
    }: UpdateNoteParams) => {

        const oldNote = NOTES_SERVICE.getNote(id);

        if (!oldNote) {
            return false;
        }

        const note: INote = {
            ...oldNote, 
            title, 
            category: CATEGORIES[categoryId],
            content,
            isActive,
        }

        this.notes = this.notes.map(item => item.id === id ? note : item);

        return true;
    }


    deleteNote = (id:string):boolean => {
        if (this.notes.find(note => note.id === id)) {
            this.notes = this.notes.filter(note => note.id !== id)
            return true;
        } else {
            return false
        }
    }

}

export const NOTES_SERVICE:NotesService = new NotesService(NOTES);