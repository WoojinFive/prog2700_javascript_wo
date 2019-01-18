var generatedArray = [];
var lengthOfArray = 10;
var outputArray = [];

while (generatedArray.length < lengthOfArray) {
    var randomNumber = Math.floor(Math.random() * (100 - 1)) + 1;
    if (generatedArray.indexOf(randomNumber) === -1) {
        generatedArray.push(randomNumber);
    }
}

for (var i = 0; i < generatedArray.length; i++) {
    var countZeroRemainder = 0;
    for (var j = 1; j < generatedArray[i] + 1; j++) {
        if (generatedArray[i] % j === 0) {
            countZeroRemainder++;
        }
    }
    if (countZeroRemainder === 2) {
        outputArray.push("yes");
    }
    else {
        outputArray.push("no");
    }
}

console.log(generatedArray[0] + "-" + outputArray[0] + ", " +
            generatedArray[1] + "-" + outputArray[1] + ", " +
            generatedArray[2] + "-" + outputArray[2] + ", " +
            generatedArray[3] + "-" + outputArray[3] + ", " +
            generatedArray[4] + "-" + outputArray[4] + ", " +
            generatedArray[5] + "-" + outputArray[5] + ", " +
            generatedArray[6] + "-" + outputArray[6] + ", " +
            generatedArray[7] + "-" + outputArray[7] + ", " +
            generatedArray[8] + "-" + outputArray[8] + ", " +
            generatedArray[9] + "-" + outputArray[9]);

