import express from 'express';
import { CartItem } from '../models/CartItem.js';
import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { expand } = req.query;
    const cartItemDocs = await CartItem.find({}).sort({ createdAt: 1 });
    const cartItems = cartItemDocs.map((item) => item.toJSON());

    if (expand === 'product') {
      const productIds = cartItems.map((item) => item.productId);
      const productDocs = await Product.find({ id: { $in: productIds } });
      const productById = new Map(productDocs.map((product) => [product.id, product.toJSON()]));

      const expandedItems = cartItems.map((item) => ({
        ...item,
        product: productById.get(item.productId) || null
      }));

      return res.json(expandedItems);
    }

    return res.json(cartItems);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const { productId, quantity } = req.body;

    const product = await Product.findOne({ id: productId }).lean();
    if (!product) {
      return res.status(400).json({ error: 'Product not found' });
    }

    if (typeof quantity !== 'number' || quantity < 1 || quantity > 10) {
      return res.status(400).json({ error: 'Quantity must be a number between 1 and 10' });
    }

    let cartItem = await CartItem.findOne({ productId });
    if (cartItem) {
      cartItem.quantity += quantity;
      await cartItem.save();
    } else {
      cartItem = await CartItem.create({ productId, quantity, deliveryOptionId: '1' });
    }

    return res.status(201).json(cartItem.toJSON());
  })
);

router.put(
  '/:productId',
  asyncHandler(async (req, res) => {
    const { productId } = req.params;
    const { quantity, deliveryOptionId } = req.body;

    const cartItem = await CartItem.findOne({ productId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    if (quantity !== undefined) {
      if (typeof quantity !== 'number' || quantity < 1) {
        return res.status(400).json({ error: 'Quantity must be a number greater than 0' });
      }
      cartItem.quantity = quantity;
    }

    if (deliveryOptionId !== undefined) {
      const deliveryOption = await DeliveryOption.findOne({ id: deliveryOptionId }).lean();
      if (!deliveryOption) {
        return res.status(400).json({ error: 'Invalid delivery option' });
      }
      cartItem.deliveryOptionId = deliveryOptionId;
    }

    await cartItem.save();

    return res.json(cartItem.toJSON());
  })
);

router.delete(
  '/:productId',
  asyncHandler(async (req, res) => {
    const { productId } = req.params;

    const cartItem = await CartItem.findOne({ productId });
    if (!cartItem) {
      return res.status(404).json({ error: 'Cart item not found' });
    }

    await CartItem.deleteOne({ productId });

    return res.status(204).send();
  })
);

export default router;
