'use client';

import Link from '@/app/components/Link';
import { markTodoAsComplete } from '@/app/lib/updateTodo';
import { Checkbox, Table } from '@radix-ui/themes';
import { useState, useEffect } from 'react';

interface Todo {
      id: number;
      title: string;
      completed: boolean;
}

const TodosList = () => {
      const [todos, setTodos] = useState<Todo[]>([]);

      useEffect(() => {
            const fetchTodos = async () => {
                  const response = await fetch('/api/todos');
                  const data = await response.json();
                  setTodos(data);
            };
            fetchTodos();
      }, []);

      const handleCheckboxChange = async (id: number, currentValue: boolean) => {
            const newValue = !currentValue; // Toggle the current value
            console.log(`Toggling ID=${id} to completed=${newValue}`); // Debug the toggle

            const success = await markTodoAsComplete(id, newValue); // Call utility function
            if (success) {
                  setTodos((prevTodos) =>
                        prevTodos.map((todo) =>
                              todo.id === id ? { ...todo, completed: newValue } : todo
                        )
                  );
            } else {
                  console.error('Failed to update checkbox value');
            }
      };


      return (
            <div className="flex justify-center w-full">
                  <Table.Root variant="surface" className="w-full max-w-3xl">
                        <Table.Header>
                              <Table.Row>
                                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell align="center">
                                          Completed
                                    </Table.ColumnHeaderCell>
                              </Table.Row>
                        </Table.Header>
                        <Table.Body>
                              {todos.map((todo) => (
                                    <Table.Row key={todo.id}>
                                          <Table.Cell>
                                                <Link href={`/todos/${todo.id}`}>{todo.title}</Link>
                                          </Table.Cell>
                                          <Table.Cell align="center">
                                                <Checkbox
                                                      checked={todo.completed}
                                                      color="bronze"
                                                      onCheckedChange={() => handleCheckboxChange(todo.id, todo.completed)}
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
