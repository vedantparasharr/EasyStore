import mongoose from 'mongoose';

const ratingSchema = new mongoose.Schema(
  {
    stars: {
      type: Number,
      required: true,
      min: 0,
      max: 5
    },
    count: {
      type: Number,
      required: true,
      min: 0
    }
  },
  { _id: false }
);

const productSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    image: {
      type: String,
      required: true,
      trim: true
    },
    name: {
      type: String,
      required: true,
      trim: true
    },
    rating: {
      type: ratingSchema,
      required: true
    },
    priceCents: {
      type: Number,
      required: true,
      min: 0
    },
    keywords: {
      type: [String],
      required: true,
      default: []
    }
  },
  {
    versionKey: false,
    timestamps: true,
    toJSON: {
      transform: (_, ret) => {
        delete ret._id;
        return ret;
      }
    }
  }
);

productSchema.index({ name: 1 });
productSchema.index({ keywords: 1 });

export const Product = mongoose.model('Product', productSchema);
