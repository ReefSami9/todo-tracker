'use client';

import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';
import { todoSchema } from '@/app/validationsSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { Todo } from '@prisma/client';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { Button, Callout, Flex, Heading, TextField } from '@radix-ui/themes';
import axios from 'axios';
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { z } from 'zod';
import SimpleMDE from "react-simplemde-editor";
import { useQueryClient } from '@tanstack/react-query';

type TodoFormData = z.infer<typeof todoSchema>;

const TodoForm = ({ todo }: { todo?: Todo }) => {
      const router = useRouter();
      const queryClient = useQueryClient();
      const { register, control, handleSubmit, formState: { errors } } = useForm<TodoFormData>({
            resolver: zodResolver(todoSchema)
      });
      const [error, setError] = useState('');
      const [isSubmitting, setSubmitting] = useState(false);
      const onSubmit = handleSubmit(async (data) => {
            try {
                  setSubmitting(true);

                  if (todo) {
                        await axios.patch(`/api/todos/${todo.id}`, {
                              title: data.title,
                              description: data.description,
                              completed: data.completed,
                        });
                        queryClient.invalidateQueries({ queryKey: ['todos'] });
                        queryClient.invalidateQueries({ queryKey: ['todos', todo.id] });
                        router.push(`/todos/${todo.id}`);
                        return;
                  }

                  await axios.post('/api/todos', data);
                  queryClient.invalidateQueries({ queryKey: ['todos'] });
                  router.push('/todos');
            } catch (error) {
                  console.error(error);
                  setError('An unexpected error occurred.');
            } finally {
                  setSubmitting(false);
            }
      });
      return (
            <Flex
                  direction="column"
                  align="center"
                  gap="8"
                  className="max-w-5xl mx-auto mt-12 px-4 sm:px-6 lg:px-8"
            >
                  <Heading className='mb-5 text-center' align='center' as="h3" color='bronze'>Add A New Todo</Heading>
                  {error && <Callout.Root color='red' className='mb-5'>
                        <Callout.Icon>
                              <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                  </Callout.Root>}
                  <form className='space-y-4 p-5 shadow-lg bg-white rounded-md' onSubmit={onSubmit}>
                        <TextField.Root
                              className="w-full"
                              defaultValue={todo?.title}
                              placeholder='Title'
                              {...register('title')}
                        />
                        <ErrorMessage>
                              {errors.title?.message}
                        </ErrorMessage>

                        <Controller
                              name="description"
                              defaultValue={todo?.description}
                              control={control}
                              render={({ field }) => (
                                    <div className="w-full">
                                          <SimpleMDE placeholder='Description' {...field} />
                                    </div>
                              )}
                        />
                        <ErrorMessage>
                              {errors.description?.message}
                        </ErrorMessage>

                        <div className="flex items-center space-x-2">
                              <input
                                    type="checkbox"
                                    className='accent-[#A18072] w-4 h-4'
                                    {...register('completed')}
                                    defaultChecked={todo?.completed || false}
                              />
                              <span className="text-sm">Completed</span>
                        </div>
                        <ErrorMessage>{errors.completed?.message}</ErrorMessage>

                        <div className="flex justify-center">
                              <Button disabled={isSubmitting} className="w-full sm:w-auto">Submit {isSubmitting && <Spinner />}</Button>
                        </div>
                  </form>
            </Flex >
      );
};

export default TodoForm;
