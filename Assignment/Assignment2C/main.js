/*
    Author : Woojin Oh
    Date : Feb. 6, 2019
    Description : Assignment 2C - RETRIEVING API DATA
*/

// IMMEDIATELY INVOKED FUNCTION EXPRESSION
(function() {
    // fetch api to get deck ID
    fetch('https://deckofcardsapi.com/api/deck/new/shuffle/?deck_count=1')
        .then(response => response.json())
        .then(function(json) {
            var deckID = json.deck_id;

            // fetch api to shuffle
            fetch('https://deckofcardsapi.com/api/deck/' + deckID + '/shuffle/')
                .then(response => response.json())

                //JQUERY AJAX CALL
                $(document).ready(function(){
                    $.ajax(
                        {
                            url: 'https://deckofcardsapi.com/api/deck/' + deckID + '/draw/?count=5', 
                            success: function(result)
                                {
                                    // display given cards on the screen
                                    for(var i = 0; i < result.cards.length; i++) {
                                        $(`#givenCards #card${i+1} #value`).html(result.cards[i].value);
                                        $(`#givenCards #card${i+1} #suit`).html(result.cards[i].suit);
                                        $(`#givenCards #card${i+1} #image`).html(`<img src="` + result.cards[i].image + `">`);
                                    } 

                                    // all numbers of cards
                                    var pokerValues = ["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"];
                                    // poker hands array
                                    var scoreStringArray = ["Royal Flush", "Straight Flush", "Four of a kind", "Full Housh", "Flush",
                                                            "Straight", "Three of a kind", "Two Pair", "Pair", "High card"];

                                    // store index of each value
                                    // ["10", "QUEEN", "3", "ACE", "2"] -> [8, 10, 1, 12, 0]
                                    var indexArray = [];
                                    for (var i = 0; i < result.cards.length; i++) {
                                        result.cards[i].indexNumber = pokerValues.indexOf(result.cards[i].value);
                                    }

                                    // sort by index
                                    // [8, 10, 1, 12, 0] -> [0, 1, 8, 10, 12]
                                    result.cards.sort((a, b) => a.indexNumber - b.indexNumber);

                                    // check all suits have same value
                                    function checkAllSuitsSame(inputArr) {
                                        // https://stackoverflow.com/questions/14832603/check-if-all-values-of-array-are-equal
                                        for (var i = 1; i < result.cards.length; i++) {
                                            if(result.cards[i].suit !== result.cards[0].suit) {
                                                return false;
                                            }
                                        }
                                        
                                        return true;
                                    }

                                    // check same value and how many
                                    function checkSameValue(inputArr) {
                                        var sameValueResultArray = [];

                                        var currentIndex = null;
                                        var currentValue = null;
                                        var currentSuit = null;
                                        var currentImage = null;
                                        var countNumber = 0;
                                        
                                        for (var i = 0; i < inputArr.cards.length; i++) {
                                            // when not same index number
                                            if (inputArr.cards[i].indexNumber !== currentIndex) {
                                                // [1, 1, 3, 4, 5]
                                                //     ----
                                                if (countNumber > 0) {
                                                    sameValueResultArray.push({valueIndex: currentIndex, count: countNumber, value: currentValue, suit: currentSuit, image: currentImage});
                                                    countNumber = 0;
                                                }
                                                // assign card information
                                                currentIndex = inputArr.cards[i].indexNumber;
                                                currentValue = inputArr.cards[i].value;
                                                currentSuit = inputArr.cards[i].suit;
                                                currentImage = inputArr.cards[i].image;
                                                countNumber += 1;
                                            } else { // when meet same index number
                                                countNumber++;
                                            }
                                        }
                                        // save result after for-loop complete
                                        if (countNumber > 0) {
                                            sameValueResultArray.push({valueIndex: currentIndex, count: countNumber, value: currentValue, suit: currentSuit, image: currentImage});
                                            countNumber = 0;
                                        }

                                        return sameValueResultArray;
                                    }

                                    // check royal flush
                                    function checkRoyalFlush(inputArr) {
                                        // index of "10", "JACK", "QUEEN", "KING", "ACE"
                                        var royalFlushIndexArray = [8, 9, 10, 11, 12];

                                        // find same index number value
                                        for (var i = 0; i < inputArr.cards.length; i++) {
                                            // if at least one value not equal, then return false
                                            if (royalFlushIndexArray.indexOf(inputArr.cards[i].indexNumber) === -1) {
                                                return false;
                                            }
                                        }
                                        // if all value equal, then return true
                                        return true;
                                    }

                                    // check Straight flush
                                    function checkStraightFlush(inputArr) {
                                        // check consecutive increasing numbers
                                        for (var i = 0; i < inputArr.cards.length - 1; i++) {
                                            if (inputArr.cards[i+1].indexNumber !== inputArr.cards[i].indexNumber + 1) {
                                                return false;
                                            }
                                        }

                                        return true;
                                    }

                                    // check pair
                                    function checkPair(inputArr) {
                                        var pairResultNumber = 0;
                                        // if there is an element that has count === 2, then pairResultNumber += 1
                                        for (var i = 0; i < checkSameValue(inputArr).length; i++) {
                                            if (checkSameValue(inputArr)[i].count === 2)
                                            {
                                                pairResultNumber += 1;
                                            }
                                        }
                                        // pairResultNumber === 1 means there is only one case that count is 2 ==> only one pair
                                        if (pairResultNumber === 1) {
                                            return true;
                                        }

                                        return false;
                                    }

                                    // check two pair
                                    function checkTwoPair(inputArr) {
                                        var pairResultNumber = 0;
                                        // if there is an element that has count === 2, then pairResultNumber += 1
                                        for (var i = 0; i < checkSameValue(inputArr).length; i++) {
                                            if (checkSameValue(inputArr)[i].count === 2)
                                            {
                                                pairResultNumber += 1;
                                            }
                                        }
                                        // pairResultNumber === 2 means there are two cases that count is 2 ==> two pair
                                        if (pairResultNumber === 2) {
                                            return true;
                                        }

                                        return false;
                                    }

                                    // check three of a kind
                                    function checkThreeSameCards(inputArr) {
                                        // if there is an element that has count === 3, then return true. 
                                        for (var i = 0; i < checkSameValue(inputArr).length; i++) {
                                            if (checkSameValue(inputArr)[i].count === 3)
                                            {
                                                return true;
                                            }
                                        }

                                        return false;
                                    }

                                    // check four of a kind
                                    function checkFourSameCards(inputArr) {
                                        // if there is an element that has count === 4, then return true. 
                                        for (var i = 0; i < checkSameValue(inputArr).length; i++) {
                                            if (checkSameValue(inputArr)[i].count === 4)
                                            {
                                                return true;
                                            }
                                        }

                                        return false;
                                    }

                                    // check result
                                    if (checkAllSuitsSame(result)) {
                                        // Royal Flush = checkAllSuitsSame: true && checkRoyalFlush: true
                                        if (checkRoyalFlush(result)) {
                                            $(`#resultArea`).html('Result : ' + scoreStringArray[0]);
                                            for(var i = 0; i < result.cards.length; i++) {
                                                $(`#result #card${i+1} #value`).html(result.cards[i].value);
                                                $(`#result #card${i+1} #suit`).html(result.cards[i].suit);
                                                $(`#result #card${i+1} #image`).html(`<img src="` + result.cards[i].image + `">`);
                                            } 
                                        }
                                        // Straight Flush = checkAllSuitsSame: true && checkStraightFlush: true
                                        else if (checkStraightFlush(result)) {
                                            $(`#resultArea`).html('Result : ' + scoreStringArray[1]);
                                            for(var i = 0; i < result.cards.length; i++) {
                                                $(`#result #card${i+1} #value`).html(result.cards[i].value);
                                                $(`#result #card${i+1} #suit`).html(result.cards[i].suit);
                                                $(`#result #card${i+1} #image`).html(`<img src="` + result.cards[i].image + `">`);
                                            } 
                                        }
                                        // Flush = checkAllSuitsSame: true && checkRoyalFlush: false && checkStraightFlush: false
                                        else {
                                            $(`#resultArea`).html('Result : ' + scoreStringArray[4]);
                                            for(var i = 0; i < result.cards.length; i++) {
                                                $(`#result #card${i+1} #value`).html(result.cards[i].value);
                                                $(`#result #card${i+1} #suit`).html(result.cards[i].suit);
                                                $(`#result #card${i+1} #image`).html(`<img src="` + result.cards[i].image + `">`);
                                            } 
                                        }
                                    }
                                    // Four of a kind = checkAllSuitsSame: false && checkFourSameCards: true
                                    else if (checkFourSameCards(result)) {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[2]);
                                        for(var i = 0; i < checkSameValue(result).length; i++) {
                                            if (checkSameValue(result)[i].count === 4) {
                                                for (var j = 0; j < result.cards.length; j++) {
                                                    if (checkSameValue(result)[i].value === result.cards[j].value) {
                                                        $(`#result #card${j+1} #value`).html(result.cards[j].value);
                                                        $(`#result #card${j+1} #suit`).html(result.cards[j].suit);
                                                        $(`#result #card${j+1} #image`).html(`<img src="` + result.cards[j].image + `">`);
                                                    }
                                                }
                                            }
                                        } 
                                    }
                                    // Full House = checkAllSuitsSame: false && checkPair: true && checkThreeSameCards: true
                                    else if (checkPair(result) && checkThreeSameCards(result)) {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[3]);
                                        for(var i = 0; i < result.cards.length; i++) {
                                            $(`#result #card${i+1} #value`).html(result.cards[i].value);
                                            $(`#result #card${i+1} #suit`).html(result.cards[i].suit);
                                            $(`#result #card${i+1} #image`).html(`<img src="` + result.cards[i].image + `">`);
                                        } 
                                    }
                                    // Straight = checkAllSuitsSame: false && checkStraightFlush: true
                                    else if (checkStraightFlush(result)) {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[5]);
                                        for(var i = 0; i < result.cards.length; i++) {
                                            $(`#result #card${i+1} #value`).html(result.cards[i].value);
                                            $(`#result #card${i+1} #suit`).html(result.cards[i].suit);
                                            $(`#result #card${i+1} #image`).html(`<img src="` + result.cards[i].image + `">`);
                                        } 
                                    }
                                    // Three of a kind = checkAllSuitsSame: false && checkThreeSameCards: true
                                    else if (checkThreeSameCards(result)) {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[6]);
                                        for(var i = 0; i < checkSameValue(result).length; i++) {
                                            if (checkSameValue(result)[i].count === 3) {
                                                for (var j = 0; j < result.cards.length; j++) {
                                                    if (checkSameValue(result)[i].value === result.cards[j].value) {
                                                        $(`#result #card${j+1} #value`).html(result.cards[j].value);
                                                        $(`#result #card${j+1} #suit`).html(result.cards[j].suit);
                                                        $(`#result #card${j+1} #image`).html(`<img src="` + result.cards[j].image + `">`);
                                                    }
                                                }
                                            }
                                        } 
                                    }
                                    // Two Pair = checkAllSuitsSame: false && checkTwoPair: true
                                    else if (checkTwoPair(result)) {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[7]);
                                        for(var i = 0; i < checkSameValue(result).length; i++) {
                                            if (checkSameValue(result)[i].count === 2) {
                                                for (var j = 0; j < result.cards.length; j++) {
                                                    if (checkSameValue(result)[i].value === result.cards[j].value) {
                                                        $(`#result #card${j+1} #value`).html(result.cards[j].value);
                                                        $(`#result #card${j+1} #suit`).html(result.cards[j].suit);
                                                        $(`#result #card${j+1} #image`).html(`<img src="` + result.cards[j].image + `">`);
                                                    }
                                                }
                                            }
                                        } 
                                    }
                                    // Pair = checkAllSuitsSame: false && checkPair: true
                                    else if (checkPair(result)) {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[8]);
                                        for(var i = 0; i < checkSameValue(result).length; i++) {
                                            if (checkSameValue(result)[i].count === 2) {
                                                for (var j = 0; j < result.cards.length; j++) {
                                                    if (checkSameValue(result)[i].value === result.cards[j].value) {
                                                        $(`#result #card${j+1} #value`).html(result.cards[j].value);
                                                        $(`#result #card${j+1} #suit`).html(result.cards[j].suit);
                                                        $(`#result #card${j+1} #image`).html(`<img src="` + result.cards[j].image + `">`);
                                                    }
                                                }
                                            }
                                        } 
                                    }
                                    // High card = else case
                                    else {
                                        $(`#resultArea`).html('Result : ' + scoreStringArray[9]);
                                        $(`#result #card1 #value`).html(result.cards[4].value);
                                        $(`#result #card1 #suit`).html(result.cards[4].suit);
                                        $(`#result #card1 #image`).html(`<img src="` + result.cards[4].image + `">`);
                                    }
                                }
                            });
                        
                        });

            
        })
    }) ();