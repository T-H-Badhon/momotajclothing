import UpdateArticleForm from 'src/components/dashboard/blog/UpdateArticleForm';
import DashboardPageWrapper from 'src/components/dashboard/common/DashboardPageWrapper';
import Article from 'src/modules/blog/article.model';
import BlogCategory from 'src/modules/blog/category.model';
import connectMongo from 'src/utils/connect-mongo';

export default async function UpdateArticle({
    params,
}: {
    params: { articleId: string };
}) {
    await connectMongo();
    const article = await Article.findById(params?.articleId);
    const categories = await BlogCategory.find().sort('-createdAt');

    return (
        <DashboardPageWrapper>
            <div className="min-h-[0.06rem] max-w-full">
                <div className="overflow-hidden rounded-lg border-2 border-solid border-zinc-100 bg-white">
                    <div className="rounded-bl-lg rounded-br-lg">
                        <div className="flex items-center justify-between p-6">
                            <h4 className="mb-2 font-medium">
                                Update Article Form
                            </h4>
                        </div>

                        <UpdateArticleForm
                            categoriesStr={JSON.stringify(categories)}
                            articleStr={JSON.stringify(article)}
                        />
                    </div>
                </div>
            </div>
        </DashboardPageWrapper>
    );
}
