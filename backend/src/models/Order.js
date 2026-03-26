import mongoose from 'mongoose';

const orderedProductSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    estimatedDeliveryTimeMs: {
      type: Number,
      required: true
    }
  },
  { _id: false }
);

const orderSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      index: true
    },
    orderTimeMs: {
      type: Number,
      required: true,
      index: -1
    },
    totalCostCents: {
      type: Number,
      required: true,
      min: 0
    },
    products: {
      type: [orderedProductSchema],
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

orderSchema.index({ orderTimeMs: -1 });

export const Order = mongoose.model('Order', orderSchema);
