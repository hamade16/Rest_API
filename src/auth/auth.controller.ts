import { Controller, Post, Body, ParseIntPipe } from "@nestjs/common";
import { AuthService } from "./auth.service";
import {AuthDto} from './dto';
//decoretor
@Controller("auth")
export class AuthController {
    constructor(private AuthService: AuthService) {}

    @Post('signup')
    signup(@Body() dto: AuthDto) {
        return this.AuthService.signup(dto);
    }
    @Post('signin')
    signin(@Body() dto: AuthDto) {
        return this.AuthService.signin(dto);
    }
}