import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class ChatDto {

    @IsNotEmpty()
    @IsString()
    name: string

}