import { useStore } from '@/stores/StoreContext';
import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Button } from './ui/button';
interface AddTodoProps {}

export const AddTodo = observer(({}: AddTodoProps) => {
	const { todoStore } = useStore();
	const [newTodoText, setNewTodoText] = useState('');

	const handleAddTodo = () => {
		if (newTodoText.trim()) {
			todoStore.addTodo(newTodoText);
			setNewTodoText('');
		}
	};

	return (
		<div className='flex flex-row gap-2'>
			<Input
				value={newTodoText}
				onChange={e => setNewTodoText(e.target.value)}
			/>
			<Button
				onClick={handleAddTodo}
				className='cursor-pointer'>
				Add
			</Button>
		</div>
	);
});
