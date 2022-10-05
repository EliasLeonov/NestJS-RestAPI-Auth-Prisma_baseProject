import {Injectable, NotFoundException} from '@nestjs/common';
import {UserService} from "../../user/user.service";
import * as bcrypt from 'bcrypt';
import {LoginDto} from "../../user/dto/login.dto";
import {User} from "../../user/entities/user.entity";
import {JwtService} from "@nestjs/jwt";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtTokenService: JwtService,
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.userService.findByEmail(email);
        if (user && await bcrypt.compare(password, user.password)) {
                delete user.password;
                return user;
        }
        return null;
    }

    async login(loginDto: LoginDto) {
        const email: string = loginDto.email;
        const password: string = loginDto.password;
        const user: User = await this.validateUser(email, password);
        if (!user) throw new NotFoundException(`User email or password incorrect`);
        return this.generateUserCredentials(user);
    }

    async generateUserCredentials(user: User) {
        const payload = {
            role: user.role,
            email: user.email,
            sub: user.id,
        };
        return {
            accessToken: this.jwtTokenService.sign(payload, {privateKey: process.env.JWT_SECRET}),
        }
    }
}
