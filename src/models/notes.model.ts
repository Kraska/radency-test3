import { ICategory } from "./categories.model";


export interface INote {
    id: string,
    title: string,
    created: Date,
    category: ICategory,
    content: string,
    isActive: boolean,
    date: Date | null,
    dates: Date[]
}