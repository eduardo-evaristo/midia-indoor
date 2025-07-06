import { prisma } from "@/../prisma";

export async function getUserByEmail(email: string) {
  const user = await prisma.user.findFirst({ where: { email } });
  return user;
}

export async function insertUser(userData: { email: string }) {
  const user = await prisma.user.create({ data: { email: userData.email } });
  return user;
}
