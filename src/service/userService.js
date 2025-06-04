import bcrypt from "bcryptjs";
import { generateToken } from "../utils/token.js";
import { findUserByEmail, createUser } from "../repository/userRepo.js";

const SALT_ROUNDS = 10;

export async function signup(email, password) {
  const existingUser = await findUserByEmail(email);
  if (existingUser) {
    const error = new Error("Email is already registered");
    error.statusCode = 409;
    throw error;
  }

  const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

  const user = await createUser({ email, password: hashedPassword });

  const token = generateToken({ id: user.id, email: user.email });
  return { user: { id: user.id, email: user.email }, token };
}

export async function login(email, password) {
  const user = await findUserByEmail(email);
  if (!user) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    const error = new Error("Invalid email or password");
    error.statusCode = 401;
    throw error;
  }

  const token = generateToken({ id: user.id, email: user.email });

  return { user: { id: user.id, email: user.email }, token };
}
