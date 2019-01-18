"use strict";

/*
    Author : Woojin Oh
    Date : Jan. 14, 2019
    Description : Question 1
*/

function main()
{
    // Input and Variables
    //var promptString = "Triscuit";
    var promptString = "Cracker";
    
    var promptStringArray = promptString.split(""); // Convert string to array using split.
    var newPromptStringArray = [];
    var finalString = [];

    // Processing
    // If the first and last characters of the string are the same, the function will return the string in reverse order.
    if (promptStringArray[0].toUpperCase() === promptStringArray[promptStringArray.length - 1].toUpperCase())
    {
        // Make new array with returning the string in reverse order.
        for (var i = 0; i < promptStringArray.length; i++)
        {
            newPromptStringArray.push(promptStringArray[promptStringArray.length - 1 - i]);
        }

        // Make final String using join.
        finalString = newPromptStringArray.join("");
    }
    // If the first and last characters of the string are not the same, the function return the string with the first and last letters removed.
    else if(promptStringArray[0].toUpperCase() != promptStringArray[promptStringArray.length - 1].toUpperCase())
    {
        // Remove first letter.
        promptStringArray.shift();
        // Remove last letter.
        promptStringArray.pop();

        // Make final String using join.
        finalString = promptStringArray.join("");
    }

    // Output
    console.log("Prompted String: " + promptString + "\n" + "Converted String: " + finalString);
}
	
if (require.main === module)
{
    main();
}
