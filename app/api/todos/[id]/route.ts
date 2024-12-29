import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions';

export async function PATCH(request: NextRequest, context: { params: { id: string } }) {
      const { params } = context;
      const session = await getServerSession(authOptions);

      if (!session) {
            return NextResponse.json({}, { status: 401 });
      }

      try {
            const body = await request.json();
            console.log('Request body:', body);
            console.log('Params ID:', params.id);

            if (typeof body.completed !== 'boolean' && !body.title && !body.description) {
                  console.error('Invalid input:', body);
                  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
            }

            const updatedTodo = await prisma.todo.update({
                  where: { id: parseInt(params.id) },
                  data: {
                        ...(body.title && { title: body.title }),
                        ...(body.description && { description: body.description }),
                        ...(typeof body.completed === 'boolean' && { completed: body.completed }),
                  },
            });

            console.log('Updated Todo:', updatedTodo);
            return NextResponse.json(updatedTodo);
      } catch (error) {
            console.error('Failed to update todo:', error);
            return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
      }
}

export async function DELETE(request: NextRequest, context: { params: { id: string } }) {
      const session = await getServerSession(authOptions);

      if (!session) {
            return NextResponse.json({}, { status: 401 });
      }

      try {
            const { id } = context.params;

            const todo = await prisma.todo.findUnique({
                  where: { id: parseInt(id) },
            });

            if (!todo) {
                  return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
            }

            await prisma.todo.delete({
                  where: { id: todo.id },
            });

            return NextResponse.json(todo);
      } catch (error) {
            console.error('Failed to delete todo:', error);
            return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
      }
}
