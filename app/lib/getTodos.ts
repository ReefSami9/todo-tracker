import prisma from '@/prisma/client';
import delay from 'delay'

export const getTodos = async () => {
      delay(20000);
      const todos = await prisma.todo.findMany();
      return todos;
};