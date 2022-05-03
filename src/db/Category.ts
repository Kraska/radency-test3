import { 
    Sequelize, 
    DataTypes, 
    Model, 
    InferAttributes, 
    InferCreationAttributes, 
    CreationOptional 
} from "sequelize";


export class Category extends 
Model<InferAttributes<Category>, InferCreationAttributes<Category>> {
    declare id: CreationOptional<number>;
    declare title: string;
    declare iconName: string | null;
}


export const initCategories = (sequelize: Sequelize) => {
    return Category.init(
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
            iconName: {
                type: DataTypes.STRING
            },
        },
        { 
            timestamps: false,
            tableName: 'categories',
            sequelize
        }
    )
}