import { TrashIcon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import React from 'react'

const DeleteTodoButton = ({ todoId }: { todoId: number }) => {
      return (
            <div>
                  <Button size='1'><TrashIcon />Delete</Button>
            </div>
      )
}

export default DeleteTodoButton
