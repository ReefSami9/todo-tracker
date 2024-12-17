import { Heading } from '@radix-ui/themes';
import TodosActions from './TodosActions';
import { getTodos } from '@/app/lib/getTodos';
import TodosList from './_components/TodosList';

const TodosPage = async () => {
      const todos = await getTodos();
      return (
            <div>
                  <Heading className='mb-5' align='center' as="h3" color='bronze' >List Of Todos</Heading>
                  <TodosList todos={todos} />
                  <div className="flex justify-center mt-5">
                        <div className="max-w-2xl flex justify-center">
                              <TodosActions />
                        </div>
                  </div>
            </div>
      )
}

export default TodosPage
