import { Controller, Get, Post, Body, Patch, Param, Delete, Query, UseGuards } from '@nestjs/common';
import { RestaurantService } from './restaurant.service';
import { Restaurant, SimpleRestaurant } from './entities/restaurant.entity';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('Restaurant')
@Controller('restaurant')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get()
  async findAll(@Query('query') query: string): Promise<SimpleRestaurant[]> {
    if(query) {
      return this.restaurantService.search(query);
    } else {
      return this.restaurantService.findAll();
    }
  }

  @UseGuards(AuthGuard('jwt'))
  @ApiBearerAuth('access-token')
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Restaurant> {
    return this.restaurantService.findOne(id);
  }
}
