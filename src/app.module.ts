import { Module } from '@nestjs/common';
import { UserModule } from './user/user.module';
import {SharedModule} from "./shared/shared.module";
import { AuthModule } from './shared/auth.module';
import {APP_GUARD} from "@nestjs/core";
import {JwtAuthGuard} from "./shared/auth/jwt-auth.guard";



@Module({
  providers: [
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  imports: [UserModule, SharedModule], //AuthModule
})
export class AppModule {}
