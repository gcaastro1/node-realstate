import { Repository } from 'typeorm'
import { z } from 'zod'
import { Address, RealEstate } from '../../entities'
import {
  addressSchema,
  createAddressSchema,
  createPropertySchema,
  returnPropertySchema,
} from '../../schemas'

export type iRealEstateRepo = Repository<RealEstate>
export type iPropertyCreate = z.infer<typeof createPropertySchema>
export type iProperty = z.infer<typeof returnPropertySchema>
export type iAddressRepo = Repository<Address>
export type iAddressCreate = z.infer<typeof createAddressSchema>
export type iAddress = z.infer<typeof addressSchema>
