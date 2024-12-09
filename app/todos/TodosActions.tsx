import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'
import React from 'react'

const TodosActions = () => {
      return (
            <div className='mt-5'>
                  <Button>
                        <Pencil2Icon />
                        <Link href='/todos/new'>Add New Todo</Link>
                  </Button>
            </div>
      )
}

export default TodosActions
