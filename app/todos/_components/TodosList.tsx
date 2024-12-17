'use client';

import Link from '@/app/components/Link';
import { markTodoAsComplete } from '@/app/lib/updateTodo';
import { Checkbox, Table } from '@radix-ui/themes';
import { useState } from 'react';

interface Todo {
      id: number;
      title: string;
      completed: boolean;
}

const TodosList = ({ todos }: { todos: Todo[] }) => {
      const [localTodos, setLocalTodos] = useState<Map<number, Todo>>(
            new Map(todos.map((todo) => [todo.id, todo]))
      );

      const handleCheckboxChange = async (id: number, completed: boolean) => {
            // Optimistically update the single todo in Map
            setLocalTodos((prevTodos) => {
                  const updatedTodos = new Map(prevTodos);
                  updatedTodos.set(id, { ...updatedTodos.get(id)!, completed });
                  return updatedTodos;
            });

            // Persist change to the server
            try {
                  await markTodoAsComplete(id, completed);
            } catch (error) {
                  console.error('Failed to update todo', error);

                  // Revert the change if the server call fails
                  setLocalTodos((prevTodos) => {
                        const updatedTodos = new Map(prevTodos);
                        updatedTodos.set(id, { ...updatedTodos.get(id)!, completed: !completed });
                        return updatedTodos;
                  });
            }
      };

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
