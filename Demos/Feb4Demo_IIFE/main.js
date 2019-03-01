
// doSomethingCool();

// function declaration -> hoisted
// function doSomethingCool() {
//     console.log('doing cool stuff');
// }

// function expression
// var doSomethingCool = function() {

//     var x = 123;

//     console.log('doing cool expression stuff');
// }

// doSomethingCool();

// (function() {
//     console.log('doing cool');
// }) ();


// IMMEDIATELY INVOKED FUNCTION EXPRESSION
(function() {
    var players = [];
    var runningTotal = 0;

    var calculateTotal = function() {
        runningTotal + 12321241;
    }

    var switchPlayer = function() {
        players.push('new player');
    }
}) ();