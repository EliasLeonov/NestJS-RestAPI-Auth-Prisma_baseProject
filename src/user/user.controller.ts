import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {isPublic} from "../shared/customDecorators/public.decorator";
import {JwtAuthGuard} from "../shared/auth/jwt-auth.guard";
import {LoginDto} from "./dto/login.dto";
import {AuthService} from "../shared/auth/auth.service";
import {Roles} from "../shared/customDecorators/role.decorator";
import {Role} from "../shared/enum/role";

@Controller('user')
export class UserController {
  constructor(
      private readonly userService: UserService,
      private readonly authService: AuthService,
  ) {}

  @isPublic()
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }

  @isPublic()
  @Post()
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Roles(Role.USER)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
