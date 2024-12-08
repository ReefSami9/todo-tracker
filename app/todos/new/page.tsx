'use client';

import { Button, TextField, ThemePanel } from '@radix-ui/themes'
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import React from 'react'

const NewTodoPage = () => {
      return (
            <div className='max-w-xl space-y-3'>
                  <TextField.Root placeholder='Title' />
                  <SimpleMDE placeholder='Description' />
                  <Button>Submit</Button>
            </div>
      )
}

export default NewTodoPage