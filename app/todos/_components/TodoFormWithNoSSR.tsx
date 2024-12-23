'use client';
import dynamic from 'next/dynamic';
import TodoFormSkeleton from './TodoFormSkeleton';

export const TodoFormWithNoSSR = dynamic(
      () => import('@/app/todos/_components/TodoForm'),
      {
            ssr: false,
            loading: () => <TodoFormSkeleton />
      }
)