import { redirect } from 'next/navigation';
import gettoken from './gettoken';

export default function isAdmin(Component: any) {
    return function IsAuth(props: any) {
        const token = gettoken();

        if (!token) {
            redirect('/login');
        } else if (token?.user?.role === 'admin') {
            return <Component {...props} />;
        } else {
            redirect('/');
        }
    };
}
