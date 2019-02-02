/*
    Author : Woojin Oh
    Date : Feb. 1, 2019
    Description : Assignment 2B - Make an API call
*/

//fetch('https://api.datausa.io/api?show=geo&sumlevel=nation&required=pop')
//fetch('https://jsonplaceholder.typicode.com/todos')
fetch('https://pokeapi.co/api/v2/pokemon/25/')
  .then(response => response.json())
  .then(json => document.write('<pre>' + JSON.stringify(json, null, 1) + '</pre>'))