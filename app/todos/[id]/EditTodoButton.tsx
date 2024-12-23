import { Pencil2Icon } from '@radix-ui/react-icons'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const EditTodoButton = ({ todoId }: { todoId: number }) => {
      return (
            <div>
                  <Button variant="soft" size='1'>
                        <Pencil2Icon />
                        <Link href={`/todos/edit/${todoId}`}>Edit</Link></Button>
            </div>
      )
}

export default EditTodoButton
