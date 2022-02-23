import { User } from "../../model/User";
import { IUsersRepository } from "../../repositories/IUsersRepository";

interface IRequest {
  user_id: string;
}

class ListAllUsersUseCase {
  constructor(private usersRepository: IUsersRepository) {}

  execute({ user_id }: IRequest): User[] {
    const userFetch = this.usersRepository.findById(user_id);
    const users = this.usersRepository.list();
    console.log(userFetch);

    if (!userFetch) {
      throw new Error("User_ID não encontrado!");
    } else if (userFetch.admin === false) {
      throw new Error("Necessita ser Admin para acessar a listagem");
    } else {
      return users;
    }
  }
}

export { ListAllUsersUseCase };
