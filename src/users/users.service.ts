import { Injectable } from '@nestjs/common';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
    private users:User[]=[{id:0,name:'boitenge'},{id:1,name:'Jerome'}]
    findAll(){
        return this.users;
    }
    findById(userId:number):User{
        return this.users.find(user=>user.id ===userId )
    }
    createUser(createUserDto:createUserDto):User{
        const newUser={id:Date.now(),...createUserDto};
        this.users.push(newUser)
        return newUser;  
    }
}
