import { NextRequest, NextResponse } from 'next/server';
import prisma from '@/prisma/client';

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
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