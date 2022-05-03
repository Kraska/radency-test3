import { 
    Sequelize, 
    DataTypes, 
    Model, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional, 
    ModelStatic,
    ForeignKey
} from "sequelize";
import { Category } from "./Category";


export class Note extends Model<InferAttributes<Note>, InferCreationAttributes<Note>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare categoryId: ForeignKey<Category['id']>;;
    declare content: string;
    declare isActive: boolean;
}

export const initNotes = (sequelize: Sequelize, Category: ModelStatic<any>) => {
    const NoteInit = Note.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
                allowNull: false
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false
            },
            categoryId: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            content: {
                type: DataTypes.TEXT,
                allowNull: true
            },
            isActive: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            },
        },  
        { 
            tableName: 'notes',
            sequelize 
        }
    );

    Category.hasMany(Note, { sourceKey: 'id', foreignKey: 'categoryId' });

    return NoteInit;
}