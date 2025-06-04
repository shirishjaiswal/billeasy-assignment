import prisma from '../config/prisma.js';

export const findUserByEmail = async (email) => {
  return await prisma.user.findUnique({
    where: { email },
  });
};

export const createUser = async ({ email, password }) => {
  return await prisma.user.create({
    data: { email, password },
  });
};
