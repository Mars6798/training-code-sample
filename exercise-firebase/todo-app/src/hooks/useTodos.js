import { useState, useEffect, useCallback } from "react";

const API_URL = "http://localhost:5000/api";

export default function useTodos() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = async () => {
    try {
      const res = await fetch(`${API_URL}/todos`);
      const data = await res.json();
      if (data && data.data) {
        const todos = data.data.map(todo => ({
          id: todo.id,
          title: todo.title,
          completed: todo.completed
        }));
        setTodos(todos);
      }
      setTodos(data.data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const addTodo = useCallback(async (title) => {
    try {
      const newToto = {
        title,
        completed: false
      }
     await fetch(`${API_URL}/todos`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newToto),
      });

      await fetchTodos();

    } catch (err) {
      console.error(err);
    }
  }, [todos]);

  const updateTodo = useCallback(async (id) => {
    try {
      const updateData = {
        completed: true
      };

     await fetch(`${API_URL}/todo/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updateData),
      });

      setTodos((prev) =>
        prev.map((todo) => (todo.id === id ? { ...todo, completed: !todo.completed } : todo))
      );

    } catch (err) {
      console.error(err);
    }
  }, [todos]);

  const handleDeleteTodo = useCallback(async (id) => {
    try {
      const res = await fetch(`${API_URL}/todo/${id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success) {
        setTodos((prev) => prev.filter((todo) => todo.id !== id));
      }
    } catch (err) {
      console.error(err);
    }
  }, []);

  const handleBulkAction = useCallback(async (selectedDocIds, type) => {
    try {
      const todosUpdate = todos.filter(todo => selectedDocIds.includes(todo.id));

      const isComplete = type === "complete";
      const updatesData = todosUpdate.map(todo => ({
        docId: todo.id,
        completed: isComplete
      }));

      await fetch(`${API_URL}/todos`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatesData),
      });

      setTodos(prev =>
          prev.map(todo =>
              selectedDocIds.includes(todo.id)
                  ? { ...todo, completed: isComplete }
                  : todo
          )
      );
    } catch (error) {
      console.error(error);
    }
  }, [todos]);

  const handleBulkDeleteTodos = useCallback(async (selectedDocIds) => {
    try {
      await fetch(`${API_URL}/todos`, {
        method: "DELETE",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(selectedDocIds),
      });

      setTodos(prev => prev.filter(todo => !selectedDocIds.includes(todo.id)));
    } catch (error) {
      console.error(error);
    }
  }, [todos]);

  useEffect(() => {
    fetchTodos();
  }, []);

  return {
    todos,
    addTodo,
    updateTodo,
    handleDeleteTodo,
    handleBulkAction,
    handleBulkDeleteTodos
  };
}
