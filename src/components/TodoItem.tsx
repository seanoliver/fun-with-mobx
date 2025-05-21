import { useStore } from '@/stores/StoreContext';
import { Todo } from '@/stores/TodoStore';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface TodoItemProps {
	todo: Todo;
}

export const TodoItem = observer(({ todo }: TodoItemProps) => {
	const [isEditing, setIsEditing] = useState(false);
	const { todoStore } = useStore();
	return (
		<div className='flex flex-row gap-2'>
			{isEditing ? (
				<Input
					value={todo.text}
					onChange={e => todoStore.updateTodo(todo.id, e.target.value)}
				/>
			) : (
				<span>{todo.text}</span>
			)}
			<Checkbox
				checked={todo.completed}
				onChange={() => todoStore.toggleTodo(todo.id)}
			/>
			<Button onClick={() => setIsEditing(!isEditing)}>
				{isEditing ? 'Save' : 'Edit'}
			</Button>
			<Button onClick={() => todoStore.removeTodo(todo.id)}>Delete</Button>
		</div>
	);
});
