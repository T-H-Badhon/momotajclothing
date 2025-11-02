import NewArticleForm from 'src/components/dashboard/blog/NewArticleForm';
import DashboardPageWrapper from 'src/components/dashboard/common/DashboardPageWrapper';
import BlogCategory from 'src/modules/blog/category.model';
import connectMongo from 'src/utils/connect-mongo';

export default async function AddArticle() {
    await connectMongo();
    const categories = await BlogCategory.find().sort('-createdAt');

    return (
        <DashboardPageWrapper>
            <div className="min-h-[0.06rem] max-w-full">
                <div className="overflow-hidden rounded-lg border-2 border-solid border-zinc-100 bg-white">
                    <div className="rounded-bl-lg rounded-br-lg">
                        <div className="flex items-center justify-between p-6">
                            <h4 className="mb-2 font-medium">
                                New Article Form
                            </h4>
                        </div>

                        <NewArticleForm
                            categoriesStr={JSON.stringify(categories)}
                        />
                    </div>
                </div>
            </div>
        </DashboardPageWrapper>
    );
}
