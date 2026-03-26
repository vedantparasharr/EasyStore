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
    const cartItems = await CartItem.find({}).lean();

    if (cartItems.length === 0) {
      return res.json({
        totalItems: 0,
        productCostCents: 0,
        shippingCostCents: 0,
        totalCostBeforeTaxCents: 0,
        taxCents: 0,
        totalCostCents: 0
      });
    }

    const [products, deliveryOptions] = await Promise.all([
      Product.find({ id: { $in: cartItems.map((item) => item.productId) } }).lean(),
      DeliveryOption.find({ id: { $in: cartItems.map((item) => item.deliveryOptionId) } }).lean()
    ]);

    const productById = new Map(products.map((product) => [product.id, product]));
    const deliveryById = new Map(deliveryOptions.map((option) => [option.id, option]));

    let totalItems = 0;
    let productCostCents = 0;
    let shippingCostCents = 0;

    for (const item of cartItems) {
      const product = productById.get(item.productId);
      const deliveryOption = deliveryById.get(item.deliveryOptionId);

      if (!product || !deliveryOption) {
        const error = new Error('Cart contains invalid data');
        error.statusCode = 400;
        throw error;
      }

      totalItems += item.quantity;
      productCostCents += product.priceCents * item.quantity;
      shippingCostCents += deliveryOption.priceCents;
    }

    const totalCostBeforeTaxCents = productCostCents + shippingCostCents;
    const taxCents = Math.round(totalCostBeforeTaxCents * 0.1);
    const totalCostCents = totalCostBeforeTaxCents + taxCents;

    return res.json({
      totalItems,
      productCostCents,
      shippingCostCents,
      totalCostBeforeTaxCents,
      taxCents,
      totalCostCents
    });
  })
);

export default router;
