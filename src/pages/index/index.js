const $ = require('jquery');
const other = require('../../lib/other');
const appRoot = $('#app');

function Gladiator(name, health, rage, damageLow, damageHigh) {
    this.name = name;
    this.health = health;
    this.rage = rage;
    this.damageLow = damageLow;
    this.damageHigh = damageHigh;
}
const player = new Gladiator('Gladiator ONE 💀', 100, 0, 7, 19);
const defender = new Gladiator('Gladiator TWO 💀', 100, 0, 5, 23);

STATE = {
    turn: 0,
    update: ''
};

function turns() {
    if (STATE.turn == 0) {
        STATE.turn = 1;
    } else {
        STATE.turn = 0;
    }
}

function turnOne() {
    if (STATE.turn == 0) {
        return player;
    } else {
        return defender;
    }
}

function turnTwo() {
    if (STATE.turn == 1) {
        return player;
    } else {
        return defender;
    }
}

function displayGld(player) {
    return [
        '<div class="col-lg-6"',
        '<div><h3>',
        player.name,
        '</h3>',
        '<h3> Health: ',
        player.health,
        '</h3>',
        '<h3>Gladiator Rage: ',
        player.rage,
        '</h3>',
        '<hr/>',
        '</div>'
    ].join('');
}

function controlButton() {
    return [
        "<div class='damage'>",
        STATE.update,
        '</div>',
        "<div><button id='attack'>attack</button>\n",
        "<button id='kick'>kick</button>\n",
        "<button id='increaseRage'>Increase Rage</button>\n",
        "<button id='heal'>heal</button>\n",
        "<button id='startOver'>Start Over</button></div>"
    ].join('');
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

function playerIsDead(player) {
    appRoot.html(
        '<h2> ' +
            player.name +
            ' Is DEAD! </br></h2><button onclick="document.location.reload()"> RESTART </button>'
    );
}
function defenderIsDead(defender) {
    appRoot.html(
        '<h2> ' +
            defender.name +
            ' Is DEAD! </br></h2><button onclick="document.location.reload()"> RESTART </button>'
    );
}
function isForrealDead(player, defender) {
    if (player.health <= 0) {
        playerIsDead(player);
    } else if (defender.health <= 0) {
        defenderIsDead(defender);
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

function draw() {
    appRoot.html(displayGld(player) + displayGld(defender) + controlButton());
    attachHandlers();
    isForrealDead(player, defender);
}
function main() {
    draw();
}

$(main);
