const PrimaryBtn = ({ name }: { name: string }) => {
    return (
        <button className="group relative overflow-hidden bg-btnPrimary px-4 py-[9px] text-white transition-all duration-300 ease-out hover:bg-gradient-to-r md:px-5 md:py-2.5">
            <span className="absolute right-0 -mt-12 h-32 w-16 translate-x-20 rotate-12 transform bg-white opacity-10 transition-all duration-500 ease-in group-hover:-translate-x-[300px]"></span>

            <span className="relative font-primary text-[11px] font-bold uppercase tracking-[5px] md:text-[13px]">
                {name}
            </span>
        </button>
    );
};

export default PrimaryBtn;
