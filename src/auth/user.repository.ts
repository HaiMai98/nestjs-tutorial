import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthDto } from "./dto/auth.dto";
import { BadRequestException } from "@nestjs/common";
import * as bcrypt from 'bcrypt';

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authDto: AuthDto): Promise <void>{
        const {username, password} = authDto;
        const salt = await bcrypt.genSalt();
        console.log('SALT =============> ', salt);
        //Manual errorhandling way
        // const exist = this.findOne({username});
        // if (exist){
        //     // throw error;
        // }
        const user = new User();
        user.username = username;
        user.salt = salt;
        user.password = await this.hashPassword(password, salt);
        console.log('Hashed password ===========================> ', user.password);
        try{
            await user.save();
        }catch (error){
            console.log('ERROR CODE =============>', error.code);
            if (error.code === 'EREQUEST'){ //duplicate username
                throw new BadRequestException('User already exist');
            } 
        }
    }
    async validatePassword(authDto: AuthDto): Promise <string>{
        const {username, password} = authDto;
        const user = await this.findOne({username}); 
        if (user && await user.validatePassword(password)){
            return user.username;
        } else {
            return null;
        }
    }
    private async hashPassword (password: string, salt: string){
        return await bcrypt.hash(password, salt);
    }
}