const textanalysis = require("../src/textanalysis");

var testLangeweile = "Mir ist langweilig";
var testIssues = "!showIssues bitte";
var testPing = "!lifesign";
const startTimerMessage = "Bekämpfe meine langeweile"
const stopTimerMessage = "Mir ist nie langweilig"

test('isBored funktioniert', () => {
	expect(()=> isBored(testLangeweile)).toBeTruthy();
});
test('wantsIssues funktioniert', () => {
	expect(()=> wantsIssues(testIssues)).toBeTruthy();
});
test('wantsLifesign funktioniert', () => {
	expect(()=> wantsLifesign(testPing)).toBeTruthy();
});
test('reaction funktioniert',() => {
	//	console.log({text:testPing});
		expect(textanalysis.reaction({text:testPing})).toEqual(2);
});

test('Detects timer start', () => {
	expect(textanalysis.shouldStartTimer({text: startTimerMessage})).toBe(true);
})

test('Detects timer stop', () => {
	expect(textanalysis.shouldStopTimer({text: stopTimerMessage})).toBe(true);
})
