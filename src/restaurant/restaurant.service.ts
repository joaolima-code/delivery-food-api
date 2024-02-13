import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Restaurant, SimpleRestaurant } from './entities/restaurant.entity';
import { Repository } from 'typeorm';

@Injectable()
export class RestaurantService {
  constructor(
    @InjectRepository(Restaurant)
    private readonly restaurantRepository: Repository<Restaurant>,
  ) {}

  async findAll(): Promise<SimpleRestaurant[]> {
    return this.restaurantRepository.find();
  }

  async search(query: string): Promise<SimpleRestaurant[]> {
    return this.restaurantRepository
    .createQueryBuilder('restaurant')
    .leftJoinAndSelect('restaurant.foodProducts', 'foodProducts')
    .leftJoinAndSelect('restaurant.drinkProducts', 'drinkProducts')
    .where('restaurant.name LIKE :query', { query: `%${query}%` })
    .orWhere('foodProducts.name LIKE :query', { query: `%${query}%` })
    .orWhere('foodProducts.description LIKE :query', { query: `%${query}%` })
    .orWhere('drinkProducts.name LIKE :query', { query: `%${query}%` })
    .orWhere('drinkProducts.description LIKE :query', { query: `%${query}%` })
    .getMany();
  }

  async findOne(id: number): Promise<Restaurant> {
    return this.restaurantRepository.findOne({ where: { id: id }, relations: ['foodProducts', 'drinkProducts'] });
  }
}
