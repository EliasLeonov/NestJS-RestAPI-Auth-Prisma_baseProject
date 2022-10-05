import {Module} from "@nestjs/common";
import {DatabaseService} from "./prisma/database.service";
import {PrismaService} from "./prisma/prisma.service";
import {ConfigModule} from "./config.module";
import {AuthModule} from "./auth.module";

const databaseServiceProvider = {
    provide: DatabaseService,
    useClass: PrismaService,
};

@Module({
    imports: [ConfigModule, AuthModule],
    exports: [databaseServiceProvider, ConfigModule, AuthModule],
    providers: [databaseServiceProvider]
})
export class SharedModule {}
