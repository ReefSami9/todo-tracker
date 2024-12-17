import axios from "axios";

export const deleteTodos = async (todoId: number) => {
      await axios.delete('/api/todos/' + todoId)
};
