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
            <Card className="max-w-lg mx-full p-5 shadow-lg">
                  {/* Title */}
                  <Flex direction="column" gap="3">
                        <Box>
                              <Heading as="h2" size="4" color="bronze" align="center">
                                    {todo.title}
                              </Heading>
                        </Box>

                        {/* Description */}
                        <Box>
                              <Text size="3" as="p">
                                    {todo.description}
                              </Text>
                        </Box>

                        {/* Completed Status */}
                        <Box>
                              <Flex align="center" justify="center">
                                    {todo.completed ? (
                                          <Badge color="green">Completed</Badge>
                                    ) : (
                                          <Badge color="red">Not Completed</Badge>
                                    )}
                              </Flex>
                        </Box>
                  </Flex>
            </Card>
      )
}

export default TodoDetailPage
