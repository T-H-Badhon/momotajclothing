'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export default async function action() {
    cookies().delete('auth_token');
    redirect('/login');
}
