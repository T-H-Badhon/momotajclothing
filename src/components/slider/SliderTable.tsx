import Image from 'next/image';
import { TSlider } from 'src/modules/slider/slider.model';
import { GetAllSliders } from '../actions/sliderActions';
import AddButton from '../ui/buttons/Add';
import DeleteButton from '../ui/buttons/Delete';
import UpdateButton from '../ui/buttons/Update';

const SliderTable = async () => {
    const sliders: TSlider[] = await GetAllSliders();

    const columns = [
        { DataSearchKey: 'image', header: 'Image' },
        { DataSearchKey: 'title', header: 'Slider Title' },
        { DataSearchKey: 'category', header: 'Sub Title' },
    ];

    const columnWidths = ['10%', '40%', '40%', '10%'];

    return (
        <div className="bg-gray-100 text-sm text-zinc-800">
            <div className="mb-6 flex flex-col rounded-lg border bg-white">
                {/* header */}
                <div className="flex items-center justify-between gap-1 rounded-tl rounded-tr border-b border-solid px-5 py-4 font-medium">
                    <div className="text-base font-bold">Sliders</div>

                    <div className="flex flex-wrap justify-end gap-2">
                        <AddButton name="Slider" />
                    </div>
                </div>

                <div className="p-5">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-full border-collapse overflow-y-visible rounded-lg border">
                            <colgroup>
                                {columnWidths.map((width, index) => (
                                    <col key={index} style={{ width: width }} />
                                ))}
                            </colgroup>
                            <thead>
                                <tr className="border">
                                    {columns.map((column) => (
                                        <th
                                            key={column.header}
                                            className="border-l p-3 text-start align-middle font-semibold"
                                        >
                                            {column.header}
                                        </th>
                                    ))}

                                    <th className="border-l p-3 text-start align-middle font-semibold">
                                        Actions
                                    </th>
                                </tr>
                            </thead>

                            <tbody>
                                {sliders?.map((item, index) => (
                                    <tr key={index} className="border">
                                        <td className="border-l p-3 align-middle font-medium">
                                            <div className="grid grid-cols-1 gap-1">
                                                <Image
                                                    src={
                                                        process.env
                                                            .NEXT_PUBLIC_MEDIA +
                                                        item?.image
                                                    }
                                                    width={300}
                                                    height={300}
                                                    className="aspect-square h-full w-full rounded object-cover"
                                                    alt="product image"
                                                />
                                            </div>
                                        </td>
                                        <td className="border-l p-3 align-middle font-medium">
                                            {item?.title}
                                        </td>
                                        <td className="border-l p-3 align-middle font-medium">
                                            {item?.subtitle || ''}
                                        </td>

                                        <td className="border-collapse border-l p-3 text-zinc-800">
                                            <div className="flex items-center gap-2">
                                                <DeleteButton
                                                    itemData={item}
                                                    name="slider"
                                                />
                                                <UpdateButton
                                                    itemData={item}
                                                    name="slider"
                                                />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SliderTable;
