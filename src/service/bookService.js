import {
  createBook,
  findBooks,
  countBooks,
  findBookById,
  getAverageRating,
  countReviews,
  findReviews,
  searchBooksByTitleOrAuthor,
} from '../repository/bookRepo.js';

export const addBook = async (bookData, userId) => {
  const { title, author, description, genre, publishedYear } = bookData;

  if (!title?.trim() || !author?.trim()) {
    const error = new Error('Title and author are required');
    error.status = 400;
    throw error;
  }

  return await createBook(bookData, userId);
};

export const listBooks = async ({ page = 1, limit = 10, author, genre }) => {
  const filter = {};

  if (author) {
    filter.author = { contains: author, mode: 'insensitive' };
  }
  if (genre) {
    filter.genre = { contains: genre, mode: 'insensitive' };
  }

  const [totalCount, books] = await Promise.all([
    countBooks(filter),
    findBooks(filter, page, limit),
  ]);

  const totalPages = Math.ceil(totalCount / limit);

  return {
    totalCount,
    totalPages,
    currentPage: page,
    books,
  };
};

export const getBookDetails = async (bookId, { page = 1, limit = 5 }) => {
  const book = await findBookById(bookId);
  if (!book) {
    const error = new Error('Book not found');
    error.status = 404;
    throw error;
  }

  const [avgRating, totalReviews, reviews] = await Promise.all([
    getAverageRating(bookId),
    countReviews(bookId),
    findReviews(bookId, page, limit),
  ]);

  const totalPages = Math.ceil(totalReviews / limit);

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
  if (!query?.trim()) return [];
  return await searchBooksByTitleOrAuthor(query);
};
