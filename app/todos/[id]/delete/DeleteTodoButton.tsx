import { TrashIcon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import React from 'react'

const DeleteTodoButton = ({ todoId }: { todoId: number }) => {
      return (
            <div>
                  <AlertDialog.Root>
                        <AlertDialog.Trigger>
                              <Button color="red" variant="soft" size='1'><TrashIcon />Delete</Button>
                        </AlertDialog.Trigger>
                        <AlertDialog.Content>
                              <AlertDialog.Title>Confirm Deletion</AlertDialog.Title>
                              <AlertDialog.Description>
                                    Are you sure you want to delete this todo?
                              </AlertDialog.Description>
                              <Flex gap='3' mt='5'>
                                    <AlertDialog.Cancel>
                                          <Button variant="soft" size='1'>Cancel</Button>
                                    </AlertDialog.Cancel>
                                    <AlertDialog.Action>
                                          <Button color="red" variant="soft" size='1'>Delete Todo</Button>
                                    </AlertDialog.Action>
                              </Flex>
                        </AlertDialog.Content>
                  </AlertDialog.Root>

            </div>
      )
}

export default DeleteTodoButton
