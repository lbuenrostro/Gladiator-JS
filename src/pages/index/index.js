const $ = require('jquery');
const other = require('../../lib/other');
const appRoot = $('#app');

function Gladiator(health, rage, damage_low, damage_high) {
    this.health = health;
    this.rage = rage;
    this.damage_low = damage_low;
    this.damage_high = damage_high;
}
const player1 = new Gladiator(100, 0, 7, 19);
const player2 = new Gladiator(100, 0, 5, 23);
//check function
function attack(player, other) {
    var normal = Math.floor(Math.random() * damage_high) + damage_low;
    if (Math.floor(Math.random() * 100) + 1 >= player.rage) {
        (player.health -= normal * 2), (player.rage = 0);
    } else {
        (other.health = other.health - normal), (other.rage += 15);
    }
}

function heal(player) {
    if (player.rage >= 10) {
        player.health += 5;
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

// const turn = 1;
// const attacker = player1;
// const defender = player2;

function controlButton() {
    return [
        "<div><button id='attack'>attack</button>",
        "<button id='heal'>heal</button></div>"
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

function attachHandlers() {
    $('#attack').click(function() {
        draw();
    });
    $('#heal').click(function() {
        draw();
    });
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
