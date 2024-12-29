import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { todoSchema } from "../../validationsSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user || !session.user.email) {
            return new Response("Unauthorized", { status: 401 });
      }

      try {
            const user = await prisma.user.findUnique({
                  where: { email: session.user.email },
            });

            if (!user) {
                  return new Response("User not found", { status: 404 });
            }

            const body = await request.json();
            const validation = todoSchema.parse(body);

            const newTodo = await prisma.todo.create({
                  data: {
                        title: validation.title,
                        description: validation.description,
                        completed: validation.completed,
                        userId: user.id,
                  },
            });

            return NextResponse.json(newTodo, { status: 201 });
      } catch (error) {
            console.error('Error creating todo:', error);
            return new Response("Internal Server Error", { status: 500 });
      }
}


export async function GET(req: Request) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
            return new Response(JSON.stringify([]), { status: 200 });
      }

      const todos = await prisma.todo.findMany({
            where: { userId: session.user.id },
      });

      return new Response(JSON.stringify(todos), { status: 200 });
}