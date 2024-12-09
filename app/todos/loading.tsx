import React from 'react'
import { Skeleton, Table } from '@radix-ui/themes';
import TodosActions from './TodosActions';

const loadingTodoPage = () => {
      const todos = [1, 2, 3, 4, 5]
      return (
            <div>
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
                                    <Table.Row key={todo}>
                                          <Table.Cell>
                                                <Skeleton />
                                          </Table.Cell>
                                          <Table.Cell>
                                                <Skeleton />
                                          </Table.Cell>
                                          <Table.Cell>
                                                <Skeleton />
                                          </Table.Cell>
                                    </Table.Row>
                              ))}
                        </Table.Body>
                  </Table.Root>
                  <TodosActions />
            </div>
      )
}

export default loadingTodoPage
