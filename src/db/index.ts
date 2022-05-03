import { Sequelize } from "sequelize";
import { initCategories } from "./Category";
import { initNotes } from "./Note";


export const DB = new Sequelize('task3', 'user', 'admin', {
    host: '0.0.0.0',
    port: 54320,
    dialect: 'postgres'
});


export const CATEGORIES = initCategories(DB);
export const NOTES = initNotes(DB, CATEGORIES);