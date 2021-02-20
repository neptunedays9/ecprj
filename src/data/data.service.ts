import { Injectable } from "@nestjs/common";
import { User } from "src/types/user";

@Injectable()
export class DataService {
    constructor() {}

    getUser() : User {
        return  {
            name : Buffer.from(process.env.USER_NAME, 'base64').toString('ascii'),
            token : Buffer.from(process.env.USER_TOKEN, 'base64').toString('ascii')
        }
    }

}