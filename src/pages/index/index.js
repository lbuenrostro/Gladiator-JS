const $ = require('jquery');
const other = require('../../lib/other');
const appRoot = $('#app');

function Gladiator(health, rage, damageLow, damageHigh) {
    this.health = health;
    this.rage = rage;
    this.damageLow = damageLow;
    this.damageHigh = damageHigh;
}
const player1 = new Gladiator(100, 0, 7, 19);
const player2 = new Gladiator(100, 0, 5, 23);
STATE = {
    turn: 0,
    update: ''
};

function attack(player, defender) {
    var normal =
        Math.floor(Math.random() * player.damageHigh) + player.damageLow;
    if (Math.floor(Math.random() * 100) + 1 <= player.rage) {
        defender.health -= normal * 2;
        player.rage = 0;
        STATE.update = 'HIT OF ' + normal * 2 + ' POINTS!';
    } else {
        defender.health -= normal;
        player.rage += 15;
        STATE.update = 'HIT OF ' + normal + ' POINTS!';
    }
    if (defender.health <= 0) {
        defender.health = 0;
        STATE.update = 'NO HIT!';
    }
}

// kick function
function kick(player, defender) {
    var kik = Math.floor(Math.random() * 40) + 20;
    if (player.rage >= 25) {
        defender.health -= kik;
        player.rage = 0;
    }
    if (defender.health <= 0) {
        defender.health = 0;
    }
}

// Increase Rage function
function increaseRage(player) {
    player.rage += 15;
}

function heal(player) {
    if (player.rage >= 10) {
        player.health += 5;
        player.rage -= 10;
        if (player.health > 100) {
            player.health = 100;
        }
    } else if (player.rage < 0) {
        player.rage = 0;
    }
}

function is_dead(player) {
    if (player.health <= 0) {
        return true;
    } else {
        return false;
    }
}

function startOver(playing, defending) {
    STATE.update = '';
    STATE.turn = 0;
    playing.health = 100;
    defending.health = 100;
    playing.rage = 0;
    defending.rage = 0;
}

function turns() {
    if (STATE.turn == 0) {
        STATE.turn = 1;
    } else {
        STATE.turn = 0;
    }
}

function turnOne() {
    if (STATE.turn == 0) {
        return player1;
    } else {
        return player2;
    }
}

function turnTwo() {
    if (STATE.turn == 1) {
        return player1;
    } else {
        return player2;
    }
}

function attachHandlers() {
    $('#attack').click(function() {
        attack(turnOne(), turnTwo());
        turns();

        draw();
    });
    $('#kick').click(function() {
        kick(turnOne(), turnTwo());
        turns();
        draw();
    });

    $('#increaseRage').click(function() {
        increaseRage(turnOne());
        turns();
        draw();
    });

    $('#heal').click(function() {
        heal(turnOne());
        turns();
        draw();
    });
    $('#startOver').click(function() {
        startOver(turnOne(), turnTwo());
        turns();
        draw();
    });
}

function controlButton() {
    return [
        STATE.update,
        "<div><button id='attack'>attack</button>\n",
        "<button id='kick'>kick</button>\n",
        "<button id='increaseRage'>Increase Rage</button>\n",
        "<button id='heal'>heal</button>\n",
        "<button id='startOver'>Start Over</button></div>"
    ].join('');
}

function displayGld(player) {
    return [
        '<div><h3>Gladiator Health: </h3>',
        player.health,
        '<h3>Gladiator Rage: </h3>',
        player.rage,
        '<hr/>'
    ].join('');
}

function draw() {
    appRoot.html(displayGld(player1) + displayGld(player2) + controlButton());
    attachHandlers();
}

function main() {
    draw();
}

$(main);
// function hello() {
//     $('body').append('<h1> Good Bye!</h1>');
//     other.foo();
// }

// function newFunc() {
//     return 2;
// }
// function add(a, b) {
//     return a + b;
// }

// $(hello);

// exports.hello = hello;
// exports.add = add;
