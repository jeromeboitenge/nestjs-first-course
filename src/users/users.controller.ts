import { Body, Controller,Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { UsersService } from './users.service';
import { createUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';
import { isArray } from 'node:util';

@ApiTags('users ')
@Controller('users')
export class UsersController {
    constructor(private usersService:UsersService){}
    @ApiOkResponse({type:User,isArray: true})
    @Get()
    getUsers():User[]{
        return this.usersService.findAll()
    }
    @ApiOkResponse({type:User,isArray:true})
    @ApiQuery({name:'name',required:false})
    @Get()
    getByName(@Query('name') name?:string):User[]{
        return this.usersService.findByName(name)
    }
    @ApiOkResponse({type:User,description:'The user'})
    @ApiNotFoundResponse()
    @Get(':id')

    getUsersById(@Param('id',ParseIntPipe)id:number):User{
        //todo auto parse id
 console.log(typeof id)
        const user=this.usersService.findById(id)
        if(!user){
            throw new NotFoundException()
        }
        
        return user

    }
    @ApiCreatedResponse({type:User})
    @Post()
    createUser(@Body() body:createUserDto):User{
        return this.usersService.createUser(body);
    }

}
