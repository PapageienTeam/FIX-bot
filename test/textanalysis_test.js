const textanalysis = require("../src/textanalysis");

const reactionTestDescriptions = [
	{
		name: 'Ping',
		text: [
			'ping',
		],
		expected: 2,
	},
	{
		name: 'Issue',
		text: [
			'Mein issue is jetzt fettig',
		],
		expected: 1,
	},
	{
		name: 'Greeting',
		text: [
			'Hallo, bot!',
		],
		expected: 6,
	},
	{
		name: 'Start timer',
		text: [
			'Start the time!',
		],
		expected: 4,
	},
	{
		name: 'Stop timer',
		text: [
			'Stop the time!',
		],
		expected: 5,
	},
	{
		name: 'Bored',
		text: [
			'Ich hab langeweile',
			'Ich ess mal nen kuchen',
			'Ich kicker jetzt statt zu arbeiten',
			'Erst mal nen kaffee',
			'Wer will clubmate?',
			'Ich hol mir ne cola',
			'Ein wenig schwarzes gold wäre jetzt echt mal schön',
		],
		expected: 3,
	},
	{
		name: 'Nothing',
		text: [
			'Um 20:15 im Auditorium sein!',
		],
		expected: -1,
	},
]

for(const testDescription of reactionTestDescriptions) {
	for(const inputText of testDescription.text) {
		test(`Detects "${inputText}" to be ${testDescription.name}`, () => {
			expect(textanalysis.reaction({text: inputText})).toBe(testDescription.expected);
		});
	};
}
