/*
    Author : Woojin Oh
    Date : Mar. 1, 2019
    Description : TECH CHECK #3 - Array FUNctions
*/

//PROG 2700 - CLIENT SIDE PROGRAMMING
//TECH CHECK #3 - Array FUNctions

// Using the data retrieved from the API Endpoint, 
// write a function called 'getPopulation' that returns the total population
// for all countries that BOTH border China
// and list English as one of their official languages

//NOTE: You are NOT permitted to use FOR, FOREACH, or WHILE loops of any kind.
//      You must leverage the available JavaScript Array Iteration Functions to accomplish your goal.
//      https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array#Iteration_methods

// MARKING
// 10/10 - Function is completed to spec and submitted within class time
//  8/10 - Function is completed to spec and submitted within grace period of twelve hours of Tech Check start time (ie before 8:30pm tonight)
//  6/10 - Function is completed to spec and submitted after twelve-hour grace period 8:30pm
//  0/10 - Function is not completed


(function(){

    fetch(`https://restcountries.eu/rest/v2/all`)
        .then(response => response.json())
        .then(json => {
            //DO NOT MODIFY THIS CODE
            console.log(`TOTAL POPULATION: ${ getPopulation(json) }`);
            console.assert( getPopulation(json) === 1496659362, "Incorrect population total returned by getPopulation function" );
        })

    //WRITE YOUR FUNCTION BELOW THIS LINE
    var getPopulation = function(jsonInput) {

        var languageCheck = function(element) {
            return element.name === "English";
        }

        return jsonInput.filter(x => x.borders.includes("CHN") && x.languages.some(languageCheck)).map(x => x.population).reduce((a, b) => a + b);
    }
    

})();