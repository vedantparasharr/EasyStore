import cors from "cors";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import productsRouter from "./routes/products.js";
import deliveryOptionsRouter from "./routes/deliveryOptions.js";
import cartItemsRouter from "./routes/cartItems.js";
import ordersRouter from "./routes/orders.js";
import paymentSummaryRouter from "./routes/paymentSummary.js";
import resetRouter from "./routes/reset.js";
import { errorHandler } from "./middleware/errorHandler.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function createApp() {
  const app = express();

  app.use(
    cors({
      origin: "http://localhost:5173",
      "https://easystoreapp.vercel.app"
    })
  );
  app.use(express.json());

  app.use("/images", express.static(path.join(__dirname, "..", "images")));

  app.use("/api/products", productsRouter);
  app.use("/api/delivery-options", deliveryOptionsRouter);
  app.use("/api/cart-items", cartItemsRouter);
  app.use("/api/orders", ordersRouter);
  app.use("/api/payment-summary", paymentSummaryRouter);
  app.use("/api/reset", resetRouter);

  app.use(errorHandler);

  return app;
}
