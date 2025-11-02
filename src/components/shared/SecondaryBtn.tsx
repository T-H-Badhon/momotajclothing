const SecondaryBtn = ({ name }: { name: string }) => {
    return (
        <button className="border-2 border-body px-[16px] py-[8px] sm:py-[10px]">
            <p className="font-bold uppercase tracking-[2px] text-body">
                {name}
            </p>
        </button>
    );
};

export default SecondaryBtn;
