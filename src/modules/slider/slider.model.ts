import mongoose, { Model, Schema } from 'mongoose';

export interface TSlider {
    image: string;
    title: string;
    subtitle: string;
}

const sliderSchema: Schema<TSlider> = new Schema<TSlider>(
    {
        image: {
            type: String,
            required: true,
        },
        title: {
            type: String,
            required: true,
        },
        subtitle: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false },
);

export type SliderModel = Model<TSlider>;

const Slider =
    (mongoose.models.Slider as SliderModel) ||
    mongoose.model<TSlider, SliderModel>('Slider', sliderSchema);

export default Slider;
