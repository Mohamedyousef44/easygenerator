import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from './schemas/user.schema';

@Injectable()
export class UsersService {
    private readonly logger = new Logger(UsersService.name);

    constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) { }

    async create(userData: Partial<User>): Promise<UserDocument> {
        this.logger.log(`Creating new user: ${userData.email}`);
        const createdUser = new this.userModel(userData);
        const savedUser = await createdUser.save();
        this.logger.log(`User created with ID: ${savedUser._id}`);
        return savedUser;
    }

    async findByEmail(email: string): Promise<UserDocument | null> {
        this.logger.debug(`Looking up user by email: ${email}`);
        return this.userModel.findOne({ email }).exec();
    }

    async findById(id: string): Promise<UserDocument | null> {
        this.logger.debug(`Looking up user by ID: ${id}`);
        return this.userModel.findById(id).select('-password').exec();
    }

    async findByIdWithRefreshToken(id: string): Promise<UserDocument | null> {
        this.logger.debug(`Looking up user with refresh token by ID: ${id}`);
        return this.userModel.findById(id).select('-password').exec();
    }

    async update(id: string, updateData: Partial<User>): Promise<UserDocument | null> {
        this.logger.debug(`Updating user: ${id}`);
        return this.userModel.findByIdAndUpdate(id, updateData, { new: true }).exec();
    }
}
