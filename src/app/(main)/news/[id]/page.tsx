import { revalidatePath } from 'next/cache';
import Image from 'next/image';
import Article from 'src/modules/blog/article.model';
import Comment from 'src/modules/blog/comment.model';
import connectMongo from 'src/utils/connect-mongo';

export default async function ArticleDetails({
    params,
}: {
    params: { id: string };
}) {
    await connectMongo();
    const article: any = await Article.findById(params?.id);
    const comments = await Comment.find({ article: params?.id });

    const action = async (data: {
        name: string;
        email: string;
        opinion: string;
    }) => {
        'use server';

        const comment = await Comment.create({ ...data, article: params?.id });
        revalidatePath('/news/' + params?.id);

        return { success: true };
    };

    if (!article) {
        <div className="min-h-[calc(100dvh-200px] flex items-center justify-center">
            <p className="text-2xl">No Article Found</p>
        </div>;
    } else {
        const { image, title, content, createdAt } = article;

        return (
            <div className="mt-5 px-5 pb-10 md:mt-0 md:px-0">
                <div
                    style={{ backgroundImage: `url(/blog/${image})` }}
                    className="relative min-h-[20rem] md:min-h-[25rem]"
                >
                    <Image
                        src={process.env.NEXT_PUBLIC_MEDIA + image}
                        width={1400}
                        height={400}
                        alt={title}
                        className="absolute inset-0 aspect-square h-full w-full object-cover"
                    />
                </div>

                <section className="relative z-[1] mx-auto mt-1 max-w-4xl rounded bg-background pb-10 md:px-12">
                    <div className="space-y-6">
                        <div className="flex items-center gap-4">
                            <h6 className="whitespace-nowrap text-sm uppercase">
                                {new Date(createdAt).toDateString()}
                            </h6>
                            {/* <span className="size-1.5 rounded-full bg-black" /> */}
                            {/* <h6 className="uppercase whitespace-nowrap">{category?.name}</h6> */}
                        </div>

                        <h2 className="!mb-10 text-4xl font-bold">{title}</h2>

                        <div
                            className=""
                            dangerouslySetInnerHTML={{ __html: content }}
                        />
                    </div>
                </section>

                {comments?.length > 0 && (
                    <section className="relative mx-auto max-w-4xl rounded bg-background py-10 md:px-12">
                        {comments?.map((comment: any) => (
                            <div
                                key={comment?._id}
                                className="mt-10 flex gap-6 md:gap-10"
                            >
                                <div className="">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-slate-200 p-1 font-semibold text-[var(--muted-foreground)]">
                                        {comment?.name?.charAt(0)}
                                    </div>
                                </div>
                                <div className="">
                                    <h4 className="text-base font-semibold">
                                        {comment?.name}
                                    </h4>
                                    <p className="text-[12px]">
                                        {new Date(
                                            comment?.createdAt,
                                        ).toDateString()}
                                    </p>

                                    <div className="mt-3">
                                        <p className="">{comment?.opinion}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </section>
                )}

                {/* <section className="max-w-4xl mx-auto min-[896px]:px-12">
                    <h2>Leave A Comment</h2>
                    <p className="mt-4">Ready to share your perspective? Leave a comment.</p>
                    <Form
                        action={action}
                        submitButton={{ label: "Submit", fullWidth: false }}
                        initialValues={{ name: "", email: "", opinion: "" }}
                        schema="articlecomment"
                    >
                        <div className="grid grid-cols-2 gap-4">
                            <FormInput name="name" label="Name" />
                            <FormInput name="email" label="Email" />
                        </div>
                        <FormInput name="opinion" label="Message" textarea />
                    </Form>
                </section> */}
            </div>
        );
    }
}
