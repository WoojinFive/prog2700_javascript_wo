/*
    Author : Woojin Oh
    Date : Feb. 16, 2019
    Description : Assignment 3B - Map, Filter, and Reduce
*/

//Choose an array method to implement for each of the incomplete functions.
//FOR/WHILE LOOPS OF ANY KIND ARE FORBIDDEN! You must use the available array functions to accomplish your goal.

//Remember, you can chain together array function calls to attain your goals.
// Ex: array.filter().map()

//Get data for the TV Show "Friends"
fetch('http://api.tvmaze.com/shows/431?embed[]=episodes&embed[]=cast')
    .then(function(response){
        return response.json();
    })
    .then(function(json){

        //DO NOT MODIFY THE CODE IN HERE...check the console for your functions' output

        //1 - Create a function called getGuntherCount() which returns the total number of episodes 
        // where the character Gunther is mentioned in the episode summary.
        console.log('--------------------------------');
        console.log(`Gunther Count: ${getGuntherCount(json)}`);

        //2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
        console.log('--------------------------------');
        console.log(`Total Runtime Minutes: ${getTotalRuntimeMinutes(json)}`);

        //3 - Create a function called getTotalEpisodesInYear() that returns the number of episodes that aired in the year 2000
        console.log('--------------------------------');
        console.log(`Total episodes airing in year 2000: ${getTotalEpisodesInYear(json, "2000")}`);

        //4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
        console.log('--------------------------------');
        console.log(`Female Cast Members:`);
        console.log(getFemaleCastMembers(json));

        //5 - Create a function called getEpisodeTitles() which returns a list of episode
        //    where the argument string is found in the episode summary.
        console.log('--------------------------------');
        console.log(`Episodes that mention Ursula:`);
        console.log(getEpisodeTitles(json, 'Ursula'));

        //6 - Create a function called getCastMembersOver55() which returns a list of cast members
        //    who are currently older than 55 years of age.
        console.log('--------------------------------');
        console.log(`Cast Members over 55:`);
        console.log(getCastMembersOver55(json));

        //7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
        //    runtime minutes for all episodes excluding episodes in season 6
        console.log('--------------------------------');
        console.log(`Total runtime in minutes excluding Season 6: ${getTotalRuntimeMinutesExcludingSeasonSix(json)}`);
    
        //8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
        //    but only return an array of JSON objects containing the season number and episode name
        console.log('--------------------------------');
        console.log(`Episode JSON for first four seasons:`)
        console.log(getFirstFourSeasons(json));

        //9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
        console.log('--------------------------------');
        console.log(`Tally of episodes by season:`);
        console.log(getEpisodeTallyBySeason(json));

        //10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
        //the name and summary of the episodes.
        console.log('--------------------------------');
        console.log('Capitalized Friends');
        console.log(capitalizeTheFriends(json));

    })

// COMPLETE THE FOLLOWING FUNCTIONS BY IMPLEMENTING MAP, REDUCE, OR FILTER 
// (or a combination) ON THE PROVIDED JSON DATA

// Define the required ten functions below this line...

//1 - Create a function called getGuntherCount() which returns the total number of episodes 
// where the character Gunther is mentioned in the episode summary.
var getGuntherCount = function(jsonInput) {
    return jsonInput._embedded.episodes.filter(x => x.summary != undefined && x.summary.includes('Gunther')).length;
    
    // return jsonInput._embedded.episodes.filter(x => x.summary != "" && x.summary != null && x.summary.includes('Gunther')).length;
}

//2 - Create a function called getTotalRuntimeMinutes() that totals all runtime minutes for all episodes
var getTotalRuntimeMinutes = function(jsonInput) {
    return jsonInput._embedded.episodes.map(x => x.runtime).reduce((a, b) => a + b);
    
    // var totalRunTimeMinutes = 0;
    // jsonInput._embedded.episodes.map(x => totalRunTimeMinutes += x.runtime);
    // return totalRunTimeMinutes;

    // jsonInput._embedded.episodes.forEach(function(element, index) {
    //     totalRunTimeMinutes += element.runtime;
    // })
    // return totalRunTimeMinutes;
}

//3 - Create a function called getTotalEpisodesInYear() that returns the number of episodes that aired in the year 2000
var getTotalEpisodesInYear = function(jsonInput, yearInput) {
    //return jsonInput._embedded.episodes.filter(x => x.airdate.split("-")[0] === yearInput).length;    
    return jsonInput._embedded.episodes.filter(x => x.airdate.includes(yearInput)).length;
}

//4 - Create a function called getFemaleCastMembers() that returns an array of the names of the female cast members.
var getFemaleCastMembers = function(jsonInput) {
    return jsonInput._embedded.cast.filter(x => x.person.gender === "Female").map(x => x.person.name);    
}

//5 - Create a function called getEpisodeTitles() which returns a list of episode
//    where the argument string is found in the episode summary.
var getEpisodeTitles = function(jsonInput, stringInput){
    return jsonInput._embedded.episodes.filter(x => x.summary != undefined && x.summary.includes(stringInput));
    //return jsonInput._embedded.episodes.filter(x => x.summary != "" && x.summary != null && x.summary.includes(stringInput));
}


//6 - Create a function called getCastMembersOver55() which returns a list of cast members
//    who are currently older than 55 years of age.
var getCastMembersOver55 = function(jsonInput) {
    function getAge(dateString) 
    {
        var today = new Date();
        var birthDate = new Date(dateString);

        var ageGap = today.getFullYear() - birthDate.getFullYear();
        var monthGap = today.getMonth() - birthDate.getMonth();

        if (monthGap < 0 || (monthGap === 0 && today.getDate() < birthDate.getDate())) 
        {
            ageGap--;
        }
        return ageGap;
    }

    return jsonInput._embedded.cast.filter(x => getAge(x.person.birthday) >= 55).map(x => x.person.name);
    //return jsonInput._embedded.cast.filter(x => 2019 - x.person.birthday.split("-")[0] > 55).map(x => x.person.name);  
}


//7 - Create a function called getTotalRuntimeMinutesExcludingSeasonSix that gets the total 
//    runtime minutes for all episodes excluding episodes in season 6
var getTotalRuntimeMinutesExcludingSeasonSix = function(jsonInput) {
    return jsonInput._embedded.episodes.filter(x => x.season != 6).map(x => x.runtime).reduce((a, b) => a + b);

    // var totalRunTimeMinutes = 0;
    // jsonInput._embedded.episodes.filter(x => x.season != 6).map(x => totalRunTimeMinutes += x.runtime);
    // return totalRunTimeMinutes;

    // jsonInput._embedded.episodes.forEach(function(element, index) {
    //     if (element.season != 6) {
    //         totalRunTimeMinutes += element.runtime;
    //     }
    // })
    // return totalRunTimeMinutes;
}

//8 - Create a function called getFirstFourSeasons that gets the episodes for the first four seasons 
//    but only return an array of JSON objects containing the season number and episode name
var getFirstFourSeasons = function(jsonInput) {
    //return jsonInput._embedded.episodes.filter(x => x.season >= 1 && x.season <= 4).map(function(x) {var result = {"season": x.season, "name": x.name}; return result;});  
    return jsonInput._embedded.episodes.filter(x => x.season >= 1 && x.season <= 4).map((x) => result = {"season": x.season, "name": x.name});  
}

//9 - Create a function called getEpisodeTallyBySeason that returns an object containing the season name and the total episodes as key:value pairs for each season
var getEpisodeTallyBySeason = function(jsonInput) {
    return jsonInput._embedded.episodes.map(x => x.season).reduce((tally, season) => {tally[season] = tally[season] + 1 || 1; return tally;} , {});
    //return jsonInput._embedded.episodes.map(x => x.season).reduce((tally, season) => {if (!tally[season]) { tally[season] = 1; } else { tally[season] = tally[season] + 1; }; return tally;} , {});
}

//10 - Create a funtion called capitalizeTheFriends that transforms the episode JSON data by capitalizing the words Joey, Chandler, Monica, Rachel, Phoebe, and Ross in both 
//the name and summary of the episodes.
//https://stackoverflow.com/questions/15604140/replace-multiple-strings-with-multiple-other-strings
var capitalizeTheFriends = function(jsonInput) {
  return jsonInput._embedded.episodes.map(function(x) {
    var result = {};

    if (x.summary === undefined) {
      result = {"summary": x.summary};
    }
    if (x.summary != undefined) {
      var summary1 = x.summary.replace("Joey", "JOEY");
      var summary2 = summary1.replace("Chandler", "CHANDLER");
      var summary3 = summary2.replace("Monica", "MONICA");
      var summary4 = summary3.replace("Rachel", "RACHEL");
      var summary5 = summary4.replace("Phoebe", "PHOEBE");
      var summary6 = summary5.replace("Ross", "ROSS");
    }


    if (x.name === undefined) {
      result = {"name": x.name};
    }
    if (x.name != undefined) {
      var name1 = x.name.replace("Joey", "JOEY");
      var name2 = name1.replace("Chandler", "CHANDLER");
      var name3 = name2.replace("Monica", "MONICA");
      var name4 = name3.replace("Rachel", "RACHEL");
      var name5 = name4.replace("Phoebe", "PHOEBE");
      var name6 = name5.replace("Ross", "ROSS");

      result = {"name": , "summary": summary6};
    }

    return result;
  });
  
}
  
//     var mapObj = {
//         Joey:"JOEY",
//         Chandler:"CHANDLER",
//         Monica:"MONICA",
//         Rachel:"RACHEL",
//         Phoebe:"PHOEBE",
//         Ross:"ROSS"
//     };

//     return jsonInput._embedded.episodes.map(function(x) {
//         if (x.summary != undefined) {
//             var result = {"name": x.name.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(matched){ return mapObj[matched]; }),
//                           "summary": x.summary.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(matched) { return mapObj[matched]; })
//             }
//         }
//         else if (x.summary === undefined) {
//             var result = {"name": x.name.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(matched){ return mapObj[matched]; }),
//                           "summary": x.summary};
//         }
        
//         return result;
//     });
// }

// // var capitalizeTheFriends = function(jsonInput) {
// //     var mapObj = {
// //         Joey:"JOEY",
// //         Chandler:"CHANDLER",
// //         Monica:"MONICA",
// //         Rachel:"RACHEL",
// //         Phoebe:"PHOEBE",
// //         Ross:"ROSS"
// //     };

// //     jsonInput._embedded.episodes.map(function(x) {
// //         if (x.summary != undefined) {
// //             x.name = x.name.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(matched){ return mapObj[matched]; });
// //             x.summary = x.summary.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(matched) { return mapObj[matched]; });
// //         }
// //         else if (x.summary === undefined) {
// //             x.name = x.name.replace(/Joey|Chandler|Monica|Rachel|Phoebe|Ross/gi, function(matched){ return mapObj[matched]; });
// //             x.summary = x.summary;
// //         }
// //     });

// //     return jsonInput;
// // }