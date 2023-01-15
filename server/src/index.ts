import bodyParser from 'body-parser';
import cors from 'cors';
import * as dotenv from 'dotenv';
import express from 'express';
import { createServer } from 'http';
import mongoose from 'mongoose';

import spotifyRoutes from './routes/spotify';

dotenv.config();

const PORT = 5000;
const CONNECTION_URL = process.env.DB_URL as string;

const app = express();
const httpServer = createServer(app);

// express setup
app.use(bodyParser.json({ limit: '30mb' }));
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }));
app.use(cors());

// routes
app.use('/spotify', spotifyRoutes);

const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: process.env.DB_NAME as string,
};

// connect to mongodb
mongoose.set('strictQuery', false);
mongoose
  .connect(CONNECTION_URL, opts)
  .then(() => httpServer.listen(PORT, () => console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));
