import { Product } from '../models/Product.js';
import { DeliveryOption } from '../models/DeliveryOption.js';
import { CartItem } from '../models/CartItem.js';
import { Order } from '../models/Order.js';
import { defaultProducts } from './defaultProducts.js';
import { defaultDeliveryOptions } from './defaultDeliveryOptions.js';

export async function seedIfEmpty() {
  const [productCount, deliveryOptionCount] = await Promise.all([
    Product.countDocuments(),
    DeliveryOption.countDocuments()
  ]);

  if (productCount === 0) {
    await Product.insertMany(defaultProducts, { ordered: true });
  }

  if (deliveryOptionCount === 0) {
    await DeliveryOption.insertMany(defaultDeliveryOptions, { ordered: true });
  }
}

export async function resetAndReseed() {
  await Promise.all([
    CartItem.deleteMany({}),
    Order.deleteMany({}),
    Product.deleteMany({}),
    DeliveryOption.deleteMany({})
  ]);

  await Product.insertMany(defaultProducts, { ordered: true });
  await DeliveryOption.insertMany(defaultDeliveryOptions, { ordered: true });
}
