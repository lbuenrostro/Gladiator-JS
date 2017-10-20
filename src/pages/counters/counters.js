const $ = require('jquery');
const appRoot = $('#app');

const STATE = {
    count: 0
};

function viewCounter() {
    return [
        "<div><button id='up'> + </button></div>",
        STATE.count,
        "<div><button id='down'> - </button>,</div>"
    ].join('');
}

//MAIN ENGINE
function draw() {
    appRoot.html(viewCounter());
    attachHandlers();
}
//End of MAIN ENGINE

function attachHandlers() {
    $('#up').click(function() {
        STATE.count += 1;
        draw();
    });
    $('#down').click(function() {
        STATE.count -= 1;
        draw();
    });
}

function main() {
    attachHandlers();
}
$(main);
