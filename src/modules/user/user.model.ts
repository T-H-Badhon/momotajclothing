import mongoose, { Model, Schema } from 'mongoose';

export interface IUser {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    role: string;
    createdAt: Date;
}

const userSchema: Schema<IUser> = new Schema<IUser>(
    {
        first_name: {
            type: String,
            required: true,
        },
        last_name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: 'admin',
        },
    },
    { timestamps: true, versionKey: false },
);

export type UserModel = Model<IUser>;

const User =
    (mongoose.models.User as UserModel) ||
    mongoose.model<IUser, UserModel>('User', userSchema);

export default User;
