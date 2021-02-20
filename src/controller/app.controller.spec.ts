import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { mockUser } from '../mocks/user-mock';
import { DataService } from '../data/data.service';
import { SortService } from '../service/sort.service';
import { TrolleyService } from '../service/trolley.service';
import { UserService } from '../service/user.service';
import { AppController } from './app.controller';
import { SortOptions } from '../types/sort-options';
import { of } from 'rxjs';
import { mockProducts } from '../mocks/products-mock';
import { mockTrolley, mockTrolleyTotal } from '../mocks/trolley-mock';

describe('AppController', () => {
  let appController: AppController;
  let app: TestingModule;

  beforeEach(async () => {
    process.env.USER_NAME = Buffer.from(mockUser.name).toString('base64');
    process.env.USER_TOKEN = Buffer.from(mockUser.token).toString('base64');

    app = await Test.createTestingModule({
      imports: [HttpModule],
      controllers: [AppController],
      providers: [UserService, SortService, TrolleyService, DataService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('user api tests', () => {

    beforeEach(() => {
    });

    it('should return the mock user"', () => {
      expect(appController.getUser()).toStrictEqual(mockUser);
    });
  });

  describe('sort tests', () => {
    it('should return the sorted list if the option is Low"', async () => {
      const sortService = app.get(SortService);
      const getProducts = jest.spyOn(sortService, 'getProducts').mockReturnValue(of(mockProducts));

      const products = await appController.getProducts(SortOptions.PRICE_LOW_TO_HIGH).toPromise();
      expect(products).toStrictEqual(mockProducts);
    });
  });

  describe('trolleyTotal tests', () => {
    it('should return the trolleyTotal"', async () => {
      const trolleyService = app.get(TrolleyService);
      const calculateTrolleyTotal = jest.spyOn(trolleyService, 'calculateTrolleyTotal').mockReturnValue(of(mockTrolleyTotal));

      const products = await appController.calculateTrolleyTotal(mockTrolley).toPromise();
      expect(products).toStrictEqual(mockTrolleyTotal);
    });
  });
});
