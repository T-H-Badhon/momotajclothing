import DeleteSlider from 'src/components/slider/DeleteSlider';
import SliderTable from 'src/components/slider/SliderTable';
import UpdateSlider from 'src/components/slider/UpdateSlider';

const Slider = () => {
    return (
        <div>
            <UpdateSlider />
            <DeleteSlider />

            <div className="p">
                <SliderTable />
            </div>
        </div>
    );
};

export default Slider;
