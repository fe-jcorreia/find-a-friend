import { IUsersRepository } from "@src/repositories";
import { hash } from "bcryptjs";
import { User, UserCreateInput } from "@domain/model";
import { EmailAlreadyExistsError } from "@src/errors";

export class CreateUserUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  async exec(data: UserCreateInput): Promise<{ user: User }> {
    const passwordHash = await hash(data.password, 6);

    const sameEmailUser = await this.usersRepository.findByEmail(data.email);

    if (sameEmailUser) {
      throw new EmailAlreadyExistsError();
    }

    const user = await this.usersRepository.create({
      email: data.email,
      password: passwordHash,
      role: data.role,
    });

    return {
      user: {
        id: user.id,
        email: user.email,
        role: user.role,
        createdAt: user.created_at,
        updatedAt: user.updated_at,
      },
    };
  }
}
