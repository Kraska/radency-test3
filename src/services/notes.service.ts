import { INote } from "../models/notes.model";
import { NOTES } from '../init-data';
import { v4 } from 'uuid';
import { CATEGORIES } from "../init-data";
import { ICategory } from "../models/categories.model";


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

export type NotesState = Record<
        string, // categoryId
        {
            category: ICategory, 
            activeNotes: number,
            archivedNotes: number
        }>;

class NotesService {

    notes: INote[];

    constructor(notes: INote[]) {
        this.notes = notes;
    }

    
    getNotes = (isActive?: boolean):INote[] => {
        
        if (isActive === undefined) {
            return this.notes;
        } else  {
            return this.notes
                .filter(note => note.isActive === isActive ? true : false);
        }
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

    getNotesStats = () => {

        const notesStats:NotesState = Object.values(CATEGORIES)
            .reduce<NotesState>((stateMap, cat) => ({
                ...stateMap, 
                [cat.id]: {category: cat, activeNotes: 0, archivedNotes: 0}
            }), {});
    
        this.getNotes()
            .forEach(({category: {id}, isActive}) => {
                if(isActive) {
                    notesStats[id].activeNotes++;
                } else {
                    notesStats[id].archivedNotes++;
                }
            });

        return Object.values(notesStats);
    }

}

export const NOTES_SERVICE:NotesService = new NotesService(NOTES);