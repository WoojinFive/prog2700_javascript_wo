/*
    Author : Woojin Oh
    Date : Mar. 25, 2019
    Description : Assignment 4 - 3 in a row puzzle
*/

(function(){
  function runGame(){

    fetch('https://www.mikecaines.com/3inarow/sample.json')
      .then(function(response){
          return response.json();
      })
      .then(function(json){

        //////setTdColor function start //////
        var setTdColor = function() {
          json.rows.map(x => x.map(function(x) {
            if (x.currentState %3 === 0 ) {
              x.querySelInfo.style.background = 'gray';
            }
            else if (x.currentState %3 === 1 ) {
              x.querySelInfo.style.background = 'blue';
            }
            else if (x.currentState %3 === 2 ) {
              x.querySelInfo.style.background = 'white';
            }
          }));
        }
        ////// setTdColor function end //////

        ////// buildHtml function start //////
        var buildHtml = (function() {
          // make table element
          var quizTable = document.createElement('table');
          quizTable.setAttribute('id','quizTable');
          document.body.appendChild(quizTable);
          //document.body.insertBefore(quizTable, scriptNode);

          // make tr elements
          json.rows.map(function(x) {
            var row = document.createElement('tr');
            row.setAttribute('id', `row-${json.rows.indexOf(x)+1}`);
            document.getElementById('quizTable').appendChild(row);   
          })

          // make td elements
          json.rows.map(x => x.map(function(y) {
            var col = document.createElement('td');
            col.setAttribute('id', `col-${json.rows.indexOf(x)+1}-${x.indexOf(y)+1}`);
            document.getElementById(`row-${json.rows.indexOf(x)+1}`).appendChild(col);
          }))
          
          var divCheckButton = document.createElement('div');
          divCheckButton.setAttribute('id', 'divCheckButton');
          document.body.appendChild(divCheckButton);
          //document.body.insertBefore(divCheckButton, scriptNode);
    
          var checkButton = document.createElement('button');
          checkButton.setAttribute('id', 'checkButton');
          document.getElementById('divCheckButton').appendChild(checkButton);
          document.getElementById('checkButton').innerText = 'Check';

          var buttonLabel = document.createElement('label');
          buttonLabel.setAttribute('id', 'buttonLabel');
          document.getElementById('divCheckButton').appendChild(buttonLabel);

          var divCheck = document.createElement('div');
          divCheck.setAttribute('id', 'divCheck');
          document.body.appendChild(divCheck);
          //document.body.insertBefore(divCheck, scriptNode);

          var checkBox = document.createElement('input');
          checkBox.setAttribute('id', 'checkBox');
          checkBox.setAttribute('type', 'checkbox');
          document.getElementById('divCheck').appendChild(checkBox);

          var checkLabel = document.createElement('label');
          checkLabel.setAttribute('id', 'checkLabel');
          document.getElementById('divCheck').appendChild(checkLabel);
          document.getElementById('checkLabel').innerText = 'Show incorrect squares';
          
          var divAdditon = document.createElement('div');
          divAdditon.setAttribute('id', 'divAdditon');
          document.body.appendChild(divAdditon);
          //document.body.insertBefore(divAdditon, scriptNode);

          var restartButton = document.createElement('button');
          restartButton.setAttribute('id', 'restartButton');
          document.getElementById('divAdditon').appendChild(restartButton);
          document.getElementById('restartButton').innerText = 'Restart';

          var hintButton = document.createElement('button');
          hintButton.setAttribute('id', 'hintButton');
          document.getElementById('divAdditon').appendChild(hintButton);
          document.getElementById('hintButton').innerText = 'Hint';

          var resultButton = document.createElement('button');
          resultButton.setAttribute('id', 'resultButton');
          document.getElementById('divAdditon').appendChild(resultButton);
          document.getElementById('resultButton').innerText = 'Result';
        })();
        ////// buildHtml function end //////

        ////// setStyle function start //////
        var setStyle = (function() {
          // https://davidwalsh.name/add-rules-stylesheets
          var sheet = (function() {
            // Create the <style> tag
            var style = document.createElement("style");
            style.appendChild(document.createTextNode(""));
            // Add the <style> element to the page
            document.head.appendChild(style);
          
            return style.sheet;
          })();

          sheet.insertRule("body { min-Width: 1000px; margin: 100px; }");
          sheet.insertRule("table { border: 1px solid black; border-collapse: collapse; }");
          sheet.insertRule("td { border: 1px solid black; height: 50px; width: 50px; text-align: center; padding: 0px; margin: 0px;}");
          sheet.insertRule("button { border: 1px solid black; height: 25px; width: 50px; text-align: center; display: iline; margin-top: 10px; margin-right: 10px; }");
          sheet.insertRule("button#restartButton,#hintButton,#resultButton { display: inline; width: 90px; margin-right: 19px; padding: 0px; }");
          sheet.insertRule("input { display: inline; padding: 0px; margin-top: 10px; }");
        })();
        ////// setStyle function end //////

        //////addQueryInfo function start //////
        var addQueryInfo = (function() {
          // add query info about td in json date to use later
          var queryArr = document.querySelectorAll('td');
          var count = 0;
    
          json.rows.map(x => x.map(function(x) {
            x.querySelInfo = queryArr[count];
            count ++;
          }));
        })();
        //////addQueryInfo function end //////     

        /////call the setTdColor function/////
        setTdColor();

        ////// makeToggle function start //////
        var makeToggle = (function() {
          json.rows.map(x => x.map(function(x) {
            x.querySelInfo.addEventListener('click', function() {
              if (x.canToggle === true) {
                x.currentState ++;
                setTdColor();
              }
              json.rows.map(x => x.map(x => x.querySelInfo.innerText = ''));
              checkBox.checked = false;
              document.getElementById('buttonLabel').innerText = '';
            });
          })) 
        })();
        ////// makeToggle function end //////

        ////// checkStatus function start //////
        var checkStatus = (function() {
          checkButton.addEventListener('click', function() {
            var checkButton = document.querySelector('#checkButton');
            var countNum = 0;
            var countNum2 = 0;

            json.rows.map(x => x.map(function(x) {
              if (x.currentState%3 !== 0 && (x.currentState%3 !== x.correctState)) {
                countNum ++;
              }
            }));

            json.rows.map(x => x.map(function(x) {
              if (x.currentState%3 !== x.correctState) {
                countNum2 ++;
              }
            }));

            if (countNum === 0 && countNum2 === 0) {
              document.getElementById('buttonLabel').innerText = 'You did it!!';
            } else if (countNum === 0) {
              document.getElementById('buttonLabel').innerText = 'So far so good';
            } else if (countNum !==0 ) {
              document.getElementById('buttonLabel').innerText = 'Something is wrong';
            }
          });
        })();
        ////// checkStatus function end //////

        ////// checkIncorrect function start //////
        var checkIncorrect = (function() {
          var checkBox = document.querySelector('#checkBox');

          json.rows.map(x => x.map(function(x) {
            checkBox.addEventListener('change', function(event) {
              if (checkBox.checked) {
                if (x.currentState%3 !== x.correctState) {
                  x.querySelInfo.innerText = 'X';
                }
              }
              else if (!checkBox.checked) {
                x.querySelInfo.innerText = '';
              }
            });
          }))
        })();
        ////// checkIncorrect function start //////

        ////// restartGame function start //////
        var restartGame = (function() {
          restartButton.addEventListener('click', function() {
            var scriptNodeArr = document.getElementsByTagName('script');
            var scriptNode = scriptNodeArr[0];
            console.log(scriptNode);
      
            while (document.body.lastChild !== scriptNode) {
              var target = document.body.lastChild;
              target.parentNode.removeChild(target);
            }
            runGame();
          });
        })();
        ////// restartGame function end //////
        
        ////// showHint function start //////
        var showHint = (function() {
          hintButton.addEventListener('click', function() {
            var inCorrectQuery = [];
   
            json.rows.map(x => x.map(function(x) {
              if (x.currentState%3 !== x.correctState) {
                inCorrectQuery.push(x);
              }
            }));

            if (inCorrectQuery.length !== 0) {
              var randomNumber = Math.floor(Math.random() * (inCorrectQuery.length));
              var randomQuery = inCorrectQuery[randomNumber];

              if (randomQuery.correctState === 1 ) {
                randomQuery.querySelInfo.style.background = 'blue';
                randomQuery.querySelInfo.innerText = 'here';
              }
              else if (randomQuery.correctState === 2 ) {
                randomQuery.querySelInfo.style.background = 'white';
                randomQuery.querySelInfo.innerText = 'here';
              }
              setTimeout(function() { 
                if (randomQuery.currentState%3 === 0 ) {
                  randomQuery.querySelInfo.style.background = 'gray';
                  randomQuery.querySelInfo.innerText = '';
                }
                else if (randomQuery.currentState%3 === 1 ) {
                  randomQuery.querySelInfo.style.background = 'blue';
                  randomQuery.querySelInfo.innerText = '';
                }
                else if (randomQuery.currentState%3 === 2 ) {
                  randomQuery.querySelInfo.style.background = 'white';
                  randomQuery.querySelInfo.innerText = '';
                }
              }
              , 1000);
            } else {
              document.getElementById('buttonLabel').innerText = 'You did it!!';
            }
          });
        })();
        ////// showHint function end //////

        ////// showResult function start //////
        var showResult = (function() {
          
          resultButton.addEventListener('click', function() {
            if(confirm('Are you sure you want to see the answer?')) {
              json.rows.map(x => x.map(x => x.currentState = x.correctState));
              setTdColor();
            }
          });
        })();
        ////// showResult function end //////
      })
      ////// fetch end //////
  }
  runGame();
})()