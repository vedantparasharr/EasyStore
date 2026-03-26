import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Order } from '../models/Order.js';
import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';
import { CartItem } from '../models/CartItem.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

async function attachProducts(orders) {
  const productIds = orders.flatMap((order) => order.products.map((product) => product.productId));
  const products = await Product.find({ id: { $in: productIds } });
  const productById = new Map(products.map((product) => [product.id, product.toJSON()]));

  return orders.map((order) => ({
    ...order,
    products: order.products.map((productEntry) => ({
      ...productEntry,
      product: productById.get(productEntry.productId) || null
    }))
  }));
}

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { expand } = req.query;

    const orderDocs = await Order.find({}).sort({ orderTimeMs: -1 });
    const orders = orderDocs.map((order) => order.toJSON());

    if (expand === 'products') {
      const expandedOrders = await attachProducts(orders);
      return res.json(expandedOrders);
    }

    return res.json(orders);
  })
);

router.post(
  '/',
  asyncHandler(async (req, res) => {
    const cartItems = await CartItem.find({});

    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart is empty' });
    }

    const [products, deliveryOptions] = await Promise.all([
      Product.find({ id: { $in: cartItems.map((item) => item.productId) } }),
      DeliveryOption.find({ id: { $in: cartItems.map((item) => item.deliveryOptionId) } })
    ]);

    const productById = new Map(products.map((product) => [product.id, product.toJSON()]));
    const deliveryById = new Map(deliveryOptions.map((option) => [option.id, option.toJSON()]));

    let subtotalCents = 0;
    const now = Date.now();

    const orderedProducts = cartItems.map((item) => {
      const product = productById.get(item.productId);
      if (!product) {
        const error = new Error(`Product not found: ${item.productId}`);
        error.statusCode = 400;
        throw error;
      }

      const deliveryOption = deliveryById.get(item.deliveryOptionId);
      if (!deliveryOption) {
        const error = new Error(`Invalid delivery option: ${item.deliveryOptionId}`);
        error.statusCode = 400;
        throw error;
      }

      subtotalCents += product.priceCents * item.quantity + deliveryOption.priceCents;

      return {
        productId: item.productId,
        quantity: item.quantity,
        estimatedDeliveryTimeMs: now + deliveryOption.deliveryDays * 24 * 60 * 60 * 1000
      };
    });

    const totalCostCents = Math.round(subtotalCents * 1.1);

    const order = await Order.create({
      id: uuidv4(),
      orderTimeMs: now,
      totalCostCents,
      products: orderedProducts
    });

    await CartItem.deleteMany({});

    return res.status(201).json(order.toJSON());
  })
);

router.get(
  '/:orderId',
  asyncHandler(async (req, res) => {
    const { orderId } = req.params;
    const { expand } = req.query;

    const order = await Order.findOne({ id: orderId });

    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }

    const serializedOrder = order.toJSON();

    if (expand === 'products') {
      const [expandedOrder] = await attachProducts([serializedOrder]);
      return res.json(expandedOrder);
    }

    return res.json(serializedOrder);
  })
);

export default router;
