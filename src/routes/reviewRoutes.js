import express from 'express';
import * as reviewController from '../controller/reviewController.js';
import authenticate from '../middlewares/auth.js';

const router = express.Router();

router.post('/book/:id', authenticate, reviewController.submitReview);
router.put('/:id', authenticate, reviewController.updateReview);
router.delete('/:id', authenticate, reviewController.deleteReview);
router.get('/book/:id', reviewController.getBookReviews);

export default router;
