import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IArticle extends Document {
    title: string;
    // category: Schema.Types.ObjectId; // Corrected
    image: string;
    excerpt: string;
    content: string;
    createdAt: string;
}

const articleSchema = new Schema<IArticle>(
    {
        title: {
            type: String,
            required: true,
        },
        // category: {
        //   type: Schema.Types.ObjectId,
        //   required: true,
        //   ref: 'BlogCategory'
        // },
        image: {
            type: String,
            required: true,
        },
        excerpt: {
            type: String,
            required: true,
        },
        content: {
            type: String,
            required: true,
        },
    },
    { timestamps: true, versionKey: false },
);

export type ArticleModel = Model<IArticle>;

const Article =
    (mongoose.models.Article as ArticleModel) ||
    mongoose.model<IArticle, ArticleModel>('Article', articleSchema);

export default Article;
