'use client';

import { useRouter } from 'next/navigation';
import { useRef, useState } from 'react';
import { toast } from 'sonner';
import { handleUpdateArticle } from 'src/components/actions/actionArticles';
import InputField from 'src/components/ui/InputField';
import InputImageField from 'src/components/ui/InputImage';
import { fileToBase64 } from 'src/utils/FileToBase64';
import QuillEditor from './QuillEditor';

export default function UpdateArticleForm({
    articleStr,
    categoriesStr,
}: {
    articleStr: string;
    categoriesStr: string;
}) {
    const article = JSON.parse(articleStr);
    const categories = JSON.parse(categoriesStr);
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const [content, setContent] = useState<string>(article?.content);
    const [formData, setFormData] = useState(article);
    const router = useRouter();

    const formRef = useRef<HTMLFormElement>(null);

    const handleChange = (e: any) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = async (files: FileList) => {
        if (files && files.length > 0) {
            const selectedFile = files[0];
            try {
                const base64String = await fileToBase64(selectedFile);
                setBase64Image(base64String as string);
            } catch (error) {
                console.error('Error converting image to base64:', error);
            }
        }
    };

    const removeSelectedImage = () => {
        setBase64Image(null);
    };

    async function clientAction() {
        if (!content) {
            toast.error('Article content is required!');
            return;
        }
        // calling a server action
        const result = await handleUpdateArticle(
            {
                ...formData,
                content,
                image: base64Image ? (base64Image as string) : article?.image,
            },
            article?._id,
        );
        if (result?.success) {
            formRef.current?.reset();
            setFormData({});
            setContent('');
            removeSelectedImage();
            router.push('/dashboard/news');
            toast.success('Article Update successfully');
        } else {
            console.error('Error creating article:', result?.error);
            toast.error('There was an error updqte this article');
        }
    }

    return (
        <form ref={formRef} action={clientAction}>
            <div className="grid grid-cols-1 gap-5 px-8 pb-8">
                <InputField
                    label="Article Title"
                    name="title"
                    placeholder="Article title"
                    type="text"
                    handleChange={handleChange}
                    disabled={false}
                    required={true}
                    value={formData?.title}
                />

                {/* <div className="w-full">
          <label className="font-medium inline-block mb-2">
            Category
          </label>
          <div className="relative inline-block w-full">
            <select
              name='category'
              onChange={handleChange}
              required={true}
              value={formData?.category}
              className="appearance-none outline-none py-2 px-4 w-full min-h-[2.44rem] border-2 border-slate-200 rounded-md"
            >
              <option value="" selected disabled>
                Select Category
              </option>
              {categories?.map((category: {name: string; _id: string}) => (
                <option key={category?._id} value={category?._id}>
                  {category?.name}
                </option>
              ))}
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none text-slate-400">
              <LuChevronDown size={16} />
            </div>
          </div>
        </div> */}

                <InputImageField
                    label="Article Image"
                    handleImageChange={handleImageChange}
                    removeSelectedImage={removeSelectedImage}
                    base64Image={base64Image}
                    imagePath={
                        article?.image &&
                        process.env.NEXT_PUBLIC_MEDIA + article?.image
                    }
                />

                <InputField
                    label="Sub Content"
                    name="excerpt"
                    placeholder="Article sub content"
                    type="text"
                    handleChange={handleChange}
                    notice="Write a summary of your article."
                    disabled={false}
                    required={true}
                    textarea={true}
                    value={formData?.excerpt}
                />

                <h3 className="font-sans text-sm font-medium">
                    Article Content
                </h3>
                <QuillEditor content={content} setContent={setContent} />

                <div className="mt-4 flex gap-2">
                    <button
                        type="submit"
                        className="inline-block h-14 w-full cursor-pointer items-start rounded-md border-2 border-dashed border-blue-500 px-4 py-2 text-center text-blue-500"
                    >
                        Update Article
                    </button>
                </div>
            </div>
        </form>
    );
}
