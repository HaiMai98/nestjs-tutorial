import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ){}

    signUp(authDto: AuthDto): Promise <void>{
        return this.userRepository.signUp(authDto);
    }
}
