import React from 'react';
import prisma from '@/prisma/client';
import { notFound } from 'next/navigation';
import { TodoFormWithNoSSR } from '../../_components/TodoFormWithNoSSR';

interface Props {
      params: { id: string };
}

const EditTodoPage = async ({ params }: Props) => {
      const { id } = await params; // Await the params object

      const todo = await prisma.todo.findUnique({
            where: {
                  id: parseInt(id),
            },
      });

      if (!todo) notFound();

      return (
            <div>
                  <TodoFormWithNoSSR todo={todo} />
            </div>
      );
};

export default EditTodoPage;
