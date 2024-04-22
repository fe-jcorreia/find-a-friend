import { prisma } from "@src/data/prisma";
import { IAddressesRepository } from "../addresses-repository.interface";

export class PrismaAddressesRepository implements IAddressesRepository {
  async findById(id: string) {
    const address = await prisma.address.findUniqueOrThrow({ where: { id } });

    return address;
  }
}
