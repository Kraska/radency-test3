import { ICategory } from "./models/categories.model";
import { INote } from "./models/notes.model";

export const CATEGORIES:Record<string, ICategory> = {
    '1': {
      id: '1',
      title: 'Task',
      iconName: 'bi-card-list',
      activeNotes: 2,
      archivedNotes: 0,
    },
    '2': {
      id: '2',
      title: 'Random Thought',
      iconName: 'bi-shuffle',
      activeNotes: 1,
      archivedNotes: 0,
    },
    '3': {
      id: '3',
      title: 'Idea',
      iconName: 'bi-lightbulb',
      activeNotes: 2,
      archivedNotes: 0,
    },
  }; 
  
  
export const NOTES: INote[] = [
      {
        id: '1',
        title: 'Shopping list',
        created: new Date(),
        category: CATEGORIES['1'],
        content: 'Tomatoes, bread, ...',
        isActive: true,
      },
      {
        id: '2',
        title: 'The theory of evolution',
        created: new Date(),
        category: CATEGORIES['2'],
        content: '',
        isActive: true,
      },
      {
        id: '3',
        title: 'Books list',
        created: new Date(),
        category: CATEGORIES['3'],
        content: '',
       isActive: true,
      },
      {
        id: '4',
        title: 'New Future',
        created: new Date(),
        category: CATEGORIES['3'],
        content: '',
       isActive: true,
      },
      {
        id: '5',
        title: 'Some Task',
        created: new Date(),
        category: CATEGORIES['1'],
        content: 'some content',
        isActive: true,
      },
  ];