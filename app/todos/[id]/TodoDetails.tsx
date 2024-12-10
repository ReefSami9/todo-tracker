import { Todo } from '@prisma/client'
import { Badge, Box, Flex, Heading } from '@radix-ui/themes'
import ReactMarkdown from 'react-markdown'

const TodoDetails = ({ todo }: { todo: Todo }) => {
      return (
            <div>
                  <Flex align="center" justify="between" className="mb-4">
                        <Heading as="h2" size="4" color="bronze">
                              {todo.title}
                        </Heading>
                        <Badge color={todo.completed ? "green" : "red"}>
                              {todo.completed ? "Completed" : "Not Completed"}
                        </Badge>
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
