import { INote } from "../models/notes.model";
import { NOTES } from '../init-data';
import { v4 } from 'uuid';
import { CATEGORIES } from "../init-data";


export type AddNoteParams = {
    title: string,
    categoryId: string,
    content: string,
    date: Date | null
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

    addNote = ( { title, categoryId, content, date }: AddNoteParams) => {
        
        const note: INote = {
            id: v4(), 
            title,
            created: new Date(),
            category: CATEGORIES[categoryId],
            content,
            isActive: true,
            date: null,
            dates: []
        };
        
        this.notes.push(note);
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