export type ProductDataProps = {
    id: string | number;
    name: string;
    details: string;
    p_image1: string;
    p_image2: string;
    slide_image: string[];
    sizes: string[];
    price: string;
};

export const productsData: ProductDataProps[] = [
    {
        id: 1,
        name: 'Lorem ipsum dolor sit amet',
        details:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae atque veniam, dolor minus delectus repellendus quam sint libero distinctio!',
        p_image1: '/home/product6.webp',
        p_image2: '/home/product5.webp',
        slide_image: [
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
        ],
        sizes: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
        price: '1990.00',
    },
    {
        id: 2,
        name: 'Lorem ipsum dolor sit amet',
        details:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae atque veniam, dolor minus delectus repellendus quam sint libero distinctio!',
        p_image1: '/home/product3.webp',
        p_image2: '/home/product4.webp',
        slide_image: [
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
        ],
        sizes: [
            'xxs',
            'xs (Pre-Order)',
            's',
            'm',
            'l',
            'xl (Pre-Order)',
            'xxl',
            'xxxl',
        ],
        price: '1990.00',
    },
    {
        id: 3,
        name: 'Lorem ipsum dolor sit amet',
        details:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae atque veniam, dolor minus delectus repellendus quam sint libero distinctio!',
        p_image1: '/home/product6.webp',
        p_image2: '/home/product5.webp',
        slide_image: [
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
        ],
        sizes: ['xxs', 'xs', 's', 'm', 'l', 'xl', 'xxl', 'xxxl'],
        price: '1990.00',
    },
    {
        id: 4,
        name: 'Lorem ipsum dolor sit amet',
        details:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae atque veniam, dolor minus delectus repellendus quam sint libero distinctio!',
        p_image1: '/home/product3.webp',
        p_image2: '/home/product4.webp',
        slide_image: [
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
        ],
        sizes: [
            'xxs',
            'xs (Pre-Order)',
            's',
            'm',
            'l',
            'xl (Pre-Order)',
            'xxl',
            'xxxl',
        ],
        price: '1990.00',
    },
    {
        id: 5,
        name: 'Lorem ipsum dolor sit amet',
        details:
            'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Laborum molestiae atque veniam, dolor minus delectus repellendus quam sint libero distinctio!',
        p_image1: '/home/product6.webp',
        p_image2: '/home/product5.webp',
        slide_image: [
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
            '/home/product1.avif',
            '/home/product2.avif',
            '/home/product3.webp',
            '/home/product4.webp',
        ],
        sizes: [
            'xxs',
            'xs (Pre-Order)',
            's',
            'm',
            'l',
            'xl (Pre-Order)',
            'xxl',
            'xxxl',
        ],
        price: '1990.00',
    },
];
