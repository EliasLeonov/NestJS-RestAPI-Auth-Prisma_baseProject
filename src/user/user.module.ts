import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import {UserRepositoryI} from "./repository/user.repository.interface";
import {UserRepository} from "./repository/user.repository";
import {SharedModule} from "../shared/shared.module";

const userRepositoryProvider = {
  provide: UserRepositoryI,
  useClass: UserRepository,
};

@Module({
  imports: [SharedModule],
  controllers: [UserController],
  providers: [UserService, userRepositoryProvider],
  exports: [UserService]
})
export class UserModule {}
