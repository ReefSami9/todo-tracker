'use client';

import { Button, Callout, Heading, TextField } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios'
import "easymde/dist/easymde.min.css";
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { InfoCircledIcon } from '@radix-ui/react-icons';
import { createTodoSchema } from '@/app/validationsSchema';
import ErrorMessage from '@/app/components/ErrorMessage';
import Spinner from '@/app/components/Spinner';


type TodoForm = z.infer<typeof createTodoSchema>;

const NewTodoPage = () => {
      const router = useRouter();
      const { register, control, handleSubmit, formState: { errors } } = useForm<TodoForm>({
            resolver: zodResolver(createTodoSchema)
      });
      const [error, setError] = useState('');
      const [isSubmitting, setSubmitting] = useState(false);
      const onSubmit = handleSubmit(async (data) => {
            try {
                  setSubmitting(true);
                  await axios.post('/api/todos', data);
                  router.push('/todos');
            } catch (error) {
                  setSubmitting(false);
                  setError('An unexpected error occurred.');
            }
      });
      return (
            <div className='max-w-xl mx-auto'>
                  <Heading className='mb-5' align='center' as="h2" color='bronze' >Add A New Todo</Heading>
                  {error && <Callout.Root color='red' className='mb-5'>
                        <Callout.Icon>
                              <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                  </Callout.Root>}
                  <form className='space-y-3 p-5 shadow-lg' onSubmit={onSubmit}>
                        <TextField.Root placeholder='Title' {...register('title')} />
                        <ErrorMessage>
                              {errors.title?.message}
                        </ErrorMessage>

                        <Controller
                              name="description"
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

export default NewTodoPage