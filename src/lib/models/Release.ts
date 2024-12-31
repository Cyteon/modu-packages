import mongoose from 'mongoose';

export interface Release {
    packageName: string;
    version: string;
    zipUrl: string;
    readme: string;
    description?: string;
    downloadCount: number;
    createdAt?: Date;
}

const schema = new mongoose.Schema<Release>({
    packageName: {
        type: String,
        required: true,
    },

    version: {
        type: String,
        required: true,
    },

    zipUrl: {
        type: String,
        required: true,
    },

    readme: {
        type: String,
        required: true,
    },

    downloadCount: {
        type: Number,
        default: 0,
    },

    description: {
        type: String,
        required: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Release || mongoose.model<Release>('Release', schema);