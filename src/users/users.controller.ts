import { Body, Controller, Get, HttpException, HttpStatus, Param, Post, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiBearerAuth, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { User } from './entities/user.entity';
import { GetTokenValues } from 'src/decorators/token.decorator';
import { TokenDto } from 'src/auth/dto/auth.dto';
const bcrypt  = require('bcrypt')

@ApiTags('User')
@Controller('user')
export class UsersController {
  constructor(private readonly userService: UsersService) {}

  @Post()
  @ApiOkResponse({ description: 'Cadastro'})
  async create(@Body() data: CreateUserDto): Promise<User> {
      const salt    = bcrypt.genSaltSync()
      data.password = bcrypt.hashSync(data.password, salt)
      return this.userService.create(data).then(result=>{
          return result
      }).catch(error => {
          throw new HttpException( error.message, error.status );
      })
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get('/me')
  @ApiOkResponse({ description: 'Retornar dados do meu usuario'})
  async findById(@GetTokenValues() token: TokenDto): Promise<User> {
    const userId = token.data.id;

    return this.userService.findById(userId)
      .then(user => {
        if (!user) {
          throw new HttpException('User not found', HttpStatus.NOT_FOUND);
        }
        return user;
      })
      .catch(error => {
        throw new HttpException(error.message, error.status);
      });
  }
}
