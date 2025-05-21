import { action, computed, makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

interface Todo {
	id: string;
	text: string;
	completed: boolean;
}

class TodoStore {
	todos: Todo[] = [];

	constructor() {
		makeObservable(this, {
			todos: observable,
			addTodo: action,
			toggleTodo: action,
			removeTodo: action,
			completedTodosCount: computed,
			pendingTodosCount: computed,
		});
	}

	addTodo(text: string) {
		this.todos.push({
			id: uuidv4(),
			text,
			completed: false,
		});
	}

	toggleTodo(id: string) {
		const todo = this.todos.find(todo => todo.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
	}

	removeTodo(id: string) {
		this.todos = this.todos.filter(todo => todo.id !== id);
	}

	get completedTodosCount() {
		return this.todos.filter(todo => todo.completed).length;
	}

	get pendingTodosCount() {
		return this.todos.filter(todo => !todo.completed).length;
	}
}

export default TodoStore;
