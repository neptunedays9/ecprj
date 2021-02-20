import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from '../service/app.service';
import { mockUser } from '../mocks/user-data';
import { DataService } from '../data/data.service';

describe('AppController', () => {
  let appController: AppController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService, DataService],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  describe('user api tests', () => {
    beforeEach(() => {
        process.env.USER_NAME = Buffer.from(mockUser.name).toString('base64');
        process.env.USER_TOKEN = Buffer.from(mockUser.token).toString('base64');
    });

    it('should return the mock user"', () => {
      expect(appController.getUser()).toStrictEqual(mockUser);
    });
  });
});
