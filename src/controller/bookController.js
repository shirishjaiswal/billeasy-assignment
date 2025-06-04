import * as bookService from '../service/bookService.js';

export const addBook = async (req, res, next) => {
  try {
    const userId = req.user.id;
    const bookData = req.body;

    const book = await bookService.createBook(bookData, userId);
    res.status(201).json(book);
  } catch (error) {
    next(error);
  }
};

export const getBooks = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, author, genre } = req.query;

    const books = await bookService.listBooks({
      page: Number(page),
      limit: Number(limit),
      author,
      genre,
    });

    res.json(books);
  } catch (error) {
    next(error);
  }
};

export const getBookById = async (req, res, next) => {
  try {
    const bookId = Number(req.params.id);
    const { page = 1, limit = 5 } = req.query;

    const bookDetails = await bookService.getBookDetails(bookId, {
      page: Number(page),
      limit: Number(limit),
    });

    res.json(bookDetails);
  } catch (error) {
    next(error);
  }
};

export const searchBooks = async (req, res, next) => {
  try {
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ message: 'Query parameter is required' });
    }

    const books = await bookService.searchBooks(query);
    res.json(books);
  } catch (error) {
    next(error);
  }
};
