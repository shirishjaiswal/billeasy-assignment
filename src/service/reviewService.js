import {
  findReviewByUserAndBook,
  createReview as createReviewRepo,
  findReviewById,
  updateReview as updateReviewRepo,
  deleteReview as deleteReviewRepo,
  getReviewsByBook as getReviewsRepo,
  countReviewsByBook,
} from '../repository/reviewRepo.js';

export const createReview = async (userId, bookId, reviewData) => {
  const existing = await findReviewByUserAndBook(userId, bookId);
  if (existing) {
    const error = new Error('User has already reviewed this book.');
    error.status = 400;
    throw error;
  }

  return await createReviewRepo(userId, bookId, reviewData);
};

export const updateReview = async (userId, reviewId, updateData) => {
  const review = await findReviewById(reviewId);
  if (!review) {
    const error = new Error('Review not found.');
    error.status = 404;
    throw error;
  }

  if (review.userId !== userId) {
    const error = new Error('Unauthorized to update this review.');
    error.status = 403;
    throw error;
  }

  return await updateReviewRepo(reviewId, updateData);
};

export const deleteReview = async (userId, reviewId) => {
  const review = await findReviewById(reviewId);
  if (!review) {
    const error = new Error('Review not found.');
    error.status = 404;
    throw error;
  }

  if (review.userId !== userId) {
    const error = new Error('Unauthorized to delete this review.');
    error.status = 403;
    throw error;
  }

  await deleteReviewRepo(reviewId);
};

export const getReviewsByBook = async (bookId, page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const [total, reviews] = await Promise.all([
    countReviewsByBook(bookId),
    getReviewsRepo(bookId, skip, limit),
  ]);

  return {
    total,
    totalPages: Math.ceil(total / limit),
    currentPage: page,
    reviews,
  };
};
