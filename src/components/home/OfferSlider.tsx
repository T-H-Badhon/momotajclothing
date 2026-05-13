const items = [
    { bold: 'Free Shipping', light: 'On orders over TK 500 within Kushtia' },
    { bold: 'Easy Returns', light: 'Hassle-free 10-day returns & exchange' },
    { bold: 'Pay on Delivery', light: 'Cash on delivery available' },
    { bold: 'Custom Orders', light: 'Available for Panjabis, Sharis & 3-piece sets' },
];

const OfferSlider = () => {
    const doubled = [...items, ...items];

    return (
        <div className="overflow-hidden bg-[#111111] py-[10px]">
            <div className="flex animate-marquee whitespace-nowrap">
                {doubled.map((item, i) => (
                    <span
                        key={i}
                        className="mx-6 inline-flex items-center gap-2"
                    >
                        <span className="font-primary text-[10px] font-semibold uppercase tracking-[2.5px] text-[#F8F5EF]">
                            {item.bold}
                        </span>
                        <span className="text-[#9A7B4F]">—</span>
                        <span className="font-primary text-[10px] capitalize tracking-[1px] text-[#F8F5EF]/70">
                            {item.light}
                        </span>
                        <span className="ml-4 text-[#9A7B4F]/40">◆</span>
                    </span>
                ))}
            </div>
        </div>
    );
};

export default OfferSlider;
