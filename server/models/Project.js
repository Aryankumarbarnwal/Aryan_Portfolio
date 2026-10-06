import mongoose from 'mongoose';

const projectSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    longDescription: { type: String, default: '' },
    tags: { type: [String], default: [] },
    github: { type: String, default: '' },
    live: { type: String, default: '' },
    image: { type: String, default: '' },
    images: { type: [String], default: [] },
  },
  { timestamps: true }
);

export default mongoose.model('Project', projectSchema);
