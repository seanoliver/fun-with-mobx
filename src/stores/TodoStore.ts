import { action, computed, makeObservable, observable } from 'mobx';
import { v4 as uuidv4 } from 'uuid';

export interface Todo {
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
			updateTodo: action,
			toggleTodo: action,
			removeTodo: action,
			completedTodosCount: computed,
			pendingTodosCount: computed,
			loadTodos: action,
			saveTodos: action,
		});
	}

	loadTodos() {
		const todos = localStorage.getItem('todos');
		if (todos) {
			this.todos = JSON.parse(todos);
		}
	}

	saveTodos() {
		localStorage.setItem('todos', JSON.stringify(this.todos));
	}

	addTodo(text: string) {
		this.todos.push({
			id: uuidv4(),
			text,
			completed: false,
		});
		this.saveTodos();
	}

	updateTodo(id: string, text: string) {
		const todo = this.todos.find(todo => todo.id === id);
		if (todo) {
			todo.text = text;
		}
		this.saveTodos();
	}

	toggleTodo(id: string) {
		const todo = this.todos.find(todo => todo.id === id);
		if (todo) {
			todo.completed = !todo.completed;
		}
		this.saveTodos();
	}

	removeTodo(id: string) {
		this.todos = this.todos.filter(todo => todo.id !== id);
		this.saveTodos();
	}

	get completedTodosCount() {
		return this.todos.filter(todo => todo.completed).length;
	}

	get pendingTodosCount() {
		return this.todos.filter(todo => !todo.completed).length;
	}
}

export default TodoStore;
