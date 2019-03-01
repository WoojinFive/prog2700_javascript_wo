// Extract Codons as JavaScript Array from a DNA Sequence String.
var extractCodonsFromDNA = function(dnaSequence)
{
    dnaSequence = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
    var codons = [];

    // ADD CODE TO COMPLETE THE FUNCTION HERE...
    // you will get a console.assert error until the function is coded correctly
    codons = dnaSequence.match(/.{1,3}/g);

    return codons;
}

// dnaSequence = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";
// var codons = [];

// // while (dnaSequence.length != 0) {
// //     codons.push(slice(dnaSequence));
// // }
// // codons.push(slice(dnaSequence));
// // function slice(input) {
// //     return input.slice(0,3);
// // }
// console.log(dnaSequence.slice(0,3));
// console.log(codons);
// console.log(dnaSequence);

// for (var i = 0; i < dnaSequence.length; i++) {
//     codons.push(dnaSequence.slice(i,3));
// }

// var codonsString = "GTGCCAATG";
//console.log(codonsString.match(/.{1,3}/g));

// var DATA_URL = "https://mikecaines.com/api/map.json";
// var DNA_SEQUENCE = "GTGCCAATGTTACTGCTAAATCTCTATATACAGTGGCTTAAGGATGGGGGGCCCAGCAGCGGCCGACCCCCCCCCTCAGTGTGGAATCAACCGGAATTGAGG";


// fetch(DATA_URL)
//     .then(response => response.json())
//     .then(function(json) {
//         var jsonArray = json;



//         var codons = [];
      
//           // ADD CODE TO COMPLETE THE FUNCTION HERE...
//           // you will get a console.assert error until the function is coded correctly
//           for (var i = 0; i < DNA_SEQUENCE.length; i += 3) {
//             codons.push(DNA_SEQUENCE.slice(i, i + 3));
//           }




//             var aminos = [];
          
//             // ADD CODE TO COMPLETE THE FUNCTION HERE...
//             // you will get a console.assert error until the function is coded correctly
//             for (var i = 0; i < codons.length; i++) {
//               for (var j = 0; j < jsonArray.length; j++) {
//                 if (jsonArray[j].codons.indexOf(codons[i]) != -1) {
//                   aminos.push(jsonArray[j].abbr);
//                 }  
//               } 
//             }

//             console.log(aminos);



//         })


