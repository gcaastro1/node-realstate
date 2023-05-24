import { AppDataSource } from '../../data-source'
import { Address, Category, RealEstate } from '../../entities'
import AppError from '../../errors'
import 'dotenv/config'
import {
  iAddressRepo,
  iProperty,
  iPropertyCreate,
  iRealEstateRepo,
} from '../../interfaces/realEstate/realEstate.interface'
import { returnPropertySchema } from '../../schemas'
import { iCategoryRepo } from '../../interfaces'
import { returnManyPropertiesSchema } from '../../schemas/realEstate/realEstate.schema'

const create = async (payload: iPropertyCreate): Promise<iProperty> => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate)
  const addressRepo: iAddressRepo = AppDataSource.getRepository(Address)
  const categoryRepo: iCategoryRepo = AppDataSource.getRepository(Category)

  const findAddress: Address | null = await addressRepo.findOne({
    where: {
      street: payload.address.street,
      state: payload.address.state,
      number: payload.address.number || '',
      zipCode: payload.address.zipCode,
      city: payload.address.city,
    },
  })

  if (findAddress) throw new AppError('Address already exists', 409)

  const category: Category | null = await categoryRepo.findOne({
    where: {
      id: payload.categoryId,
    },
  })

  if (!category) throw new AppError('Category not found', 404)

  const address = addressRepo.create(payload.address)

  const newAddress = await addressRepo.save(address)

  const data = {
    value: payload.value,
    size: payload.size,
    address: newAddress,
    categoryId: category!.id,
  }

  const property = realEstateRepo.create(data)

  await realEstateRepo.save(property)

  const returnProperty = {
    ...property,
    category: category,
  }

  return returnPropertySchema.parse(returnProperty)
}

const read = async () => {
  const realEstateRepo: iRealEstateRepo =
    AppDataSource.getRepository(RealEstate)

  const properties: Array<RealEstate> = await realEstateRepo.find({
    relations: {
      address: true,
    },
  })
  return returnManyPropertiesSchema.parse(properties)
}

export default { create, read }
