import React from 'react'
import TodoForm from '../../_components/TodoForm'
import prisma from '@/prisma/client'
import { notFound } from 'next/navigation'

interface Props {
      params: {
            id: string
      }
}

const EditTodoPage = async ({ params }: Props) => {
      const todo = await prisma.todo.findUnique({
            where: {
                  id: parseInt(params.id)
            }
      });

      if (!todo) notFound();

      return (
            <div>
                  <TodoForm todo={todo} />
            </div>
      )
}

export default EditTodoPage
