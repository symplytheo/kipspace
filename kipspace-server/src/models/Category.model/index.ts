import { Model, model } from 'mongoose';
import { CategorySchema } from './schema';
import { ICategory } from './types';

const Category: Model<ICategory> = model('Category', CategorySchema);

export * from './types';
export default Category;
