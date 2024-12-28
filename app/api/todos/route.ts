import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { todoSchema } from "../../validationsSchema";
import { getServerSession } from "next-auth";
import authOptions from "@/app/auth/authOptions";

export async function POST(request: NextRequest) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
            return new Response("Unauthorized", { status: 401 });
      }

      const body = await request.json();
      const validation = todoSchema.parse(body);

      const newTodo = await prisma.todo.create({
            data: {
                  title: validation.title,
                  description: validation.description,
                  completed: validation.completed,
                  userId: session.user.id,
            },
      });
      return NextResponse.json(newTodo, { status: 201 })

}

export async function GET(req: Request) {
      const session = await getServerSession(authOptions);

      if (!session || !session.user) {
            return new Response(JSON.stringify([]), { status: 200 });
      }

      const todos = await prisma.todo.findMany({
            where: { userId: session.user.id },
            orderBy: { createdAt: "desc" },
      });

      return new Response(JSON.stringify(todos), { status: 200 });
}