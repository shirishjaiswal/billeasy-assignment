import express from 'express';
import authenticate from '../middlewares/auth.js';
import * as bookController from '../controller/bookController.js';

const router = express.Router();

router.post('/', authenticate, bookController.addBook);
router.get('/', bookController.getBooks);
router.get('/search', bookController.searchBooks);
router.get('/:id', bookController.getBookById);

export default router;
