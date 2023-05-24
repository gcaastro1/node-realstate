import { AppDataSource } from '../../data-source'
import { Category } from '../../entities'
import AppError from '../../errors'
import 'dotenv/config'
import {
  iCategory,
  iCategoryCreate,
  iCategoryRead,
  iCategoryRepo,
} from '../../interfaces'
import { allCategoriesSchema, categorySchema } from '../../schemas'

const create = async (payload: iCategoryCreate): Promise<iCategory> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category)

  const findCategory: Category | null = await categoryRepo.findOne({
    where: {
      name: payload.name,
    },
  })

  if (findCategory) throw new AppError('Category already exists', 409)

  const category: iCategory = await categoryRepo.save(payload)

  return categorySchema.parse(category)
}

const read = async (): Promise<iCategoryRead> => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category)

  const categories: Array<Category> = await categoryRepo.find({})

  return allCategoriesSchema.parse(categories)
}

const readProperties = async (categoryId: number) => {
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category)

  const findCategory: Category | null = await categoryRepo.findOne({
    where: {
      id: categoryId,
    },
  })

  if (!findCategory) throw new AppError('Category not found', 404)

  const properties = await categoryRepo.findOne({
    where: {
      id: categoryId,
    },
    relations: {
      realEstate: true,
    },
  })

  return properties
}

export default { create, read, readProperties }
