'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';
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
				{todoStore.todos.map(todo => (
					<div key={todo.id}>
						<input
							type='checkbox'
							checked={todo.completed}
							onChange={() => todoStore.toggleTodo(todo.id)}
						/>
					</div>
				))}
			</div>
		</div>
	);
});
