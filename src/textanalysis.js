'use strict';

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
* -1  = no reaction
* 1 = display Issues, "wanted message" sendMessage (<@MEMBERID>+ "bla") | Array: db.issue.listbySlackUserID(MEMBERID) => String
* 2 = Ping-Command  sendMessage (<@here> + "Hi leute")
* 3 = display Issues, "friendly suggestion" sendMessage (<@MEMBERID>+ "bla") | Array: db.issue.listbySlackUserID(MEMBERID) => String
* 4 = start the break timer
* 5 = stop the break timer
* 6 = send a greeting
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
}

//Export checking for Boredom/Issue-Command/Ping-Command
module.exports = {
    reaction,
}

// Rem best grill ヽ༼ຈل͜ຈ༽ﾉ //
