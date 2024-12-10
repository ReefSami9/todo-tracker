import prisma from '@/prisma/client';
import { Heading } from '@radix-ui/themes';
import TodosActions from './TodosActions';
import TodosList from './_components/TodosList';

const TodosPage = async () => {
      return (
            <div>
                  <Heading className='mb-5' align='center' as="h3" color='bronze' >List Of Todos</Heading>
                  <TodosList />
                  <div className="flex justify-center mt-5">
                        <div className="max-w-2xl flex justify-center">
                              <TodosActions />
                        </div>
                  </div>
            </div>
      )
}

export default TodosPage
