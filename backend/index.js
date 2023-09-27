import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { PORT, mongodbURL } from './config.js';
import bookRouter from "./routes/bookRouter.js";
import { errorHandler } from "./middleware/errorHandler.js";

const app = express();

app.use(express.json())
app.use(cors({
  origin: ['http://localhost:3000', 'https://book-store-ct8w.onrender.com'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
}))
app.use('/api/books', bookRouter)
app.use(errorHandler)

mongoose
  .connect(mongodbURL)
  .then(() => {
    console.log('Successful connected to mongoDB 🌿')
    app.listen(PORT, () => console.log(`App is listening on port: ${PORT} 🚀`))
  })
  .catch(() => console.log('Can`t connect to mongoDB ❌'));
