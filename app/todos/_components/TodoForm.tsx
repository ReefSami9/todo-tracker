'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { todoSchema } from '@/app/validationsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Todo } from '@prisma/client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Callout, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from "react-simplemde-editor";

type TodoFormData = z.infer<typeof todoSchema>;

const TodoForm = ({ todo }: { todo?: Todo }) => {
      const router = useRouter();
      const { register, control, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
            resolver: zodResolver(todoSchema)
      });
      const [error, setError] = useState('');
      const [isSubmitting, setSubmitting] = useState(false);
      const onSubmit = handleSubmit(async (data) => {
            try {
                  setSubmitting(true);
                  if (todo) {
                        await axios.patch(`/api/todos/${todo.id}`, data);
                        router.push(`/todos/${todo.id}`);
                        return;
                  }
                  await axios.post('/api/todos', data);
                  router.push('/todos');
            } catch (error) {
                  setSubmitting(false);
                  setError('An unexpected error occurred.');
            }
      });
      return (
            <div className='max-w-xl mx-auto'>
                  <Heading className='mb-5' align='center' as="h3" color='bronze' >Add A New Todo</Heading>
                  {error && <Callout.Root color='red' className='mb-5'>
                        <Callout.Icon>
                              <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                  </Callout.Root>}
                  <form className='space-y-3 p-5 shadow-lg' onSubmit={onSubmit}>
                        <TextField.Root defaultValue={todo?.title} placeholder='Title' {...register('title')} />
                        <ErrorMessage>
                              {errors.title?.message}
                        </ErrorMessage>

                        <Controller
                              name="description"
                              defaultValue={todo?.description}
                              control={control}
                              render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                        />
                        <ErrorMessage>
                              {errors.description?.message}
                        </ErrorMessage>
                        <div className="flex justify-center min-w-8">
                              <Button disabled={isSubmitting}>Submit {isSubmitting && <Spinner />}</Button>
                        </div>
                  </form>
            </div >
      )
}

export default TodoForm
