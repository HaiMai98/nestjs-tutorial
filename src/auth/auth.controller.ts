import { Controller, Post, Body, ValidationPipe, UseGuards, Req } from '@nestjs/common';
import { AuthDto } from './dto/auth.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(
        private authService: AuthService,
    ){}

    @Post('/signup')
    signUp(@Body(ValidationPipe) authDto: AuthDto): Promise <void>{
        console.log('DTO================>', authDto);
        return this.authService.signUp(authDto);
    }

    @Post('/signin')
    signIn(@Body(ValidationPipe) authDto: AuthDto): Promise <{accessToken: string}>{
        return this.authService.signIn(authDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@Req() req){
        console.log(req);
    }
}
