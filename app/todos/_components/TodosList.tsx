'use client';

import Link from '@/app/components/Link';
import { Checkbox, Table } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

interface Todo {
      id: number;
      title: string;
      completed: boolean;
      userId: string;
}

interface TodosListProps {
      todos: Todo[];
}

const TodosList: React.FC<TodosListProps> = ({ todos }) => {
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
                  const response = await fetch(`/api/todos/${id}`, {
                        method: 'PATCH',
                        headers: {
                              'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ completed }),
                  });

                  if (!response.ok) {
                        throw new Error('Failed to update todo');
                  }

                  const updatedTodo = await response.json();
                  console.log('Todo updated successfully:', updatedTodo);
            } catch (error) {
                  console.error('Failed to update todo:', error);
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
