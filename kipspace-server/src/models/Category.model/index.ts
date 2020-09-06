import { Model, model } from 'mongoose';
import { composeWithMongoose } from 'graphql-compose-mongoose';
import { CategorySchema } from './schema';
import { ICategory } from './types';

const Category: Model<ICategory> = model('Category', CategorySchema);

const CategoryTC = composeWithMongoose(Category);

export * from './types';
export { CategoryTC };
export default Category;
