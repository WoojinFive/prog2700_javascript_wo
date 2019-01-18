"use strict";

var currentDate = new Date().getTime();
var myNextBirthdayDate = new Date("Jul 19, 2019 00:00:00").getTime();
var timeDifference = myNextBirthdayDate - currentDate;

var leftWeeks = parseInt(timeDifference / (1000 * 60 * 60 * 24 * 7));
var leftDays = parseInt(timeDifference / (1000 * 60 * 60 * 24));
var leftHours = parseInt((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)) ;
var leftMinutes = parseInt((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
var leftSeconds = parseInt((timeDifference % (1000 * 60)) / 1000);

console.log("There are " + leftWeeks + " weeks, " + leftDays + " days, " + leftHours + " hours, " + leftMinutes + " minutes, and " + leftSeconds + " until my next birthday!");