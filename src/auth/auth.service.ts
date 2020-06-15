import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.model';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository,
        private jwtService: JwtService,
    ){}

    signUp(authDto: AuthDto): Promise <void>{
        return this.userRepository.signUp(authDto);
    }

    async signIn (authDto: AuthDto): Promise <{accessToken: string}> {
        const username = await this.userRepository.validatePassword(authDto);
        console.log(username);
        if (!username){
            throw new UnauthorizedException('Invalid credentials');
        }
        const payload: JwtPayload = {username} ;
        const accessToken = await this.jwtService.sign(payload);
        return {accessToken};
    }
}
