import { HttpModule } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { of } from 'rxjs';
import { mockUser } from '../mocks/user-mock';
import { DataService } from '../data/data.service';
import { mockProducts } from '../mocks/products-mock';
import { SortService } from '../service/sort.service';
import { SortOptions } from '../types/sort-options';
import { mockShopperHistory } from '../mocks/shopper-mock';

describe('SortService', () => {
    let sortService: SortService;
    let app: TestingModule;

    beforeEach(async () => {
        process.env.USER_TOKEN = Buffer.from(mockUser.token).toString('base64');
        app = await Test.createTestingModule({
            imports: [HttpModule],
            providers: [SortService, DataService],
        }).compile();

        sortService = app.get<SortService>(SortService);        
    });

    describe('sort tests', () => {

        beforeEach(() => {
        });

        it('should sort the products list based on price low to high if the sort option is Low"', async () => {
            const dataService = app.get(DataService);
            jest.spyOn(dataService, 'getAllProducts').mockReturnValue(of(mockProducts));

            const sortedProducts = await sortService.getProducts(SortOptions.PRICE_LOW_TO_HIGH).toPromise();
            expect(sortedProducts).toStrictEqual([
                {
                    "name": "Test Product C",
                    "price": 10.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product A",
                    "price": 99.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product B",
                    "price": 101.99,
                    "quantity": 0
                },

            ]);
        });

        it('should sort the products list based on name if the sort option is Ascending"', async () => {
            const dataService = app.get(DataService);
            jest.spyOn(dataService, 'getAllProducts').mockReturnValue(of(mockProducts));

            const sortedProducts = await sortService.getProducts(SortOptions.NAME_ASCENDING).toPromise();
            expect(sortedProducts).toStrictEqual([
                {
                    "name": "Test Product A",
                    "price": 99.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product B",
                    "price": 101.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product C",
                    "price": 10.99,
                    "quantity": 0
                },
            ]);
        });

        it('should sort the products list based on name if the sort option is Descending', async () => {
            const dataService = app.get(DataService);
            jest.spyOn(dataService, 'getAllProducts').mockReturnValue(of(mockProducts));

            const sortedProducts = await sortService.getProducts(SortOptions.NAME_DESCENDING).toPromise();
            expect(sortedProducts).toStrictEqual([
                {
                    "name": "Test Product C",
                    "price": 10.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product B",
                    "price": 101.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product A",
                    "price": 99.99,
                    "quantity": 0
                }
            ]);
        });

        it('should sort the products list based on popularity if the sort option is Recommended"', async () => {
            const dataService = app.get(DataService);
            jest.spyOn(dataService, 'getAllProducts').mockReturnValue(of(mockProducts));
            jest.spyOn(dataService, 'getShopperHistory').mockReturnValue(of(mockShopperHistory));

            const sortedProducts = await sortService.getProducts(SortOptions.RECOMMENDED).toPromise();
            expect(sortedProducts).toStrictEqual([
                {
                    "name": "Test Product B",
                    "price": 101.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product A",
                    "price": 99.99,
                    "quantity": 0
                },
                {
                    "name": "Test Product C",
                    "price": 10.99,
                    "quantity": 0
                }
            ]);
        });
    });
});