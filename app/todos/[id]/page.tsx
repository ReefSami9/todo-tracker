import prisma from '@/prisma/client'
import { Badge, Box, Card, Flex, Heading, Text } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import React from 'react'

interface Props {
      params: {
            id: string
      }
}
const TodoDetailPage = async ({ params }: Props) => {
      const todo = await prisma.todo.findUnique({
            where: {
                  id: parseInt(params.id)
            }
      })
      if (!todo)
            notFound();

      return (
            <div> <Heading className='mb-5' align='center' as="h3" color='bronze' >Todo Details</Heading>
                  <Card className="max-w-2xl mx-auto p-5 shadow-lg border border-gray-300"
                        style={{ minWidth: '500px', maxWidth: '700px' }}>
                        <Flex align="center" justify="between" className="mb-4">
                              <Heading as="h2" size="4" color="bronze">
                                    {todo.title}
                              </Heading>
                              <Badge color={todo.completed ? "green" : "red"}>
                                    {todo.completed ? "Completed" : "Not Completed"}
                              </Badge>
                        </Flex>
                        <Box
                              className="p-4 border border-gray-300 rounded-md mb-4"
                              style={{ backgroundColor: '#f9f9f9' }}
                        >
                              <Text size="3" as="p">
                                    {todo.description}
                              </Text>
                        </Box>
                  </Card>
            </div>
      )
}

export default TodoDetailPage
