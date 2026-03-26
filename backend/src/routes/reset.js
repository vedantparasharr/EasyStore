import express from 'express';
import { resetAndReseed } from '../seed/index.js';

const router = express.Router();

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

router.post(
  '/',
  asyncHandler(async (req, res) => {
    await resetAndReseed();
    return res.status(204).send();
  })
);

export default router;
