type NavItemProps = {
    category: string;
    path: string;
    subcategory?: {
        item?: string;
        path: string;
    }[];
};

export const leftNavItems: NavItemProps[] = [
    {
        category: 'women',
        path: '/collections/women_yoga-sets',
        subcategory: [
            {
                item: 'yoga sets',
                path: '/collections/women_yoga-sets',
            },
            {
                item: 'sports bra',
                path: '/collections/women_sports-bra',
            },
            {
                item: 't-shirts & tops',
                path: '/collections/women_t-shirts-&-tops',
            },
            {
                item: 'shorts',
                path: '/collections/women_shorts',
            },
            {
                item: 'tennis & golf wear',
                path: '/collections/women_tennis-&-golf-wear',
            },
            {
                item: 'bodysuit & jumpsuit',
                path: '/collections/women_bodysuit-&-jumpsuit',
            },
            {
                item: 'jackets',
                path: '/collections/women_jackets',
            },
            {
                item: 'sweatshirt & hoodies',
                path: '/collections/women_sweatshirt-&-hoodies',
            },
            {
                item: 'sweatpants',
                path: '/collections/women_sweatpants',
            },
            {
                item: 'swimwear',
                path: '/collections/women_swimwear',
            },
        ],
    },
    {
        category: 'men',
        path: '/collections/men_vest',
        subcategory: [
            {
                item: 'vest',
                path: '/collections/men_vest',
            },
            {
                item: 't-shirts & tops',
                path: '/collections/men_t-shirts-&-tops',
            },
            {
                item: 'shorts',
                path: '/collections/men_shorts',
            },
            {
                item: 'jogger wear',
                path: '/collections/men_jogger-wear',
            },
            {
                item: 'gym fitness sets',
                path: '/collections/men_gym-fitness-sets',
            },
            {
                item: 'sweatshirt & hoodies',
                path: '/collections/men_sweatshirt-&-hoodies',
            },
            {
                item: 'sweatpants',
                path: '/collections/men_sweatpants',
            },
        ],
    },
    {
        category: 'kids',
        path: '/collections/kids_yoga-wear',
        subcategory: [
            {
                item: 'yoga wear',
                path: '/collections/kids_yoga-wear',
            },
            {
                item: 'swimwear',
                path: '/collections/kids_swimwear',
            },
            {
                item: 'sweatshirt & hoodies',
                path: '/collections/kids_sweatshirt-&-hoodies',
            },
            {
                item: 'sweatpants',
                path: '/collections/kids_sweatpants',
            },
            {
                item: 'kids sets',
                path: '/collections/kids_kids-sets',
            },
        ],
    },
    {
        category: 'swimwear',
        path: '/collections/swimwear',
    },
];

export const rightNavItems: NavItemProps[] = [
    {
        category: 'about us',
        path: '/about',
    },
    {
        category: 'contact us',
        path: '/contact',
    }
];
