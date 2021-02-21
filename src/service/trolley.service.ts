import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Trolley } from '../types/trolley';
import { DataService } from '../data/data.service';


@Injectable()
export class TrolleyService {
    constructor(private readonly dataService: DataService) { }

    /**
     * calculates the total on the trolley
     * @param trolley 
     */
    calculateTrolleyTotal(trolley: Trolley): Observable<number> {
        return this.dataService.calculateTrolleyTotal(trolley);

        //TODO - add the calculation logic here instead of calling the api
    }

}