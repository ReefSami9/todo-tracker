'use client';
import { Button, TextArea, TextField } from '@radix-ui/themes'
import React from 'react'

const NewTodoPage = () => {
      return (
            <div className='max-w-xl space-y-3'>
                  <TextField.Root placeholder='Title' />
                  <TextArea placeholder='Description' />
                  <Button color="gray" variant="outline" radius="large" highContrast>Submit</Button>
            </div>
      )
}

export default NewTodoPage