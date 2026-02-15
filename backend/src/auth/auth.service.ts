import { Injectable, UnauthorizedException, BadRequestException, Logger } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
        private configService: ConfigService,
    ) { }

    async signup(signupDto: SignupDto) {
        const { email, password, name, role } = signupDto;
        this.logger.log(`Signup attempt for email: ${email}`);

        const existingUser = await this.usersService.findByEmail(email);
        if (existingUser) {
            this.logger.warn(`Signup failed: Email already in use - ${email}`);
            throw new BadRequestException('Email already in use');
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = await this.usersService.create({
            email,
            name,
            password: hashedPassword,
            role,
        });

        this.logger.log(`User created successfully: ${email} (ID: ${user._id}) with role: ${user.role}`);
        return {
            message: 'User created successfully',
            userId: user._id,
        };
    }

    async signin(signinDto: SigninDto) {
        const { email, password } = signinDto;
        this.logger.log(`Signin attempt for email: ${email}`);

        const user = await this.usersService.findByEmail(email);

        if (!user) {
            this.logger.warn(`Signin failed: User not found - ${email}`);
            throw new UnauthorizedException('Invalid credentials');
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
            this.logger.warn(`Signin failed: Invalid password - ${email}`);
            throw new UnauthorizedException('Invalid credentials');
        }

        this.logger.log(`User signed in successfully: ${email}`);
        const tokens = await this.getTokens(user._id.toString(), user.email, user.role);
        await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

        return tokens;
    }

    async refreshTokens(userId: string, refreshToken: string) {
        this.logger.log(`Refresh token attempt for user ID: ${userId}`);

        const user = await this.usersService.findById(userId);
        if (!user || !user.refreshToken) {
            this.logger.warn(`Refresh failed: User not found or no refresh token - ${userId}`);
            throw new UnauthorizedException('Access Denied');
        }

        const refreshTokenMatches = await bcrypt.compare(
            refreshToken,
            user.refreshToken,
        );

        if (!refreshTokenMatches) {
            this.logger.warn(`Refresh failed: Invalid refresh token - ${userId}`);
            throw new UnauthorizedException('Access Denied');
        }

        this.logger.log(`Refresh tokens generated for user: ${user.email}`);
        const tokens = await this.getTokens(user._id.toString(), user.email, user.role);
        await this.updateRefreshToken(user._id.toString(), tokens.refresh_token);

        return tokens;
    }

    async logout(userId: string) {
        this.logger.log(`Logout for user ID: ${userId}`);
        await this.usersService.update(userId, { refreshToken: null as string | null });
    }

    private async getTokens(userId: string, email: string, role: string) {
        const payload = { sub: userId, email, role };

        const [accessToken, refreshToken] = await Promise.all([
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_ACCESS_SECRET') || 'fallback-access-secret',
                expiresIn: this.configService.get<string>('JWT_ACCESS_EXPIRES_IN') || '15m',
            } as any),
            this.jwtService.signAsync(payload, {
                secret: this.configService.get<string>('JWT_REFRESH_SECRET') || 'fallback-refresh-secret',
                expiresIn: this.configService.get<string>('JWT_REFRESH_EXPIRES_IN') || '7d',
            } as any),
        ]);

        return {
            access_token: accessToken,
            refresh_token: refreshToken,
        };
    }

    private async updateRefreshToken(userId: string, refreshToken: string) {
        const hashedRefreshToken = await bcrypt.hash(refreshToken, 10);
        await this.usersService.update(userId, {
            refreshToken: hashedRefreshToken,
        });
        this.logger.debug(`Refresh token updated for user ID: ${userId}`);
    }
}
