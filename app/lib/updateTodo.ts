export const markTodoAsComplete = async (id: number, completed: boolean): Promise<boolean> => {
      try {
            console.log(`Sending completed=${completed} for ID=${id}`);
            const response = await fetch(`/api/todos/${id}`, {
                  method: 'PATCH',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify({ completed }),
            });

            const result = await response.json();
            console.log('Response data:', result);

            return response.ok;
      } catch (error) {
            console.error('Error updating todo:', error);
            return false;
      }
};