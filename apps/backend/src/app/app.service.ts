import { Injectable } from '@nestjs/common';
import { DatabaseService } from './database';

@Injectable()
export class AppService {
  constructor(private readonly databaseService: DatabaseService){}
  getData(): { message: string } {
    return { message: 'Hello API' };
  }

  async createUser(){
    const user = await this.databaseService.user.create({data: {
      email: 'nnaemeka@email22.com',
      name: 'Nnaemeka Obi'
    }})
      
    return user
  }
}
