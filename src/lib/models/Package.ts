import mongoose from "mongoose";

export interface Package {
  ownerId: string;
  name: string;
  description?: string;
  latestVersion?: string;
  downloadCount?: number;
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

  downloadCount: {
    type: Number,
    default: 0,
  },
});

export default mongoose.models.Package ||
  mongoose.model<Package>("Package", schema);
