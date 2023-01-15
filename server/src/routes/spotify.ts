import express from 'express';
import { getDailySong } from '../controllers/spotify.controller';

const router = express.Router();

router.get('/daily', getDailySong);

export default router;
