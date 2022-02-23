import { User } from "../../model/User";
import { IUsersRepository, ICreateUserDTO } from "../IUsersRepository";

class UsersRepository implements IUsersRepository {
  private users: User[];

  private static INSTANCE: UsersRepository;

  private constructor() {
    this.users = [];
  }

  public static getInstance(): UsersRepository {
    if (!UsersRepository.INSTANCE) {
      UsersRepository.INSTANCE = new UsersRepository();
    }

    return UsersRepository.INSTANCE;
  }

  create({ name, email }: ICreateUserDTO): User {
    const user = new User();

    Object.assign(user, {
      name,
      email,
      admin: false,
      created_at: new Date(),
      updated_at: new Date(),
    });

    this.users.push(user);

    return user;
  }

  findById(id: string): User | undefined {
    const idFetched = this.users.find((fetch) => fetch.id === id);
    return idFetched;
  }

  findByEmail(email: string): User | undefined {
    const emailFetched = this.users.find((fetch) => fetch.email === email);
    return emailFetched;
  }

  turnAdmin(receivedUser: User): User {
    const index = this.users.findIndex((user) => user.id === receivedUser.id);

    this.users[index] = { ...receivedUser, admin: true };

    return this.users[index];
  }

  list(): User[] {
    return this.users;
  }
}

export { UsersRepository };
