'use client';

import React from 'react';
import { observer } from 'mobx-react-lite';
import { useStore } from '@/stores/StoreContext';
import { TodoItem } from './TodoItem';
import { AddTodo } from './AddTodo';
import { Tooltip } from './Tooltip';

interface TodoListProps {}

export const TodoList = observer(({}: TodoListProps) => {
	const { todoStore } = useStore();

	const hasCompletedTodos = todoStore.completedTodosCount > 0;

	return (
		<div>
			<div>
				<Tooltip active={hasCompletedTodos}>
					<span>{todoStore.completedTodosCount} completed</span>
				</Tooltip>
				<span> | </span>
				<span>{todoStore.pendingTodosCount} pending</span>
			</div>
			<div className='flex flex-col gap-2 p-4 justify-start items-start'>
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
