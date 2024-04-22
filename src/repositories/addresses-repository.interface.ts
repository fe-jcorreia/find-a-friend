import { Address } from "@prisma/client";

export interface IAddressesRepository {
  findById(id: string): Promise<Address>;
}
