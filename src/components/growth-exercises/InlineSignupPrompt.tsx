const ContentView = ({
	content,
	loggedIn,
}: {
	content: string;
	loggedIn: boolean;
}) => {
	if (loggedIn) {
		return <div>{content}</div>;
	}
	const paragraphs = content.split('\n\n');
	return (
		<div>
			{paragraphs.map((paragraph, index) => {
				const showPrompt = index === 2;
				return (
					<React.Fragment key={index}>
						{showPrompt && <InlineSignupPrompt />}
						<p>{paragraph}</p>
					</React.Fragment>
				);
			})}
		</div>
	);
};

const InlineSignupPrompt = () => {
	return (
		<div className='signup-cta'>
			<p>Enjoying this content?</p>
			<button>Sign up to continue</button>
		</div>
	);
};
