"use strict";

/*
    Author : Woojin Oh
    Date : Jan. 14, 2019
    Description : Assignment 1 - Question 3
*/

// Input and Variables
// Get current time
var currentDate = new Date().getTime();
// Set my next birthday
var myNextBirthdayDate = new Date("Jul 19, 2019 00:00:00").getTime();
var timeDifference = myNextBirthdayDate - currentDate;

// Processing
var leftWeeks = parseInt(timeDifference / (1000 * 60 * 60 * 24 * 7));
var leftDays = parseInt(timeDifference / (1000 * 60 * 60 * 24));
var leftHours = parseInt((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ;
var leftMinutes = parseInt((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
var leftSeconds = parseInt((timeDifference % (1000 * 60)) / 1000);

// Output
console.log("There are " + leftWeeks + " weeks, " + leftDays + " days, " + leftHours + " hours, " + leftMinutes + " minutes, and " + leftSeconds + " until my next birthday!");