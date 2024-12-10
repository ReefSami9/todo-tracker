import { NextRequest, NextResponse } from "next/server";
import prisma from "@/prisma/client"
import { todoSchema } from "../../validationsSchema";

export async function POST(request: NextRequest) {
      const body = await request.json();
      const validation = todoSchema.safeParse(body);
      if (!validation.success)
            return NextResponse.json(validation.error.format(), { status: 400 })
      const newTodo = await prisma.todo.create({
            data: { title: body.title, description: body.description }
      })
      return NextResponse.json(newTodo, { status: 201 })

}

export async function GET() {
      try {
            const todos = await prisma.todo.findMany();
            return NextResponse.json(todos); // Return todos as valid JSON
      } catch (error) {
            console.error('Failed to fetch todos:', error);
            return NextResponse.json({ error: 'Failed to fetch todos' }, { status: 500 });
      }
}