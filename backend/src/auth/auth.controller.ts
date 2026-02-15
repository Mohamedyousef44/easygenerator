import { Body, Controller, Post, HttpCode, HttpStatus, UseGuards, Get, Request, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { RefreshTokenGuard } from './guards/refresh-token.guard';
import { ApiTags, ApiOperation, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
    private readonly logger = new Logger(AuthController.name);

    constructor(private readonly authService: AuthService) { }

    @ApiOperation({ summary: 'Register new user' })
    @ApiResponse({ status: 201, description: 'User created' })
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        this.logger.debug(`POST /auth/signup - Email: ${signupDto.email}`);
        return this.authService.signup(signupDto);
    }

    @ApiOperation({ summary: 'Login user' })
    @ApiResponse({ status: 200, description: 'User logged in' })
    @HttpCode(HttpStatus.OK)
    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        this.logger.debug(`POST /auth/signin - Email: ${signinDto.email}`);
        return this.authService.signin(signinDto);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Get user profile' })
    @ApiResponse({ status: 200, description: 'Return user profile' })
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@Request() req) {
        this.logger.debug(`GET /auth/profile - User: ${req.user.email}`);
        return req.user;
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Refresh access token' })
    @ApiResponse({ status: 200, description: 'Tokens refreshed' })
    @UseGuards(RefreshTokenGuard)
    @HttpCode(HttpStatus.OK)
    @Post('refresh')
    refreshTokens(@Request() req) {
        const userId = req.user.sub;
        const refreshToken = req.user.refreshToken;
        this.logger.debug(`POST /auth/refresh - User ID: ${userId}`);
        return this.authService.refreshTokens(userId, refreshToken);
    }

    @ApiBearerAuth()
    @ApiOperation({ summary: 'Logout user' })
    @ApiResponse({ status: 200, description: 'User logged out' })
    @UseGuards(JwtAuthGuard)
    @HttpCode(HttpStatus.OK)
    @Post('logout')
    logout(@Request() req) {
        const userId = req.user.userId;
        this.logger.debug(`POST /auth/logout - User ID: ${userId}`);
        return this.authService.logout(userId);
    }
}
