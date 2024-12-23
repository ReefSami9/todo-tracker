import prisma from '@/prisma/client'
import { Card, Flex, Heading } from '@radix-ui/themes'
import { notFound } from 'next/navigation'
import EditTodoButton from './EditTodoButton'
import DeleteTodoButton from './DeleteTodoButton'
import TodoDetails from './TodoDetails'
import { getServerSession } from 'next-auth';
import authOptions from '@/app/auth/authOptions'

interface Props {
      params: {
            id: string
      }
}
const TodoDetailPage = async ({ params }: Props) => {
      const session = await getServerSession(authOptions);

      const todo = await prisma.todo.findUnique({
            where: {
                  id: parseInt(params.id)
            }
      })
      if (!todo)
            notFound();

      return (
            <div> <Heading className='mb-5' align='center' as="h3" color='bronze' >Todo Details</Heading>
                  <Card size="3" className="max-w-2xl mx-auto p-5 shadow-lg border border-gray-300"
                        style={{ minWidth: '500px', maxWidth: '700px' }}>
                        <TodoDetails todo={todo} />
                        {session && (<Flex align="center" justify="end" gap="3">
                              <EditTodoButton todoId={todo.id} />
                              <DeleteTodoButton todoId={todo.id} />
                        </Flex>)}
                  </Card>
            </div>
      )
}

export default TodoDetailPage
