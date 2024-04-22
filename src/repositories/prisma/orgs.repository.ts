import { Org, Prisma } from "@prisma/client";
import { IOrgsRepository } from "../orgs-repository.interface";
import { prisma } from "@src/data/prisma";

export class PrismaOrgsRepository implements IOrgsRepository {
  async create(data: Prisma.OrgCreateInput): Promise<Org> {
    const org = await prisma.org.create({ data, include: { address: true } });
    return org;
  }

  async findByEmail(email: string) {
    const org = await prisma.org.findUnique({ where: { email } });

    return org;
  }
}
