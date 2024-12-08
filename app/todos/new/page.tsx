'use client';

import { Button, Callout, TextField, Text } from '@radix-ui/themes'
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


type TodoForm = z.infer<typeof createTodoSchema>;

const NewTodoPage = () => {
      const router = useRouter();
      const { register, control, handleSubmit, formState: { errors } } = useForm<TodoForm>({
            resolver: zodResolver(createTodoSchema)
      });
      const [error, setError] = useState('');
      return (
            <div className='max-w-xl'>
                  {error && <Callout.Root color='red' className='mb-5'>
                        <Callout.Icon>
                              <InfoCircledIcon />
                        </Callout.Icon>
                        <Callout.Text>{error}</Callout.Text>
                  </Callout.Root>}
                  <form className='space-y-3' onSubmit={handleSubmit(async (data) => {
                        try {
                              await axios.post('/api/todos', data);
                              router.push('/todos');
                        } catch (error) {
                              setError('An unexpected error occurred.')
                        }

                  })}>
                        <TextField.Root placeholder='Title' {...register('title')} />
                        {errors.title && <Text color="red" as='p'>{errors.title.message}</Text>}
                        <Controller
                              name="description"
                              control={control}
                              render={({ field }) => <SimpleMDE placeholder='Description' {...field} />}
                        />
                        {errors.description && <Text color="red" as='p'>{errors.description.message}</Text>}
                        <Button>Submit</Button>
                  </form>
            </div >
      )
}

export default NewTodoPage