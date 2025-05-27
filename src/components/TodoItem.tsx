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
		<div className='flex flex-row gap-2 py-4 justify-between items-center min-w-[500px]'>
			<div className='flex flex-row gap-2 items-center'>
				{isEditing ? (
					<Input
						value={todo.text}
						onChange={e => todoStore.updateTodo(todo.id, e.target.value)}
					/>
				) : (
					<span className={todo.completed ? 'line-through' : ''}>
						{todo.text}
					</span>
				)}
			</div>
			<div className='flex flex-row gap-2 items-center'>
				<Checkbox
					checked={todo.completed}
					onCheckedChange={() => todoStore.toggleTodo(todo.id)}
				/>
				<Button
					onClick={() => setIsEditing(!isEditing)}
					variant='outline'
					className='cursor-pointer'>
					{isEditing ? 'Save' : 'Edit'}
				</Button>
				<Button
					onClick={() => todoStore.removeTodo(todo.id)}
					variant='outline'
					className='bg-red-500 text-white hover:bg-red-600 hover:text-white cursor-pointer'>
					Delete
				</Button>
			</div>
		</div>
	);
});
