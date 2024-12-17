'use client';
import dynamic from 'next/dynamic';

const TodoForm = dynamic(
      () => import('@/app/todos/_components/TodoForm'),
      {
            ssr: false,
            loading: () => (
                  <div className="flex justify-center items-center h-screen">
                        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
                  </div>
            )
      }
)

const NewTodoPage = () => {

      return (
            <TodoForm />
      )
}

export default NewTodoPage