import Image from 'next/image';
import ArticleCard from 'src/components/dashboard/blog/ArticleCard';
import { BottomToTop } from 'src/components/ui/animation';
import { Button } from 'src/components/ui/button';
import Overlay from 'src/components/ui/overlay';
import Article from 'src/modules/blog/article.model';
import connectMongo from 'src/utils/connect-mongo';

export const revalidate = 0;

const News = async () => {
    await connectMongo();
    const articles = await Article.find().sort('-createdAt');

    const hasImage = articles[0]?.image;
    const imageUrl = hasImage
        ? process.env.NEXT_PUBLIC_MEDIA + articles[0].image
        : '/no-articles.jpg';
    const title = articles[0]?.title || 'No Article Available';
    const id = articles[0]?._id || '';

    return (
        <div className="mx-auto w-full max-w-[1450px] px-[17px] py-[40px] md:px-[40px] md:py-[75px]">
            <div className="pb-10 text-center font-secondary text-[32.3px] uppercase md:text-[38px]">
                <h1>Latest news</h1>
            </div>

            <BottomToTop
                index={0}
                className="group relative mt-10 h-[25rem] overflow-hidden rounded"
            >
                <Image
                    src={imageUrl}
                    alt=""
                    fill
                    style={{
                        transition:
                            'transform 8s cubic-bezier(.25,.46,.45,.94)',
                    }}
                    className="object-cover object-center group-hover:scale-125"
                />
                <Overlay />
                <div className="absolute flex h-full w-full flex-col justify-end gap-5 p-8">
                    <h3 className="text-white">{title}</h3>
                    <Button href={`/news/${id}`} variant="white">
                        Read More
                    </Button>
                </div>
            </BottomToTop>

            <div className="gap-x mt-10 grid sm:grid-cols-2 lg:grid-cols-3">
                {articles.slice(1).map((article: any, idx) => (
                    <ArticleCard
                        key={idx}
                        index={idx}
                        _id={article?._id}
                        title={article?.title}
                        image={article?.image}
                        excerpt={article?.excerpt}
                        category={article.sub_category}
                        hidden={false}
                    />
                ))}
            </div>

            {/* <div className="space-y-20">
                <NewsHero />
                <NewsList />
            </div> */}
        </div>
    );
};

export default News;
