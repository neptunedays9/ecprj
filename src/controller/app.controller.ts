import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query } from '@nestjs/common';
import { Observable } from 'rxjs';
import { AppError } from 'src/error/app-error';
import { ErrorType } from 'src/error/error-types';
import { SortService } from '../service/sort.service';
import { TrolleyService } from '../service/trolley.service';
import { UserService } from '../service/user.service';
import { Product } from '../types/product';
import { SortOptions } from '../types/sort-options';
import { Trolley } from '../types/trolley';
import { User } from '../types/user';

@Controller()
export class AppController {
  constructor(
    private readonly userService: UserService,
    private readonly sortService: SortService,
    private readonly trolleyService: TrolleyService) { }

  @Get('user')
  getUser(): User { 
    return this.userService.getUser();
  }

  @Get('sort')
  getProducts(@Query('sortOption') sortOption: SortOptions): Observable<Product[]> {
    return this.sortService.getProducts(sortOption);
  }

  @Post('trolleyTotal')
  @HttpCode(HttpStatus.OK)
  calculateTrolleyTotal(@Body() trolley: Trolley): Observable<number> {
    return this.trolleyService.calculateTrolleyTotal(trolley);
  }
}
