'use strict';

const pew_pew = 4;



function match(s1, s2, p1 = 0, p2 = 0) {
	if (s1 === undefined || s2 === undefined || p1 >= s1.length || p2 >= s2.length) {
		return 0;
	} else if (s1[p1] === s2[p2]) {
		return match(s1, s2, p1+1, p2+1) + 1;
	} else {
		let val = 0;
		if (s1[p1] === s2[p2 + 1])
			val += match(s1, s2, p1+1, p2+2) + 0.5;
		if (s1[p1 + 1] === s2[p2])
			val += match(s1, s2, p1+2, p2+1) + 0.5;
		if (val === 0)
			val += match(s1, s2, p1+1, p2+1);
		return val;
	}
}

match.tokenized = (full, testFor) => {
	return full.split(/\s/).map(token => match(token, testFor));
};

function tokenScore(token) {
	return token === undefined ? 0 : Math.pow(token.length, 0.5);
}

function matchTokens(tokens, pattern, tp = 0, pp = 0) {
	if (tp >= tokens.length || pp >= pattern.length) {
		return 0;
	} else {
		return Math.pow(match(tokens[tp], pattern[pp]), pew_pew) / tokenScore(tokens[tp])
			+ matchTokens(tokens, pattern, tp+1, pp)
			+ (matchTokens(tokens, pattern, tp+1, pp+1) / 2);
	}
}

function matchPattern(text, pattern) {
	let tokens = text.toLowerCase().split(/\s/)
		.map(token => token.replace(/\W/g, ''))
		.filter(token => token.length > 0);
	return matchTokens(tokens, pattern.map(t => t.toLowerCase()));
}

function superCoolMatch(text, pattern) {
	return matchPattern(text, pattern) / pattern.length;
}

function bestMatch(text, matches) {
	let best = {key: null, score: 0};
	for(let key in matches) {
		let score = superCoolMatch(text, matches[key]);
		if (score > best.score) {
			best.score = score;
			best.key = key;
		}
	}
	return best;
}

module.exports = bestMatch;

/*
let text = 'Hallo Welt!';

let texts = [
	'Ich möchte suppe Langweilen!',
	'Ich mag Kuchen',
	'Flamingo!',
	'Lebst du noch?',
	'Ich habe noch einen merge request',
	'Was passiert hier?',
	'Bitte konfigurieren Yaa!',
	'Kekse?'
];

for(let text of texts) {
	let res = bestMatch(text, {
		bored: ['langeweile'],
		problem: ['problem'],
		kuchen: ['kuchen'],
		config: ['möchte', 'konfigurieren']
	});
	if (res.score > text.length) {
		console.log(text, '------>', res.key);
	}
}
*/
