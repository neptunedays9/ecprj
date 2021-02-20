import { HttpModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './controller/app.controller';
import { DataService } from './data/data.service';
import { SortService } from './service/sort.service';
import { TrolleyService } from './service/trolley.service';
import { UserService } from './service/user.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    HttpModule
  ],
  controllers: [AppController],
  providers: [UserService, SortService, TrolleyService, DataService],
})
export class AppModule {}
