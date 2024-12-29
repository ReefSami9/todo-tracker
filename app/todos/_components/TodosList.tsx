'use client';

import Link from '@/app/components/Link';
import { markTodoAsComplete } from '@/app/lib/updateTodo';
import { Checkbox, Table } from '@radix-ui/themes';
import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useTodos } from '@/app/hooks/useTodos';

interface Todo {
      id: number;
      title: string;
      completed: boolean;
}

const TodosList = () => {
      const { data: todos, isLoading, isError } = useTodos();
      const [localTodos, setLocalTodos] = useState<Map<number, Todo>>(new Map());

      useEffect(() => {
            if (todos) {
                  setLocalTodos(new Map(todos.map((todo: Todo) => [todo.id, todo])));
            }
      }, [todos]);

      const handleCheckboxChange = async (id: number, completed: boolean) => {
            setLocalTodos((prevTodos) => {
                  const updatedTodos = new Map(prevTodos);
                  updatedTodos.set(id, { ...updatedTodos.get(id)!, completed });
                  return updatedTodos;
            });

            try {
                  await markTodoAsComplete(id, completed);
            } catch (error) {
                  console.error('Failed to update todo', error);
                  setLocalTodos((prevTodos) => {
                        const updatedTodos = new Map(prevTodos);
                        updatedTodos.set(id, { ...updatedTodos.get(id)!, completed: !completed });
                        return updatedTodos;
                  });
            }
      };

      if (isLoading) {
            return <p>Loading todos...</p>;
      }

      if (isError) {
            return <p>Failed to load todos. Please try again later.</p>;
      }

      return (
            <div className="flex justify-center w-full">
                  <Table.Root variant="surface" className="w-full max-w-3xl">
                        <Table.Header>
                              <Table.Row>
                                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell align="center">Completed</Table.ColumnHeaderCell>
                              </Table.Row>
                        </Table.Header>
                        <Table.Body>
                              {Array.from(localTodos.values()).map((todo) => (
                                    <Table.Row key={todo.id}>
                                          <Table.Cell>
                                                <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
                                          </Table.Cell>
                                          <Table.Cell align="center">
                                                <Checkbox
                                                      checked={todo.completed}
                                                      color="bronze"
                                                      onCheckedChange={() => handleCheckboxChange(todo.id, !todo.completed)}
                                                />
                                          </Table.Cell>
                                    </Table.Row>
                              ))}
                        </Table.Body>
                  </Table.Root>
            </div>
      );
};

export default TodosList;
