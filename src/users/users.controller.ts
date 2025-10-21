import { Body, Controller,Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('users ')
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    @Get()
    getUsers():User[]{
        return this.usersService.findAll()
    }
    @Get(':id')
    getUsersById(@Param('id')id:string):User{

        return this.usersService.findById(Number(id))
        

    }
    @Post()
    createUser(@Body() body:createUserDto):User{
        return this.usersService.createUser(body);
    }

}
