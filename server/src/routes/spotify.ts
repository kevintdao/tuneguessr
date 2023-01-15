import express from 'express';
import { getDailySong } from '../controllers/spotify.controller';
// import { authenticateToken } from '../middlewares/auth.ts';

const router = express.Router();

router.get('/daily', getDailySong);
// router.get('/callback', callbackSpotify);

export default router;
