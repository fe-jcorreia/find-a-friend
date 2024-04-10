import { beforeEach, describe, expect, it } from "vitest";
import { CreateUserUseCase } from "./create-user.usecase";
import { InMemoryUsersRepository } from "@src/repositories/in-memory/in-memory-users.repository";
import { compare } from "bcryptjs";

let usersRepository: InMemoryUsersRepository;
let sut: CreateUserUseCase;

describe("User use case - Unit test", () => {
  beforeEach(() => {
    usersRepository = new InMemoryUsersRepository();
    sut = new CreateUserUseCase(usersRepository);
  });

  it("should be able to create an user", async () => {
    const { user } = await sut.exec({
      email: "johndoe@email.com",
      password: "a1234567",
    });

    expect(user.id).toEqual(expect.any(String));
    expect(user.email).toEqual("johndoe@email.com");
  });

  it("should be able to hash user password", async () => {
    await sut.exec({
      email: "johndoe@email.com",
      password: "a1234567",
    });

    const isPasswordCorrect = await compare(
      "a1234567",
      usersRepository.items[0].password
    );

    expect(isPasswordCorrect).toBeTruthy();
  });
});
