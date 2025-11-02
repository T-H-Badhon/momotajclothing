import Link from 'next/link';
import loginAction from 'src/components/actions/loginActions';
import Container from 'src/components/auth/Container';
import Form from 'src/components/ui/form';
import FormInput from 'src/components/ui/form/form-input';

export const metadata = { title: 'LOGIN' };

const Login = () => {
    return (
        <Container
            login={
                <div className="mx-auto max-h-[700px] w-full max-w-[450px] px-[17px] py-[40px] md:h-screen md:px-[40px] md:py-[75px]">
                    <div className="pb-5 text-center font-secondary text-[32.3px] uppercase md:text-[38px]">
                        <h1>Login</h1>
                    </div>
                    {/* <p className="mt-4 text-sm">
            Enter your email and password to login
          </p> */}
                    <Form
                        schema="login"
                        action={loginAction}
                        submitButton={{ label: 'Login' }}
                        initialValues={{ email: '', password: '' }}
                        footer={
                            <p className="pt-1 text-sm">
                                Don<span className="font-sans">&apos;</span>t
                                have an account?{' '}
                                <Link href="/signup">Sign up</Link>
                            </p>
                        }
                    >
                        <FormInput type="email" name="email" label="E-mail" />
                        <FormInput
                            type="password"
                            name="password"
                            label="Password"
                        >
                            <p className="absolute inset-0 my-auto ml-auto mr-3.5 size-max cursor-pointer text-xs transition-all duration-300 hover:text-black">
                                Forgot your password?
                            </p>
                        </FormInput>
                    </Form>
                </div>
            }
        />
    );
};

export default Login;
