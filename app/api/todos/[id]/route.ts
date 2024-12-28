import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
      const session = await getServerSession(authOptions);
      if (!session)
            return NextResponse.json({}, { status: 401 })

      try {
            const body = await request.json();
            console.log('Request body:', body); // Log the incoming body
            console.log('Params ID:', params.id); // Log the params

            if (typeof body.completed !== 'boolean') {
                  console.error('Invalid "completed" value:', body.completed);
                  return NextResponse.json({ error: 'Invalid input' }, { status: 400 });
            }

            // Perform the update
            const updatedTodo = await prisma.todo.update({
                  where: { id: parseInt(params.id) },
                  data: { completed: body.completed }, // Use the provided completed value
            });

            console.log('Updated Todo:', updatedTodo); // Log the result
            return NextResponse.json(updatedTodo); // Return the updated record
      } catch (error) {
            console.error('Failed to update todo:', error);
            return NextResponse.json({ error: 'Failed to update todo' }, { status: 500 });
      }
}

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
      const session = await getServerSession(authOptions);
      if (!session)
            return NextResponse.json({}, { status: 401 })

      const todo = await prisma.todo.findUnique({
            where: { id: parseInt(params.id) },
      });
      if (!todo)
            return NextResponse.json({ error: 'Todo not found' }, { status: 404 });
      try {
            await prisma.todo.delete({
                  where: { id: todo.id },
            });
            return NextResponse.json(todo);
      } catch (error) {
            return NextResponse.json({ error: 'Failed to delete todo' }, { status: 500 });
      }
}