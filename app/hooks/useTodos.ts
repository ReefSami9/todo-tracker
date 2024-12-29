import { useQuery } from "@tanstack/react-query";
import axios from "axios";

const fetchTodos = async () => {
      const response = await axios.get("/api/todos");
      if (!response.status || response.status >= 400) {
            throw new Error("Failed to fetch todos");
      }
      return response.data;
};

export const useTodos = () => {
      return useQuery({
            queryKey: ["todos"],
            queryFn: fetchTodos,
            staleTime: 1000 * 60 * 5, // Cache for 5 minutes
      });
};
