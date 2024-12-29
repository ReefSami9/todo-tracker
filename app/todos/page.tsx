import { Flex, Heading } from '@radix-ui/themes';
import TodosActions from './TodosActions';
import { getTodos } from '@/app/lib/getTodos';
import TodosList from './_components/TodosList';
import delay from 'delay';

const TodosPage = async () => {
      const todos = await getTodos();
      await delay(100);

      return (
            <Flex
                  direction="column"
                  align="center"
                  gap="8"
                  className="max-w-5xl mx-auto mt-12 p-6"
            >
                  <Heading className="mb-5" align="center" as="h3" color="bronze">
                        List Of Todos
                  </Heading>
                  {todos.length > 0 ? (
                        <TodosList todos={todos} />
                  ) : (
                        <p className="text-center text-gray-500">No todos found.</p>
                  )}
                  <div className="flex justify-center mt-5">
                        <div className="max-w-2xl flex justify-center">
                              <TodosActions />
                        </div>
                  </div>
            </Flex>
      );
};

export default TodosPage;
