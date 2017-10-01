var keywordsBored = /(langweilig|Langeweile|langweile|!bored|Mir ist langweilig!)/i
var keywordsShowIssues = /(!showIssues|Zeig mir meine offenen Issues!|!issues)/i
var keywordsLifesign = /(!lifesign|!ping|!pong|!nochda|Bist du noch da?)/i
var keywordsStartTimer = /(Setze den timer)/i
var keywordsStopTimer = /(Stoppe den timer)/i
var keywordsGreeting = /(Hallo gitbot)/i

//Testing messages for specific keywords

//Compare given Regex-Collections to received string
function contains(message,keywords){
    return (message.text.match(keywords) != null);
}

//Checks for "keywordsBored" in a received String
function isBored(message){
    return (contains(message, keywordsBored));
}
//Checks for "keywordsShowIssues" in a received String
function wantsIssues(message){
    return (contains(message, keywordsShowIssues));
}
//Checks for "keywordslifesign" in a received string
function wantsLifesign(message){
    return (contains(message, keywordsLifesign));
}

function shouldStartTimer(message) {
    return contains(message, keywordsStartTimer);
}

function shouldStopTimer(message) {
    return contains(message, keywordsStopTimer);
}
function wantsGreeting(message) {
    return contains(message,keywordsGreeting);
}

const superCoolMatchStuff = require('./super-match');
const patterns = {
    issue: ['mein', 'Issue'],
    ping: ['ping'],
    greeting: ['hallo', 'bot'],
    bored0: ['langeweile'],
    bored1: ['kuchen'],
    bored2: ['kicker'],
    bored3: ['kaffee'],
    bored4: ['clubmate'],
    bored5: ['cola'],
    bored6: ['schwarz', 'gold'],
    startTimer: ['start', 'Time'],
    stopTimer: ['stop', 'Time']
};

/**
* Returns wanted reation in form of an integer
* 0 = no reaction
* 1 = display Issues, "wanted message" sendMessage (<@MEMBERID>+ "bla") | Array: db.issue.listbySlackUserID(MEMBERID) => String
* 2 = Ping-Command  sendMessage (<@here> + "Hi leute")
* 3 = display Issues, "friendly suggestion" sendMessage (<@MEMBERID>+ "bla") | Array: db.issue.listbySlackUserID(MEMBERID) => String
**/
function reaction(message){
    let res = superCoolMatchStuff(message.text, patterns);
    if (res.score > message.text.length) {
        switch(res.key) {
            case 'issue': return 1;
            case 'ping': return 2;
            case 'greeting': return 6;
            case 'bored0':
            case 'bored1':
            case 'bored2':
            case 'bored3':
            case 'bored4':
            case 'bored5':
            case 'bored6':
                return 3;
            case 'startTimer':
                return 4;
            case 'stopTimer':
                return 5;
            default: return -1;
        }
    } else {
        return -1;
    }

    /*
    if(wantsIssues(message)) return 1;
    else if(wantsLifesign(message)) return 2;
    else if (wantsGreeting(message)) return 6;
    else if (isBored(message)) return 3;
    else if (shouldStartTimer(message)) return 4;
    else if (shouldStopTimer(message)) return 5;
    else return -1;
    */
}

//Export checking for Boredom/Issue-Command/Ping-Command
module.exports = {
    isBored: isBored,
    wantsIssues: wantsIssues,
    wantsLifesign: wantsLifesign,
    reaction: reaction,
    shouldStartTimer: shouldStartTimer,
    shouldStopTimer: shouldStopTimer}

// Rem best grill ヽ༼ຈل͜ຈ༽ﾉ //
