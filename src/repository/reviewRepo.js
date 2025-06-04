import prisma from '../config/prisma.js';

export const findReviewByUserAndBook = async (userId, bookId) => {
  return await prisma.review.findUnique({
    where: {
      bookId_userId: {
        bookId,
        userId,
      },
    },
  });
};

export const createReview = async (userId, bookId, reviewData) => {
  return await prisma.review.create({
    data: {
      rating: reviewData.rating,
      comment: reviewData.comment,
      userId,
      bookId,
    },
  });
};

export const findReviewById = async (reviewId) => {
  return await prisma.review.findUnique({
    where: { id: reviewId },
  });
};

export const updateReview = async (reviewId, updateData) => {
  return await prisma.review.update({
    where: { id: reviewId },
    data: {
      ...updateData,
      updatedAt: new Date(),
    },
  });
};

export const deleteReview = async (reviewId) => {
  return await prisma.review.delete({
    where: { id: reviewId },
  });
};

export const getReviewsByBook = async (bookId, skip, limit) => {
  return await prisma.review.findMany({
    where: { bookId },
    skip,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: { user: { select: { id: true, email: true } } },
  });
};

export const countReviewsByBook = async (bookId) => {
  return await prisma.review.count({ where: { bookId } });
};
