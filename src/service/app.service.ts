import { Injectable } from '@nestjs/common';
import { DataService } from '../data/data.service';
import { User } from '../types/user';

@Injectable()
export class AppService {
  constructor(private readonly dataService : DataService) {
  }

  getUser(): User {
    return this.dataService.getUser();
  }
}
