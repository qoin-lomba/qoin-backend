import prisma from "../../database/prisma";
import checkUser from "../../shared/checkUser";
import comparePassword from "../../shared/comparePassword";
import bcrypt from "bcrypt";

export const createAccountService = async (email: string, password: string) => {
  const emailIsAvailable = await checkUser(email);

  if (emailIsAvailable) {
    throw new Error("Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await prisma.users.create({
    data: {
      email,
      password: hashedPassword,
    },
  });

  return user;
};

export const loginAccountService = async (email: string, password: string) => {
  const user = await prisma.users.findUnique({
    where: {
      email,
    },
  });

  if (!user) {
    throw new Error("User not found");
  }

  const isPasswordValid = await comparePassword(password, user.password);

  if (!isPasswordValid) {
    throw new Error("Invalid password");
  }

  return user;
};

export const getUserService = async (userId: string) => {
  const user = await prisma.users.findUnique({
    where: { id: userId },
  });

  if (!user) {
    throw new Error("User not found");
  }

  return user;
};
