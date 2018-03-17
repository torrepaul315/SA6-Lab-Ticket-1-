require('../css/main.css');
console.log('top of file');

//another refactor consideration
//!!!!from an error handling perspective, you don't handle blank entries well...both enter and go fire off the search....which means that you need to either handle for blank searches in either route, or refactor how a search gets fired to handle both cases through one scrubber function!

//another refactor-
//Update the results box below automatically as the user types (without needing a button or enter key)


let textBox = [];

let searchHistory =[];
let searchHistPos = 0;
//this works...predicated on all stop words being lowercase
let stopWords = [ 'maga', 'trump', "mar-a-lago"];

let errorScript = "This Search is Prohibited. Please use another term.";
let errorMessage = errorScript.fontcolor("red");

let elTake2 = document.getElementById("text-box");
//console.log('element pulled', typeof elTake2, elTake2);



elTake2.addEventListener('keyup',function(){

  if(event.key === " ") {
    window.alert("Please enter a search term!");
  } else {

    addToTextSearchArray(event.key);
  }
});

function addToTextSearchArray(eventInfo) {
  //not handling condition of a space, not sure if I need to either!

  //refactor into a ternary for f
  if (eventInfo === 'Backspace') {
  textBox.pop(eventInfo);
  } else if (eventInfo === 'Enter'){
  populateResultField();
  } else if (eventInfo === 'Shift'){
  }
  else {
    textBox.push(eventInfo);
  }
  console.log(textBox.join(''));
};

let goButton = document.getElementById("go");

goButton.addEventListener('click',function(){

  let searchTerm = textBox.join('');
  scanForProhibitedSTerms(searchTerm);
});

function scanForProhibitedSTerms (sTerm) {
  console.log(sTerm);
  // prohibited words check!
  if (stopWords.includes(sTerm.toLowerCase())) {
    document.getElementById('searchTerms').innerHTML = errorMessage;

  //these two lines could be put into a helper function that said it's only two lines of code.....
    textBox = [];
    //reset the text field too!
    elTake2.value = '';
  } else {
  populateResultField(sTerm);
  }
}

//mmmk! once you get the div to be inserted into the dom, then try it via a different route....se the resultsbox as a blank div and insert/replace the content of that div with a string!

//also....this was me mostly following an exapmple by wrote as opposted to understanding the underlying content/what it's doing....worth diving deeper into!
function populateResultField(){
   let searchTerm = textBox.join('')
   console.log(searchTerm);
/*
   let newDiv = document.createElement('div');
   let content= document.createTextNode(searchTerm);
   newDiv.appendChild(content);
   console.log(newDiv);
   //let's see if this part works next! does it make it to the dom?
   var currentDiv = document.getElementById("searchTerms");

   var parentDiv = document.getElementById("row-holder");

   parentDiv.insertBefore(newDiv, currentDiv.nextSibling);
*/
   let divToReplace = document.getElementById('searchTerms').innerHTML;
   console.log("what we want to replace : " + divToReplace, typeof divToReplace);
   divToReplace = searchTerm;
   console.log(divToReplace);
   //document.body.insertBefore(newDiv, currentDiv);
   document.getElementById('searchTerms').innerHTML = searchTerm;
   //reset your storage!
   searchHistory.push(searchTerm);
   console.log(searchHistory);
   textBox = [];
   searchHistPos = searchHistory.length;

   //reset the text field too!
   elTake2.value = '';

   console.log(searchHistPos);


}

let BackButton = document.getElementById("backButton");

BackButton.addEventListener('click',function(){
     goBack();
});

function goBack(){
  console.log('clicked');
    if (searchHistPos > 1) {
        let backTerm = searchHistory[searchHistPos - 2];
        console.log( 'your backTerm ' +backTerm);
        document.getElementById('searchTerms').innerHTML = backTerm;
        searchHistPos -= 1;
      }
    else {
      alert("you are at the end of your search list");
    }

}





















/*
elTake2.addEventListener('click',function(){
  logInRealTime();
});

function logInRealTime() {
  console.log("event listener works!");
};

function fillText(textAdd) {
   el.innerText = textAdd;
   el.value = textAdd;

   console.log(el);
}

fillText("lets see if this worked!");

*/
console.log("bottom of file");
