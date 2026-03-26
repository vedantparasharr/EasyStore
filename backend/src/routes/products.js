import express from 'express';
import { Product } from '../models/Product.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

router.get(
  '/',
  asyncHandler(async (req, res) => {
    const { search } = req.query;

    let products;
    if (search) {
      const searchRegex = new RegExp(escapeRegex(search), 'i');
      products = await Product.find({
        $or: [{ name: { $regex: searchRegex } }, { keywords: { $elemMatch: { $regex: searchRegex } } }]
      })
        .sort({ createdAt: 1 });
    } else {
      products = await Product.find({}).sort({ createdAt: 1 });
    }

    res.json(products.map((product) => product.toJSON()));
  })
);

export default router;
