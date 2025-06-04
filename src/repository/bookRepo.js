import prisma from '../config/prisma.js';

export const createBook = async (bookData, userId) => {
  return await prisma.book.create({
    data: {
      ...bookData,
      addedById: userId,
    },
  });
};

export const findBooks = async (filter, page, limit) => {
  return await prisma.book.findMany({
    where: filter,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });
};

export const countBooks = async (filter) => {
  return await prisma.book.count({ where: filter });
};

export const findBookById = async (bookId) => {
  return await prisma.book.findUnique({
    where: { id: bookId },
  });
};

export const getAverageRating = async (bookId) => {
  const result = await prisma.review.aggregate({
    where: { bookId },
    _avg: { rating: true },
  });
  return result._avg.rating ?? null;
};

export const countReviews = async (bookId) => {
  return await prisma.review.count({ where: { bookId } });
};

export const findReviews = async (bookId, page, limit) => {
  return await prisma.review.findMany({
    where: { bookId },
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
    include: {
      user: {
        select: { id: true, email: true },
      },
    },
  });
};

export const searchBooksByTitleOrAuthor = async (query) => {
  return await prisma.book.findMany({
    where: {
      OR: [
        { title: { contains: query, mode: 'insensitive' } },
        { author: { contains: query, mode: 'insensitive' } },
      ],
    },
    orderBy: { createdAt: 'desc' },
  });
};
