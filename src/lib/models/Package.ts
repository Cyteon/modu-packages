import mongoose from 'mongoose';

export interface Package {
    ownerId: string;
    name: string;
    description?: string;
    latestVersion?: string;
}

const schema = new mongoose.Schema<Package>({
    ownerId: {
        type: String,
        required: true,
    },
    
    name: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    latestVersion: {
        type: String,
    },
});

export default mongoose.models.Package || mongoose.model<Package>('Package', schema);