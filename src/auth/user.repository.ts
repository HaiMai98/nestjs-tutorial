import { Repository, EntityRepository } from "typeorm";
import { User } from "./user.entity";
import { AuthDto } from "./dto/auth.dto";
import { BadRequestException } from "@nestjs/common";

@EntityRepository(User)
export class UserRepository extends Repository<User>{
    async signUp(authDto: AuthDto): Promise <void>{
        const {username, password} = authDto;
        // const exist = this.findOne({username});
        // if (exist){
        //     // throw error;
        // }
        const user = new User();
        user.username = username;
        user.password = password;
        try{
            await user.save();
        }catch (error){
            console.log('ERROR CODE =============>', error.code);
            if (error.code === 'EREQUEST'){ //duplicate username
                throw new BadRequestException('User already exist');
            } 
        }
        
    }
}