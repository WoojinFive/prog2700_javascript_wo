/*
//fetch api
fetch('https://jsonplaceholder.typicode.com/todos')
  .then(response => response.json())
  .then(json => console.log(json, null, null))
  */
  /* response => response.json()

    function(response) {
        return response.json();
    }

    json => console.log(json)

    function(json) {
        console.log(json)
    }
    */



//JQUERY AJAX CALL
$(document).ready(function(){
    $("button").click(function(){
        $.ajax(
            {
                url: "https://jsonplaceholder.typicode.com/users", 
                success: function(result)
                    {
                        //document.write(JSON.stringify(result));
                        //$("body").html(result);

                        var listOfName = '';
                        //loop through each object and write out something
                        result.forEach(element => {
                            //append name to string
                            console.log(element.name);
                            listOfName += element.name;
                            $("#names").html(listOfName); 
                            //document.write(element.name);
                        });
                    }
            });
    });
});





/*
//VANILLA JAVASCRIPT
var xhttp = new XMLHttpRequest();
xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
        document.write(this.responseText);
        //document.getElementById("demo").innerHTML = this.responseText;
    }
};
xhttp.open("GET", "https://jsonplaceholder.typicode.com/users", true);
xhttp.send();
*/

/*
// Say "Hello."
document.write("Hello.<br/>");
// Say "Goodbye" two seconds from now.
setTimeout(
    //callback function
    function() {
        document.write("Goodbye!<br/>");
    }
, 2000);
// Say "Hello again!"
document.write("Hello again!<br/>");
*/