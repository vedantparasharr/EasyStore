import express from 'express';
import { DeliveryOption } from '../models/DeliveryOption.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { expand } = req.query;

    const deliveryOptions = await DeliveryOption.find({}).sort({ createdAt: 1 });
    const serializedOptions = deliveryOptions.map((option) => option.toJSON());

    if (expand === 'estimatedDeliveryTime') {
      const now = Date.now();
      const response = serializedOptions.map((option) => ({
        ...option,
        estimatedDeliveryTimeMs: now + option.deliveryDays * 24 * 60 * 60 * 1000
      }));

      return res.json(response);
    }

    return res.json(serializedOptions);
  })
);

export default router;
