import mongoose from 'mongoose';

const deliveryOptionSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    deliveryDays: {
      type: Number,
      required: true,
      min: 1
    },
    priceCents: {
      type: Number,
      required: true,
      min: 0
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

export const DeliveryOption = mongoose.model('DeliveryOption', deliveryOptionSchema);
