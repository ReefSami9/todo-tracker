import prisma from '@/prisma/client';

export const getTodos = async () => {
      const todos = await prisma.todo.findMany();
      return todos;
};