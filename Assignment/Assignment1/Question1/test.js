"use strict";
var readlineSync = require("readline-sync");

/*
    Author : Woojin Oh
    Date : Oct. 29, 2018
    Description : Program 2 - Message Redaction : Design and write a program that removes all desired letters from any user-entered sentence or phrase.
*/

// function to make redacted phrase
function makeRedactedPhraseArray(inInputPhraseArray, inRedactedLettersArray)
{
    var numberLettersRedacted = 0;
    var redactedPhrase = "";

    for (var i = 0; i < inInputPhraseArray.length; i++)
    {   
        for (var j = 0; j < inRedactedLettersArray.length; j++)
        {
            if (inInputPhraseArray[i].toUpperCase() == inRedactedLettersArray[j].toUpperCase())
            {
                inInputPhraseArray[i] = "_";
                numberLettersRedacted += 1;
            }
        }
        redactedPhrase += inInputPhraseArray[i];
    }
   // redactedPhrase = inInputPhraseArray.join("");
    return [redactedPhrase, numberLettersRedacted];
}

function main()
{
    var regEx = /^quit$/i;

    do
    {
        // Input and Variables
        var inputPhrase = readlineSync.question("Type a phrase (or quit to exit program): ");
        console.log();
        
        if (inputPhrase.toUpperCase() != "QUIT")
        {
            var inputPhraseArray = inputPhrase.split("");
            var regEx2 = /[,]/g;

            // redact letter must be one character and seperated by commas.    
            do{
                var validateNumer = 1;

                var redactLetters = readlineSync.question("Type a comma-separated list of letters to redact: ");
                var redactLetterArray = redactLetters.split(",");

                for (var i = 0; i < redactLetterArray.length; i++)
                {
                    validateNumer = validateNumer * redactLetterArray[i].length;
                }

                if (validateNumer != 1)
                {
                    console.log(`You must enter a list of one character separated by commas.`);
                }
            } while((!regEx2.test(redactLetters) || validateNumer != 1) && redactLetters.length != 1);    

            // Processing
            var resultRedactedPhraseArray = makeRedactedPhraseArray(inputPhraseArray, redactLetterArray);
            
            // Output
            console.log(`Number of letters redacted: ${resultRedactedPhraseArray[1]}`);
            console.log(`Redacted phrase: ${resultRedactedPhraseArray[0]}`);
            console.log();
        }
    } while(!regEx.test(inputPhrase)); // If input is "quit" or "QUIT", then quit the program.
}

if (require.main === module)
{
    main();
}