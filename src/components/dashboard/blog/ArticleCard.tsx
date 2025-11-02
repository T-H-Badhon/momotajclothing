import Image from 'next/image';
import { BottomToTop } from 'src/components/ui/animation';
import { Link } from 'src/components/ui/link';
import Overlay from 'src/components/ui/overlay';

export default function ArticleCard({
    _id,
    index,
    title,
    image,
    category,
    excerpt,
    hidden,
}: {
    _id: string;
    index: number;
    image: string;
    category: string;
    title: string;
    excerpt: string;
    hidden?: boolean;
}) {
    return (
        <BottomToTop
            index={index}
            className={`space-y-4 ${hidden ? 'sm:hidden lg:block' : ''}`}
        >
            <div className="group relative h-60 overflow-hidden rounded">
                <Image
                    src={process.env.NEXT_PUBLIC_MEDIA + image}
                    alt=""
                    fill
                    style={{
                        transition:
                            'transform 8s cubic-bezier(.25,.46,.45,.94)',
                    }}
                    className="object-cover object-center group-hover:scale-125"
                />
                <Overlay />
            </div>
            <div className="flex flex-col gap-2">
                <h6 className="text-muted-foreground">{title}</h6>
                <h4>{title}</h4>
                <p className="line-clamp-4 text-sm">{excerpt}</p>

                <Link
                    href={`/news/${_id}`}
                    variant="underline"
                    className="w-max"
                >
                    Read More
                </Link>
            </div>
        </BottomToTop>
    );
}
