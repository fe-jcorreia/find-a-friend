import { Address, Org, Prisma, Role } from "@prisma/client";
import { IUsersRepository } from "../users-repository.interface";
import { randomUUID } from "node:crypto";

export class InMemoryUsersRepository implements IUsersRepository {
  public items: Org[] = [];
  public addresses: Address[] = [];

  async create(data: Prisma.OrgCreateInput) {
    const org = {
      id: randomUUID(),
      email: data.email,
      password: data.password,
      name: data.name,
      phone: data.phone,
      role: data.role ? data.role : Role.ORG,
      created_at: new Date(),
      updated_at: new Date(),
    };

    const addressToCreate = data.address.create;

    if (!addressToCreate) {
      throw new Error("Unable to create address");
    }

    const address = {
      id: randomUUID(),
      cep: addressToCreate.cep,
      street: addressToCreate.street,
      number: addressToCreate.number,
      neighborhood: addressToCreate.neighborhood,
      complement:
        addressToCreate.complement !== undefined
          ? addressToCreate.complement
          : null,
      city: addressToCreate.city,
      state: addressToCreate.state,
      created_at: new Date(),
      updated_at: new Date(),
    };

    this.items.push({ ...org, addressId: address.id });
    this.addresses.push(address);

    return org;
  }

  async findByEmail(email: string) {
    const user = this.items.find((item) => item.email === email);

    if (!user) {
      return null;
    }

    return user;
  }
}
