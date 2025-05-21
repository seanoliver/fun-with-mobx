'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';

interface TodoListProps {}

export const TodoList = observer(({}: TodoListProps) => {
	const { todoStore } = useStore();

	return (
		<div>
			<div>
				<span>{todoStore.completedTodosCount} completed</span>
				<span> | </span>
				<span>{todoStore.pendingTodosCount} pending</span>
			</div>
			<div>
				<AddTodo />
				{todoStore.todos.map(todo => (
					<TodoItem
						key={todo.id}
						todo={todo}
					/>
				))}
			</div>
		</div>
	);
});
