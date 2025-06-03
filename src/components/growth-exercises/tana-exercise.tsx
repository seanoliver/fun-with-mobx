import { useEffect, useState } from 'react';

import './styles.css';

/**
 * README
 *
 * This is a single component file that contains a service class
 * for fetching data performing business logic
 *
 * The goal of this exercise is to fill in two methods in the
 * service class - *one* loads data in, and *another* produces
 * a _list of strings_ based on the data that was loaded.
 *
 * After the two methods are filled in, we would like to complete
 * the App component further down in the file, to first show a "loading
 * state" while the data is being fetched and then to render the list
 * of strings as a _list of elements_ within the component.
 *
 * You may not install any dependencies other than what are provided.
 */

class StringReverseService {
	private fetchedString: string | undefined;
	get value(): string {
		return this.fetchedString ?? '';
	}

	async fetch() {
		/**
		 * Fetch a random string from this API:
		 *   https://random-word-api.herokuapp.com/word
		 *
		 * The function should do the following.
		 *   1 - Fetch the data from the API above and set the string
		 *       fetchString to the value.
		 *   2 - On error, set string to "error"
		 *   2 - Ensure the call to fetch takes at approximately 5 seconds
		 *       to complete (so we can see the UI do something)
		 *       NOTE: This means you have to include the fetch call in the
		 *       time.
		 */
		this.fetchedString = '';

		try {
			const delay = new Promise(resolve => setTimeout(resolve, 5000));
			const fetchPromise = fetch('https://random-word-api.herokuapp.com/word');
			const response = await Promise.all([fetchPromise, delay]).then(
				([res]) => res as Response
			);

			if (!response.ok) {
				throw new Error('Error fetching string');
			}

			const result = await response.json();
			this.fetchedString = result[0];
			return this.fetchedString;
		} catch (error) {
			this.fetchedString = 'error';
			return this.fetchedString;
		}
	}

	getStepsTillReversed(): string[] {
		/**
		 *  This function does the following: it returns the _steps_
		 *  you took to go from the non-reversed string to the reversed string
		 *
		 *  E.g. if the string was "hello", depending on how you
		 *  implement string reversal, it could return
		 *  ['o', 'ol', 'oll', 'olle', 'olleh']
		 *
		 *  Note 1: The above is just an example and not necessarily
		 *  the steps that could be taken.
		 *
		 *  Note 2: The implementation of this function does not have
		 *  to be an array return type. You can implement it however you
		 *  see fit as long as you can use the API within the component.
		 *  E.g. via generators, or callbacks, or even a crazy pub sub
		 *  system.
		 */
		if (!this.fetchedString) return [];

		const stepsArray = [];
		const reversed = this.fetchedString.split('').reverse();

		let runningStr = '';
		for (let i = 0; i < reversed.length; i++) {
			runningStr += reversed[i];
			stepsArray.push(runningStr);
		}

		return stepsArray;
	}
}

/**
 * This is the instantiation of the global string reverse service. Use this
 * in the component for your data needs.
 */
const service = new StringReverseService();

const useStringReverseServiceAPI = () => {
	const [word, setWord] = useState<string | null>(null);
	const [steps, setSteps] = useState<string[] | null>(null);
	const [isLoading, setIsLoading] = useState(false);

	const fetchString = async () => {
		const value = await service.fetch();
		setWord(value ?? null);
	};

	const getStepsTillReversed = () => {
		return service.getStepsTillReversed();
	};

	useEffect(() => {
		const fetchWord = async () => {
			setIsLoading(true);
			await fetchString();
			setIsLoading(false);
		};
		fetchWord();
	}, []);

	useEffect(() => {
		if (!word || word === 'error') return;
		const steps = getStepsTillReversed();
		setSteps(steps);
	}, [word]);

	return { word, isLoading, steps };
};

export default function App() {
	/**
	 * In this component, the following should happen
	 *
	 *   1 - First fetch the random word, and while the word is being fetched
	 *     output some string saying that we are "fetching the data"
	 *
	 *   2 - After the string is fetched, we want to display the following:
	 *      a) The string that was fetched
	 *      b) a list of elements that represent the steps that are
	 *         returned from service.getStepsTillReversed()
	 */
	const { word, isLoading, steps } = useStringReverseServiceAPI();

	if (isLoading) {
		return <div>Loading...</div>;
	}

	if (word === 'error') {
		return <div>Something went wrong while fetching the word.</div>;
	}

	return (
		<div className='App'>
			<p>Current value: {word}</p>
			{steps && steps.length > 0 && (
				<>
					<p>Steps:</p>
					<ul>
						{steps.map(step => (
							<li key={step}>{step}</li>
						))}
					</ul>
				</>
			)}
		</div>
	);
}
