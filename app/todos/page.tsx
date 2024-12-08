import React from 'react'
import { Button } from '@radix-ui/themes';
import Link from 'next/link';

const TodosPage = () => {
      return (
            <div>
                  <Button> <Link href='/todos/new'>New Todo</Link> </Button>
            </div>
      )
}

export default TodosPage
