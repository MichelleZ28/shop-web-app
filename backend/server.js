//create express
import express from 'express';
import { connectDB } from './config/db.js';
import productRoutes from "./routes/product.route.js";

const app = express();
// server.js (top of file)
import dotenv from 'dotenv';
dotenv.config();

const port = process.env.PORT || 5050; // coming from the .env rather than hard coding it

app.get("/", (req,res) => {
    res.send("server is ready");
});

app.get('/api/health', (_, res) => res.json({ ok: true }));


//allow you to parse JSON data ti the request body
app.use(express.json()); 


app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({ message: 'Internal server error' });
});



//when you visit api/products, you will access the APIs in product routes.
app.use("/api/products",productRoutes);


(async () => {
  try {
    await connectDB();
    console.log('✅ Mongo connected');
  } catch (e) {
    console.error('❌ Mongo connect failed:', e.message);
    // For dev you can continue running; for prod you might exit:
    // process.exit(1);
  }
  app.listen(port, '0.0.0.0', () => console.log(`server started at http://localhost:${port}`));
})();
