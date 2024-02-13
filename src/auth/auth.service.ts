import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateAuthDto, ReturnDataTokenDto } from './dto/auth.dto';
const bcrypt  = require('bcrypt')

@Injectable()
export class AuthService {
  constructor(@InjectRepository(User)
                private readonly userRepository: Repository<User>) {}

    async login(data: CreateAuthDto): Promise<any>{
        return this.userRepository.findOne({where: {email: data.email}}).then(async result=>{
            if(!result){
                return { status: "Usuario não encontrado" };
            }

            if(bcrypt.compareSync(data.password, result.password)){
                let returnData: ReturnDataTokenDto = result               
                return returnData
            } else {
                return { status: "Email ou senha invalido" }
            }      
        })
    }
}
