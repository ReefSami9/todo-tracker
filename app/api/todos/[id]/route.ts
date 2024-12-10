import { todoSchema } from "@/app/validationsSchema";
import prisma from "@/prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function PATCH(
      request: NextRequest,
      { params }: { params: { id: string } }) {
      const body = await request.json();
      const validation = todoSchema.safeParse(body);
      if (!validation.success)
            return Response.json(validation.error.format(), { status: 400 });

      const todo = await prisma.todo.findUnique({
            where: {
                  id: parseInt(params.id)
            }
      }).then((todo) => {
            if (!todo)
                  return Response.json({ error: "Todo not found" }, { status: 404 });
      })
      const updatedTodo = await prisma.todo.update({
            where: {
                  id: parseInt(params.id)
            },
            data: {
                  title: body.title,
                  description: body.description,
                  completed: body.completed
            }
      });
      return NextResponse.json(updatedTodo);

}