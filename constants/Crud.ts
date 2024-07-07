import { TodoItem } from "./Data";
import { loadTodos, saveTodos } from "./asyncStorage";

export const fetchTodos = async (): Promise<TodoItem[]> => {
    const todos = await loadTodos();
    return todos
}

export const createTodo = async (newTodo: TodoItem): Promise<void> => {
    const todos = await fetchTodos();
    newTodo.id = Math.random().toString();
    todos.push(newTodo)
    await saveTodos(todos)
}

export const updateTodo = async (updatedTodo: TodoItem): Promise<void> => {
    const todos = await fetchTodos();
    const index = todos.findIndex((todo) => todo.id === updatedTodo.id);

    //If the item is found (meaning index has a valid position, not -1)
    if (index !== -1){
        todos[index] = updatedTodo;
    }
    await saveTodos(todos); // nunggu sampai fungsi saveTodos kelar
}

export const deleteTodo = async (id: number): Promise<void> => {
    const todos = await fetchTodos(); // ngambil data
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    await saveTodos(filteredTodos);
}