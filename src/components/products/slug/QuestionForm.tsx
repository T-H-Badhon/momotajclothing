import PrimaryBtn from 'src/components/shared/PrimaryBtn';

const QuestionForm = () => {
    return (
        <div>
            <form>
                <div className="flex gap-x-3 px-5">
                    <div className="flex w-1/2 flex-col items-start gap-y-2">
                        <label
                            htmlFor="name"
                            className="text-xs tracking-widest"
                        >
                            Name
                        </label>
                        <input
                            type="text"
                            name="name"
                            id=""
                            className="w-full appearance-none border p-2 text-base outline-none focus:border-black focus:bg-gray-200"
                        />
                    </div>
                    <div className="flex w-1/2 flex-col items-start gap-y-2">
                        <label
                            htmlFor="email"
                            className="text-xs tracking-widest"
                        >
                            Email
                        </label>
                        <input
                            type="text"
                            name="email"
                            id=""
                            className="w-full appearance-none border p-2 text-base outline-none focus:border-black focus:bg-gray-200"
                        />
                    </div>
                </div>
                <div className="flex flex-col items-start gap-y-2 px-5 py-5">
                    <label
                        htmlFor="message"
                        className="text-xs tracking-widest"
                    >
                        Message
                    </label>
                    <textarea
                        name="message"
                        id=""
                        className="min-h-[128px] w-full appearance-none border p-2 text-base outline-none focus:border-black focus:bg-gray-200"
                    />
                </div>
                <div className="flex items-center justify-center">
                    <PrimaryBtn name="Send" />
                </div>
            </form>
        </div>
    );
};

export default QuestionForm;
