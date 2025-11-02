import User from 'src/modules/user/user.model';

import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import connectMongo from 'src/utils/connect-mongo';

export const metadata = { title: 'SIGN UP' };

export default function RegisterPage() {
    const action = async (data: {
        first_name: string;
        last_name: string;
        email: string;
        password: string;
    }) => {
        'use server';

        await connectMongo();

        // Check If User Is Exist
        const userExist = await User.findOne({ email: data.email });

        if (userExist) {
            return {
                success: false,
                error: 'This email address is already associated with an account. If this account is yours, you can reset your password',
            };
        }

        // Create New User
        const hashedPassword = await bcrypt.hash(data.password, 12);

        const user = new User({ ...data, password: hashedPassword });
        // console.log(user);
        const result = await user.save();

        if (!result) {
            return {
                success: false,
                error: 'Something went wrong! Filed to create user please try again',
            };
        }

        // We omit the password using destructuring
        const { password, ...cleanUserObject } = result.toObject();

        // Create Token & Set Token To Cookies
        const token = jwt.sign(
            { user: cleanUserObject },
            process.env.TOKEN_SECRET,
            { expiresIn: '30d' },
        );
        cookies().set('auth_token', token, { maxAge: 2592000 });

        redirect('/dashboard');
    };

    return (
        <div className="screen-h mx-auto flex max-w-md flex-col items-center justify-center pb-10 text-center">
            {/* <div className="pt-10 font-secondary text-[32.3px] uppercase md:text-[38px] text-center">
                <h1>Sign up</h1>
            </div> */}

            {/* <Form
                action={action}
                schema="signup"
                submitButton={{ label: "Create Account" }}
                initialValues={{ first_name: "", last_name: "", email: "", password: "" }}
                footer={
                    <p className="pt-1 text-sm">
                        Already have an account? <Link href="/login">Login</Link>
                    </p>
                }
            >
                <FormInput name="first_name" label="First Name" />
                <FormInput name="last_name" label="Last Name" />
                <FormInput type="email" name="email" label="E-mail" />
                <FormInput type="password" name="password" label="Password" />
            </Form> */}
        </div>
    );
}
