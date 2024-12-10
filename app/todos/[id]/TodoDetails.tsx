'use client';
import { markTodoAsComplete } from '@/app/lib/updateTodo';
import { Todo } from '@prisma/client'
import { Badge, Box, Button, Flex, Heading } from '@radix-ui/themes'
import { useState } from 'react';
import ReactMarkdown from 'react-markdown'

const TodoDetails = ({ todo }: { todo: Todo }) => {
      const [completed, setCompleted] = useState(todo.completed);

      const handleMarkComplete = async () => {
            try {
                  console.log('Sending completed: true for this todo'); // Debug

                  const success = await markTodoAsComplete(todo.id, true); // Send completed: true
                  if (success) {
                        setCompleted(true); // Update state to reflect completion
                  } else {
                        console.error('Failed to mark todo as complete');
                  }
            } catch (error) {
                  console.error('Error marking todo as complete:', error);
            }
      };

      return (
            <div>
                  <Flex align="center" justify="between" className="mb-4">
                        <Flex align="center" gap="3">
                              <Heading as="h2" size="4" color="bronze">
                                    {todo.title}
                              </Heading>
                              <Badge color={completed ? "green" : "red"}>
                                    {completed ? "Completed" : "Not Completed"}
                              </Badge>
                        </Flex>
                        {!completed && (
                              <Button
                                    variant="solid"
                                    color="green"
                                    className="hover:bg-green-600"
                                    onClick={handleMarkComplete}
                              >
                                    Mark Complete
                              </Button>
                        )}
                  </Flex>
                  <Box
                        className=" prose p-4 border border-gray-300 rounded-md mb-4"
                        style={{ backgroundColor: '#f9f9f9' }}
                  >
                        <ReactMarkdown>
                              {todo.description}
                        </ReactMarkdown>
                  </Box>
            </div>
      )
}

export default TodoDetails
