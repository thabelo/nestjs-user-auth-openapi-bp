import { Controller, Get, Post, Body, Param, UseGuards } from '@nestjs/common';

import { UsersService } from './users.service';
import { CreateUserDto } from './create-user.dto';
import { ApiBearerAuth, ApiBody, ApiHeader, ApiOperation } from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiBearerAuth('access-token')
@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}


  // New User - Swagger code 
  @ApiOperation({
    summary: "New user"
  })
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Auth Token',
  // })
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
            email: { type: 'string' },
            password: { type: 'string' },
        },
    }
  })
  /**
  * Create new user
  */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  // @ApiOperation({
  //   summary: "Get user"
  // })
  // @ApiHeader({
  //   name: 'Authorization',
  //   description: 'Auth Token',
  // })

  @Get(':id')
  show(@Param('id') id: string) {
    return this.usersService.showById(+id);
  }
}