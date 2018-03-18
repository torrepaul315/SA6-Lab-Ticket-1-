require('../css/main.css');
console.log('top of file');

//another refactor consideration
//!!!!from an error handling perspective, you don't handle blank entries well...both enter and go fire off the search....which means that you need to either handle for blank searches in either route, or refactor how a search gets fired to handle both cases through one scrubber function!

//another refactor-
//Update the results box below automatically as the user types (without needing a button or enter key)

/*
steps left for ticket 2
1- clean the results field when a new search is made OR a page up button is hit
1.5 - forward and back buttons
2 - refactor the query function to accept additional page # criteria
3- you may want some sort of counter to avoid blank api calls, based off of the total or pages value from the first query?

*/

/*steps for ticket 3-
create a checkbox or button for each result.  upon click, have a function that will take the content of that button ( you'll have the same button, so the click function will need to be able to view THAT click)
and have that info pass into a results list rendered perhaps on the side
*/

let textBox = [];

let searchHistory =[];
let searchHistPos = 0;
//this works...predicated on all stop words being lowercase
let stopWords = [ 'maga', 'trump', "mar-a-lago"];
let errorScript = "This Search is Prohibited. Please use another term.";
let errorMessage = errorScript.fontcolor("red");

const guardianAPI = 'https://content.guardianapis.com/search?api-key';
const apiKey ='39f2c2f4-1238-4b1c-90aa-cd948ea90bf6&q';
let currentQueryResult;
let currentPage = 1;
let totalNumOfPagesAvail;

//let totalPages = currentQueryResult.response.pages;

//this is where I take the search term out

//event listener first that pulls in each keystroke
let elTake2 = document.getElementById("text-box");
elTake2.addEventListener('keyup',function(){

  if(event.key === " ") {
    window.alert("Please enter a search term!");
  } else {

    addToTextSearchArray(event.key);
  }
});
//function that evaluates the keystroke and any change that should have on the text box
function addToTextSearchArray(eventInfo) {
  //not handling condition of a space, not sure if I need to either!
  //refactor into a ternary for f
  if (eventInfo === 'Backspace') {
  textBox.pop(eventInfo);
  } else if (eventInfo === 'Enter'){
  let searchTerm = textBox.join('');
  scanForProhibitedSTerms(searchTerm);
  } else if (eventInfo === 'Shift'){
  }
  else {
    textBox.push(eventInfo);
  }
//  console.log(textBox.join(''));
};
//This is where add the term/fire off the query!
let goButton = document.getElementById("go");
goButton.addEventListener('click',function(){
  let searchTerm = textBox.join('');
  scanForProhibitedSTerms(searchTerm);
});
//first, check if the term is on the prohibited search terms list
function scanForProhibitedSTerms (sTerm) {
  // prohibited words check!
  if (stopWords.includes(sTerm.toLowerCase())) {
    document.getElementById('searchTerms').innerHTML = errorMessage;
  //these two lines could be put into a hf 2 lines tho
    textBox = [];
    //reset the text field too!
    elTake2.value = '';


  } else {

    //this is where I start my callout!
  makeApiCall(sTerm, currentPage);
  textBox = [];
  console.log(textBox);
  elTake2.value = '';
  //this could also be a helper function methinks?
  searchHistory.push(sTerm);
  searchHistPos = searchHistory.length;
  }
}
//first build out the stuff that we will insert into the dom
//then! refactor the render html function below
function makeApiCall(input,page) {
//you'll change this top part
//  if (page === undefined) {
//    page = currentPage;
//  }
  let apiKey ='39f2c2f4-1238-4b1c-90aa-cd948ea90bf6&q'
    fetch(`${guardianAPI}=${apiKey}=${input}&page=${page}`)
      .catch(function(err){
        console.log(err);
        alert(err);
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(jsonResp) {
        setVariables(jsonResp);
      });

}

function setVariables(jsonResp) {
  currentQueryResult = jsonResp;
  console.log(currentQueryResult, currentQueryResult.response.pages);
  currentPage = currentQueryResult.response.currentPage;
  totalNumOfPagesAvail = currentQueryResult.response.pages;
  renderHtml();
  setPageButtons();

}


function renderHtml(){
    let results = currentQueryResult.response.results;
    let textbox = document.getElementById("article");
    textbox.innerHTML = "";
    console.log(textbox, results);
    for (let x = 0; x < results.length; x++){
      let articleTitle = `<li class="articleLink"><a href=${results[x].webUrl} target="_blank">${results[x].webTitle}</a></li>`
      textbox.insertAdjacentHTML('beforeend',articleTitle);
    }
}
//what do the page number buttons need to know reallY?
//1- is the page number valid? because all it is really is the same function as forward/backward
//the only other tricky part is the dom manipulation part ie getting that specific click...there are a couple of ways to do this

function setPageButtons (){
  console.log('function entered');
  let buttonRow = document.getElementById("pageButtons");
  let numOfButtons;
  if (currentPage + 10 <= totalNumOfPagesAvail) {
    numOfButtons = 9;
  } else {
    numOfButtons = totalNumOfPagesAvail - currentPage;
  }

  for (let y = currentPage + numOfButtons; y >= currentPage ;y--) {

    let pageButton =`<button class="pageButton">Page ${y} </button>`;
    console.log(pageButton);
    buttonRow.insertAdjacentHTML('afterbegin',pageButton);
  }





}









//this is where you let the person go back a search term result
let BackButton = document.getElementById("backButton");

BackButton.addEventListener('click',function(){
     goBack();
});
//go back and forward could be refactored into one function.....
function goBack(){
    if (currentPage > 1) {
    let searchTerm = searchHistory[searchHistPos -1];
    let pageNumber = currentPage - 1;
    makeApiCall(searchTerm,pageNumber);
    }
    else {
      alert("you are at the beginning of your search list");
    }
}

let forwardButton = document.getElementById("next10");
forwardButton.addEventListener('click',function(){
     next10();
});
function next10() {
  if (currentPage < totalNumOfPagesAvail) {
  let searchTerm = searchHistory[searchHistPos -1];
  let pageNumber = currentPage + 1
  makeApiCall(searchTerm,pageNumber);
  }
  else {
    alert("you've reached the end of the available search results")
  }
}























console.log("bottom of file");
