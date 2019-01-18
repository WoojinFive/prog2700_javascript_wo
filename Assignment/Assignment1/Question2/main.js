"use strict";

/*
    Author : Woojin Oh
    Date : Jan. 14, 2019
    Description : Question 1
*/

function main()
{
    // Input and Variables
    // var promptArray = [1, 2, 3, 6, 9, 34, 2, 6];
    var promptArray = [3, 2, 7, 5, 6, 7, 3, 8, 9, 10, 23, 2, 1, 2, 3];
    // var promptArray = [100, 101, 102, 3, 4, 5, 6, 9];

    var startingIndex = [];
    var endingIndex = [];

    var diffIndex = [];
    var sumNumber = [];

    var resultArray = [];

    // Processing
    // find starting and ending index
    for (var i = 0; i < promptArray.length; i++) {
        if (promptArray[i+1] === promptArray[i] + 1) {
            startingIndex.push(i);
        
            while (promptArray[i] + 1 === promptArray[i+1])
            {
                i++;
            }
            endingIndex.push(i);
        }
    }

    for (var i = 0; i < startingIndex.length; i++) {
        diffIndex.push(endingIndex[i]-startingIndex[i]);
    }

    for (var i = 0; i < startingIndex.length; i++) {
        var sum = 0;
        for (var j = startingIndex[i]; j < endingIndex[i] + 1; j++) {
            sum += promptArray[j];
        }
        sumNumber.push(sum);
    }

    for (var i = 0; i < sumNumber.length; i++) {
        resultArray.push([sumNumber[i],diffIndex[i]]);
    }

    resultArray.sort(function(a, b) {
        if(a[1] === b[1]) {
            return a[0] < b[0];
        }

        return a[1] < b[1];
    });


    // Output
    console.log("The sum of the longest streak of consecutive increasing numbers is: " + resultArray[0][0]);
}

if (require.main === module)
{
    main();
}