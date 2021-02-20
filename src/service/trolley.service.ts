import { Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { Trolley } from '../types/trolley';
import { DataService } from '../data/data.service';


@Injectable()
export class TrolleyService {
    constructor(private readonly dataService: DataService) { }

    calculateTrolleyTotal(trolley: Trolley): Observable<number> {
        return this.dataService.calculateTrolleyTotal(trolley);
    }

}