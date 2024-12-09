import React from 'react'
import { Checkbox, Heading, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import TodosActions from './TodosActions';
import Link from 'next/link';

const TodosPage = async () => {
      const todos = await prisma.todo.findMany();
      return (
            <div>
                  <Heading className='mb-5' align='center' as="h3" color='bronze' >List Of Todos</Heading>
                  <Table.Root variant='surface'>
                        <Table.Header>
                              <Table.Row>
                                    <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Description</Table.ColumnHeaderCell>
                                    <Table.ColumnHeaderCell>Completed</Table.ColumnHeaderCell>
                              </Table.Row>
                        </Table.Header>
                        <Table.Body>
                              {todos.map((todo) => (
                                    <Table.Row key={todo.id}>
                                          <Table.Cell>
                                                <Link href={`/todos/${todo.id}`}>
                                                      {todo.title}
                                                </Link>
                                          </Table.Cell>
                                          <Table.Cell>{todo.description}</Table.Cell>
                                          <Table.Cell>
                                                <Checkbox checked={todo.completed} color="bronze" defaultChecked />
                                          </Table.Cell>
                                    </Table.Row>
                              ))}
                        </Table.Body>
                  </Table.Root>
                  <TodosActions />
            </div>
      )
}

export default TodosPage
