import * as reviewService from '../service/reviewService.js';

export async function submitReview(req, res, next) {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    const bookId = Number(req.params.id);
    const { rating, comment } = req.body;

    if (!rating || rating < 1 || rating > 5) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const review = await reviewService.createReview(userId, bookId, { rating, comment });
    res.status(201).json(review);
  } catch (error) {
    if (error.message === 'User has already reviewed this book.') {
      return res.status(409).json({ message: error.message });
    }
    next(error);
  }
}

export async function updateReview(req, res, next) {
  try {
    const userId = req.user.id;
    const reviewId = Number(req.params.id);
    const { rating, comment } = req.body;

    if (rating && (rating < 1 || rating > 5)) {
      return res.status(400).json({ message: 'Rating must be between 1 and 5.' });
    }

    const updatedReview = await reviewService.updateReview(userId, reviewId, { rating, comment });
    res.json(updatedReview);
  } catch (error) {
    if (error.message === 'Review not found.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized to update this review.') {
      return res.status(403).json({ message: error.message });
    }
    next(error);
  }
}

export async function deleteReview(req, res, next) {
  try {
    const userId = req.user.id;
    const reviewId = Number(req.params.id);

    await reviewService.deleteReview(userId, reviewId);
    res.status(204).send();
  } catch (error) {
    if (error.message === 'Review not found.') {
      return res.status(404).json({ message: error.message });
    }
    if (error.message === 'Unauthorized to delete this review.') {
      return res.status(403).json({ message: error.message });
    }
    next(error);
  }
}

export async function getBookReviews(req, res, next) {
  try {
    const bookId = Number(req.params.id);
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;

    const result = await reviewService.getReviewsByBook(bookId, page, limit);
    res.json(result);
  } catch (error) {
    next(error);
  }
}
