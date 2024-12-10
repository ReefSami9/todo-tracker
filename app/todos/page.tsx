import React from 'react'
import { Checkbox, Heading, Table } from '@radix-ui/themes';
import prisma from '@/prisma/client';
import TodosActions from './TodosActions';
import Link from '@/app/components/Link';

const TodosPage = async () => {
      const todos = await prisma.todo.findMany();
      return (
            <div>
                  <Heading className='mb-5' align='center' as="h3" color='bronze' >List Of Todos</Heading>
                  <div className="flex justify-center w-full">
                        <Table.Root variant='surface' className=' w-full max-w-3xl'>
                              <Table.Header>
                                    <Table.Row>
                                          <Table.ColumnHeaderCell>Title</Table.ColumnHeaderCell>
                                          <Table.ColumnHeaderCell align='center'>Completed</Table.ColumnHeaderCell>
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
                                                <Table.Cell align='center'>
                                                      <Checkbox checked={todo.completed} color="bronze" defaultChecked />
                                                </Table.Cell>
                                          </Table.Row>
                                    ))}
                              </Table.Body>
                        </Table.Root>
                  </div>
                  <div className="flex justify-center mt-5">
                        <div className="max-w-2xl flex justify-center">
                              <TodosActions />
                        </div>
                  </div>
            </div>
      )
}

export default TodosPage
