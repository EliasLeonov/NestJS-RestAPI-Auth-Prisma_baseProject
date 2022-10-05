import {Inject, Injectable} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {UserRepositoryI} from "./repository/user.repository.interface";
import {SALT_OR_ROUNDS} from "../shared/utils/constant";
import {BadRequestError} from "../shared/errors/errors";
import * as bcrypt from 'bcrypt';
import {User} from "./entities/user.entity";

@Injectable()
export class UserService {
  constructor(
      @Inject(UserRepositoryI) private readonly userRepository: UserRepositoryI,
  ) {}

  async createUser(createUserDto: CreateUserDto) {
    await this.checkEmailDoesNotExist(createUserDto.email);
    const passwordEncrypted: string = await this.encryptPassword(createUserDto.password);
    const birthdayParsed: Date = new Date(Date.parse(createUserDto.birthday))
    const user = {
      ...createUserDto,
      password: passwordEncrypted,
      birthday: birthdayParsed
    };
    return this.userRepository.save(user);
  }

  private async encryptPassword(password: string): Promise<string> {
    return await bcrypt.hash(password, SALT_OR_ROUNDS);
  }

  private async checkEmailDoesNotExist(email: string) {
    const user: User = await this.userRepository.findByEmail(email);
    if (user) throw new BadRequestError("User email already exist");
  }

  findAll() {
    return `This action returns all user`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findByEmail(email: string): Promise<User> {
    return await this.userRepository.findByEmail(email);
  }
}
