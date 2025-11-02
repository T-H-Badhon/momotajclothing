import jwt, { JwtPayload } from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { TUser } from 'src/types';

export type TokenPayload = { user: TUser } & JwtPayload;

export default function gettoken() {
    const token = cookies().get('auth_token');

    if (!token || !token.value) {
        return null;
    } else {
        const data = jwt.verify(
            token?.value,
            process.env.TOKEN_SECRET,
        ) as TokenPayload;
        if (!data?.user?._id) {
            return null;
        } else {
            return data;
        }
    }
}
