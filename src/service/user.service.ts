import { Injectable } from "@nestjs/common";
import { User } from "../types/user";

@Injectable()
export class UserService {
    getUser(): User {
        return {
            name: Buffer.from(process.env.USER_NAME, 'base64').toString('ascii'),
            token: Buffer.from(process.env.USER_TOKEN, 'base64').toString('ascii')
        }
    }
}

