'use client';

import { Button, Callout, TextField } from '@radix-ui/themes'
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
            <div className='max-w-xl'>
                  {error && <Callout.Root color='red' className='mb-5'>
                        <Callout.Icon>
                              <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                  </Callout.Root>}
                  <form className='space-y-3' onSubmit={onSubmit}>
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
                        <Button disabled={isSubmitting}>Submit {isSubmitting && <Spinner />}</Button>
                  </form>
            </div >
      )
}

export default NewTodoPage