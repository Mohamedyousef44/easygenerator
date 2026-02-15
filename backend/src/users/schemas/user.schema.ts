import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Role } from '../../auth/enums/role.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
    @Prop({ required: true, unique: true, index: true })
    email: string;

    @Prop({ required: true, minlength: 3 })
    name: string;

    @Prop({ required: true })
    password: string;

    @Prop({ type: String, default: null })
    refreshToken: string | null;

    @Prop({ required: true, enum: Role, default: Role.CUSTOMER, index: true })
    role: Role;
}

export const UserSchema = SchemaFactory.createForClass(User);
