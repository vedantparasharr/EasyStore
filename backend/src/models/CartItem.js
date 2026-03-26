import mongoose from 'mongoose';

const cartItemSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      index: true,
      unique: true
    },
    quantity: {
      type: Number,
      required: true,
      min: 1
    },
    deliveryOptionId: {
      type: String,
      required: true,
      index: true
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

export const CartItem = mongoose.model('CartItem', cartItemSchema);
