import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsEnum, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Role } from '../enums/role.enum';

export class SignupDto {
    @ApiProperty({ example: 'user@example.com' })
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @ApiProperty({ example: 'John Doe' })
    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    name: string;

    @ApiProperty({ example: 'StrongPassword1!' })
    @IsString()
    @IsNotEmpty()
    @MinLength(8)
    @Matches(/(?:(?=.*\d)|(?=.*\W+))(?:(?=.*[a-z])|(?=.*[A-Z])).*/, {
        message: 'password must contain at least 1 letter, 1 number, and 1 special character',
    })
    password: string;

    @ApiProperty({ example: 'CUSTOMER', enum: Role, required: false })
    @IsOptional()
    @IsEnum(Role)
    role?: Role;
}
