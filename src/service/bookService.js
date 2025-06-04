import prisma from '../config/prisma.js';

export const createBook = async (bookData, userId) => {
  const { title, author, genre, description } = bookData;

  if (!title || !author) {
    throw new Error('Title and author are required');
  }

  const book = await prisma.book.create({
    data: {
      title,
      author,
      genre,
      description,
      addedById: userId,
    },
  });

  return book;
};

export const listBooks = async ({ page, limit, author, genre }) => {
  const where = {};

  if (author) {
    where.author = {
      contains: author,
      mode: 'insensitive',
    };
  }

  if (genre) {
    where.genre = {
      contains: genre,
      mode: 'insensitive',
    };
  }

  const totalCount = await prisma.book.count({ where });
  const totalPages = Math.ceil(totalCount / limit);
  const currentPage = page;

  const books = await prisma.book.findMany({
    where,
    skip: (page - 1) * limit,
    take: limit,
    orderBy: { createdAt: 'desc' },
  });

  return { totalCount, totalPages, currentPage, books };
};

export const getBookDetails = async (bookId, { page, limit }) => {
  const book = await prisma.book.findUnique({
    where: { id: bookId },
  });

  if (!book) {
    const error = new Error('Book not found');
    error.status = 404;
    throw error;
  }

  const avgRatingObj = await prisma.review.aggregate({
    where: { bookId },
    _avg: { rating: true },
  });

  const avgRating = avgRatingObj._avg.rating ?? null;

  const totalReviews = await prisma.review.count({ where: { bookId } });
  const totalPages = Math.ceil(totalReviews / limit);

  const reviews = await prisma.review.findMany({
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

  return {
    ...book,
    avgRating,
    reviews: {
      totalReviews,
      totalPages,
      currentPage: page,
      data: reviews,
    },
  };
};

export const searchBooks = async (query) => {
  return await prisma.book.findMany({
    where: {
      OR: [
        {
          title: {
            contains: query,
            mode: 'insensitive',
          },
        },
        {
          author: {
            contains: query,
            mode: 'insensitive',
          },
        },
      ],
    },
    orderBy: {
      createdAt: 'desc',
    },
  });
};