'use client';

import { useRef, useState } from 'react';
import { toast } from 'sonner';
import InputImageField from 'src/components/ui/form/InputImage';
import { fileToBase64 } from 'src/utils/FileToBase64';
import { addSlider } from '../actions/sliderActions';
import { useRouter } from 'next/navigation';

const AddSlidder = () => {
    const [base64Image, setBase64Image] = useState<string | null>(null);
    const formRef = useRef<HTMLFormElement>(null);
    const router = useRouter();

    const handleImageChange = async (files: any) => {
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

    const handleSubmit = async (e: any) => {
        e.preventDefault();

        try {
            const formData = new FormData(e.target);
            const data = {
                title: formData.get('title') as string,
                subtitle: formData.get('subtitle') as string,
                image: base64Image as string,
            };

            const result = await addSlider(data);
            if (result.success) {
                formRef.current?.reset();
                setBase64Image(null);
                toast.success('Slider added successfully');
                router.push('/dashboard/slider');
            } else {
                // If there was an error
                console.error('Error creating slider:', result.error);
                toast.error('There was an error adding new slider');
            }
        } catch (error) {
            console.error('Error updating slider:', error);
            toast.error('There was an error adding new slider');
        }
    };

    return (
        <div className="relative w-full rounded-lg bg-white p-6 shadow-lg">
            <h4 className="mb-3 text-lg font-medium">
                Add New Slider
            </h4>

            <form ref={formRef} onSubmit={handleSubmit} className="mt-6 w-full">
                <div className="flex w-full items-start gap-2">
                    <div className="mb-6 w-full">
                        <label className="mb-2 inline-block">
                            Slider Title
                        </label>

                        <input
                            className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                            placeholder="Title"
                            style={{
                                display: 'initial',
                            }}
                            type="text"
                            name="title"
                            required
                        />
                    </div>

                    <div className="mb-6 w-full">
                        <label className="mb-2 inline-block">
                            Sub-Title
                        </label>

                        <input
                            className="h-10 min-h-[2.38rem] w-full cursor-text rounded border-2 border-solid border-gray-200 px-3 py-1.5"
                            placeholder="sub-title"
                            style={{
                                display: 'initial',
                            }}
                            name="subtitle"
                            type="text"
                            required
                        />
                    </div>
                </div>

                <div className="flex w-full items-start gap-2">
                    <div className="mb-6 w-full">
                        <InputImageField
                            label="Slider Image"
                            handleImageChange={handleImageChange}
                            base64Image={base64Image}
                            removeSelectedImage={removeSelectedImage}
                        />
                    </div>
                </div>

                <button
                    type="submit"
                    className="inline-block cursor-pointer items-start rounded bg-[#163133] px-3 py-2 text-center align-middle text-sm text-white"
                >
                    Add Slider
                </button>
            </form>
        </div>
    );
};

export default AddSlidder;
