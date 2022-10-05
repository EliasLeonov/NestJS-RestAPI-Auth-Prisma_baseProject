import {forwardRef, Module} from '@nestjs/common';
import { AuthService } from './auth/auth.service';
import {UserModule} from "../user/user.module";
import {PassportModule} from "@nestjs/passport";
import {JwtStrategy} from "./auth/jwt.strategy";
import {JwtModule} from "@nestjs/jwt";

@Module({
  imports: [
    forwardRef(() => UserModule),
    PassportModule,
    JwtModule.register({
      signOptions: { expiresIn: '1h' },
      secret: process.env.JWT_SECRET,
    }),],
  providers: [AuthService, JwtStrategy],
  exports: [AuthService],
})
export class AuthModule {}
