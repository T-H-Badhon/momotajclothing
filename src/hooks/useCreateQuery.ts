import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useCallback } from 'react';

export default function useCreateQuery() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    const createQueryString = useCallback(
        (name: string, value: any) => {
            // Convert ReadonlyURLSearchParams to a string and create a new mutable URLSearchParams
            const params = new URLSearchParams(searchParams.toString());
            params.set(name, value);
            if (name !== 'page') {
                params.delete('page');
            }
            return params.toString();
        },
        [searchParams],
    );

    return (name: string, value: any) => {
        router.push(pathname + '?' + createQueryString(name, value));
    };
}
