import dotenv from 'dotenv';
import app from './app.js';

dotenv.config();

const SERVER_PORT = process.env.SERVER_PORT;

app.listen(SERVER_PORT, () => {
  console.log(`Server is running on port ${SERVER_PORT}`);
});
