'use server';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import User from 'src/modules/user/user.model';
import connectMongo from 'src/utils/connect-mongo';

export default async function loginAction(data: {
    email: string;
    password: string;
}) {
    await connectMongo();

    // Check If User Is Exist
    const user = await User.findOne({ email: data.email });
    if (!user) {
        return {
            success: false,
            error: "Sorry, this email doesn't exist in our records. Please double-check your entry or sign up if you're new here.",
        };
    }

    // Check If User Password is Match
    if (
        !user.password ||
        !(await bcrypt.compare(data.password, user.password))
    ) {
        return {
            success: false,
            error: "Oops! The password you entered doesn't match our records. Please try again.",
        };
    }

    // We omit the password using destructuring
    const { password, ...cleanUserObject } = user.toObject();

    // Create Token & Set Token To Cookies
    const token = jwt.sign(
        { user: cleanUserObject },
        process.env.TOKEN_SECRET,
        { expiresIn: '30d' },
    );
    cookies().set('auth_token', token, { maxAge: 2592000 });

    redirect('/dashboard');
}
