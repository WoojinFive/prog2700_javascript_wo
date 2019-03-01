// function sayHello() {
//     return "hello";
// }

// sayHello.language = "English";
// sayHello.doSomethingElse = function() {
//     return "Doing something else";
// }

// sayHello.doSomethingElse.foo = "bar";

// console.log(sayHello());
// console.log(sayHello);
// console.log(sayHello.language);
// console.log(sayHello.doSomethingElse())

var me = {
    name: "Michael",
    age: 29
}

console.log(me);

//convert to JSON data

var stringMe = JSON.stringify(me);
console.log(stringMe);

var me2 = {
    name: "Michael",
    age: "29"
}

var stringMe2 = JSON.stringify(me2);

console.log(JSON.parse(stringMe2));