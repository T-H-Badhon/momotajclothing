'use client';

import { Fragment } from 'react';
import {
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
} from 'src/components/ui/dropdown-menu';
import useCreateQuery from 'src/hooks/useCreateQuery';
import useDeleteQuery from 'src/hooks/useDeleteQuery';

const sorts = [
    { name: 'Default', value: '' },
    { name: 'Women', value: 'women' },
    { name: 'Men', value: 'men' },
    { name: 'Kids', value: 'kids' },
    { name: 'Swimwear', value: 'swimwear' },
];

export default function ShopSort({ searchParams }: any) {
    const createQuery = useCreateQuery();
    const deleteQuery = useDeleteQuery();
    const category = searchParams?.category ? searchParams.category : '';

    return (
        <DropdownMenuContent>
            {sorts.map(({ name, value }, idx) => (
                <Fragment key={value}>
                    <DropdownMenuItem asChild>
                        <p
                            className={
                                category === value ? 'text-blue-400' : ''
                            }
                            onClick={() =>
                                value === category
                                    ? deleteQuery('category')
                                    : createQuery('category', value)
                            }
                        >
                            {name}
                        </p>
                    </DropdownMenuItem>
                    {idx + 1 !== sorts.length && <DropdownMenuSeparator />}
                </Fragment>
            ))}
        </DropdownMenuContent>
    );
}
