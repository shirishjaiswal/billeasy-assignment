import prisma from '../config/prisma.js';

export async function createReview(userId, bookId, reviewData) {
  const existingReview = await prisma.review.findUnique({
    where: {
      bookId_userId: {
        bookId,
        userId,
      },
    },
  });

  if (existingReview) {
    throw new Error('User has already reviewed this book.');
  }

  const newReview = await prisma.review.create({
    data: {
      rating: reviewData.rating,
      comment: reviewData.comment,
      userId,
      bookId,
    },
  });

  return newReview;
}

export async function updateReview(userId, reviewId, updateData) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error('Review not found.');
  }
  if (review.userId !== userId) {
    throw new Error('Unauthorized to update this review.');
  }

  const updatedReview = await prisma.review.update({
    where: { id: reviewId },
    data: {
      rating: updateData.rating ?? review.rating,
      comment: updateData.comment ?? review.comment,
      updatedAt: new Date(),
    },
  });

  return updatedReview;
}

export async function deleteReview(userId, reviewId) {
  const review = await prisma.review.findUnique({
    where: { id: reviewId },
  });

  if (!review) {
    throw new Error('Review not found.');
  }
  if (review.userId !== userId) {
    throw new Error('Unauthorized to delete this review.');
  }

  await prisma.review.delete({
    where: { id: reviewId },
  });
}

export async function getReviewsByBook(bookId, page = 1, limit = 10) {
  const skip = (page - 1) * limit;

  const [total, reviews] = await Promise.all([
    prisma.review.count({ where: { bookId } }),
    prisma.review.findMany({
      where: { bookId },
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { user: { select: { id: true, email: true } } },
    }),
  ]);

  return { reviews, total };
}
