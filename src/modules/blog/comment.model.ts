import mongoose, { Document, Model, Schema } from 'mongoose';

export interface IComment extends Document {
    name: string;
    email: string;
    article: Schema.Types.ObjectId;
    opinion: string;
    createdAt: string;
}

const commentSchema = new Schema<IComment>(
    {
        name: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            required: true,
        },
        opinion: {
            type: String,
            required: true,
        },
        article: {
            type: Schema.Types.ObjectId,
            required: true,
            ref: 'Article',
        },
    },
    { timestamps: true, versionKey: false },
);

export type CommentModel = Model<IComment>;

const Comment =
    (mongoose.models.Comment as CommentModel) ||
    mongoose.model<IComment, CommentModel>('Comment', commentSchema);

export default Comment;
