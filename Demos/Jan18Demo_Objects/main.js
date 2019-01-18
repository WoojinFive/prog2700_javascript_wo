// object literal
var me = {
    name: "michael",
    age: 29,
    favoriteShow: ['JerseyShore', 'Survivor'],
    address: {
        street: "123 main st",
        city: "halifax"
    },
    isRich: false,
    sayHi: function() {console.log('hi');}
}

var foo = "name";
console.log(me["address"]["street"]);
console.log(me.name[0]);

me.sayHi();

// //window.setTimeout(function(){alert('timedout');}, 2000);
// // window.alert('secondline');



// var seconds = 0;
// window.setInterval(
//     function(){
//         seconds++;
//         console.log(seconds);
//     }, 1000); 



// /*
// // objects and functions

// // functions are objects (ie.data)

// function doSOmethingThatTakesAWhile(name, shoeSize, function() {  // callback

// }) 
// {
//     // hit a data source in Australia
//     // takes 2 seconds to get the data
// }

// var myFunction = function() {
//     console.loe('hello from the function');
// }

// function myFunction() {
//     console.loe('hello from the function');
// }
// */




// /*
// Car car = new Car();
// car.drive(); // methods
// */
// // are functions data and executable code?