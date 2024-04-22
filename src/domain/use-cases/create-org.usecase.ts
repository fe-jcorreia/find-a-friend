import { IAddressesRepository, IOrgsRepository } from "@src/repositories";
import { hash } from "bcryptjs";
import { Org, OrgCreateInput } from "@domain/model";
import { EmailAlreadyExistsError } from "@src/errors";
import { Role } from "@prisma/client";

export class CreateOrgUseCase {
  constructor(
    private orgsRepository: IOrgsRepository,
    private addressesRepository: IAddressesRepository
  ) {}

  async exec(data: OrgCreateInput): Promise<{ org: Org }> {
    const passwordHash = await hash(data.password, 6);

    const sameEmailOrg = await this.orgsRepository.findByEmail(data.email);

    if (sameEmailOrg) {
      throw new EmailAlreadyExistsError();
    }

    const org = await this.orgsRepository.create({
      email: data.email,
      password: passwordHash,
      name: data.name,
      phone: data.phone,
      role: Role.ORG,
      address: {
        create: data.address,
      },
    });

    const orgAddress = await this.addressesRepository.findById(org.addressId);

    return {
      org: {
        id: org.id,
        email: org.email,
        name: org.name,
        phone: org.phone,
        role: org.role,
        createdAt: org.created_at,
        updatedAt: org.updated_at,
        address: {
          id: orgAddress.id,
          cep: orgAddress.cep,
          street: orgAddress.street,
          number: orgAddress.number,
          neighborhood: orgAddress.neighborhood,
          complement: orgAddress.complement ?? undefined,
          city: orgAddress.city,
          state: orgAddress.state,
          createdAt: orgAddress.created_at,
          updatedAt: orgAddress.updated_at,
        },
      },
    };
  }
}
