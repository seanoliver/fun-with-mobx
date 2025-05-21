import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

export default function Home() {
	return (
		<div className='grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]'>
			<h1 className='text-4xl font-bold'>My Todo List</h1>
			<div className='flex flex-row gap-4'>
				<Input
					type='text'
					placeholder='Add a new todo'
				/>
				<Button>Add</Button>
			</div>
		</div>
	);
}
