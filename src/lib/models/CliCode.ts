import mongoose from "mongoose";

export interface CliCode {
  userId: number;
  code: string;
}

const schema = new mongoose.Schema<CliCode>({
  userId: {
    type: Number,
    required: true,
  },
  code: {
    type: String,
    required: true,
  },
});

export default mongoose.models.CliCode ||
  mongoose.model<CliCode>("CliCode", schema);
