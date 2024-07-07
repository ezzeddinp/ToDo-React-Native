// Database logic
import AsyncStorage from "@react-native-async-storage/async-storage";
import { TodoItem } from "./Data";

export const loadTodos = async (): Promise<TodoItem[]> => {
    try {
        const data = await AsyncStorage.getItem('todos');
        return data ? JSON.parse(data) : [];
    } catch (error) {
        console.error('Error loading todos: ', error)
        return [];
    }
}

export const saveTodos = async (todos: TodoItem[]): Promise<void> => {
    try {
        await AsyncStorage.setItem('todos', JSON.stringify(todos))
    } catch (error) {
        console.error('Error saving todos:', error);
    }
}