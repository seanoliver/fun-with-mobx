'use client';

import { createContext, useContext } from 'react';
import TodoStore from './TodoStore';

const StoreContext = createContext<{
	todoStore: TodoStore;
} | null>(null);

export const StoreProvider = ({ children }: { children: React.ReactNode }) => {
	const todoStore = new TodoStore();

	return (
		<StoreContext.Provider value={{ todoStore }}>
			{children}
		</StoreContext.Provider>
	);
};

export const useStore = () => {
	const context = useContext(StoreContext);
	if (!context) {
		throw new Error('useStore must be used within a StoreProvider');
	}
	return context;
};
