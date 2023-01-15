import { Controller, Get, Param,  } from '@nestjs/common';
import { userService } from './user.service';

@Controller('users')
export class UserController {
    constructor (private userService: userService ) {}
    //@Get()
    // getMe(): string {
        
    //     return this.userService.getHello();
    // }
}
