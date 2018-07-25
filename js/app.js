
let mod = document.querySelector("mo");
/*
 * Create a list that holds all of your tiles
 */
// tiles array holds all tiles
let tile = document.getElementsByClassName("tile");
let tiles = [...tile];

// group of all tiles in game
const group = document.getElementById("tile-group");

// declaring move variable
let moves = 0;
let counter = document.querySelector(".moves");

// declare variables for star icons
const stars = document.querySelectorAll(".fa-star");

// declaring variable of matchedTiles
let matchedTile = document.getElementsByClassName("match");

 // stars list
 let starsList = document.querySelectorAll(".stars li");

 // close icon in modal
 let closeicon = document.querySelector(".close");

 // declare modal
 let modal = document.getElementById("congrats-alert")

 // array for opened tiles
 let openedTiles = [];


function openNav() {
    document.getElementById("my-off-canvas").style.width = "300px";
    document.getElementById("intro").style.marginLeft = "320px";
    document.getElementById("hamburger").style.cssText = "display: none";
    document.body.style.cssText = "background-color: transparent; opacity= 0.9";
}

/* Set the width of the side navigation to 0 and the left margin of the page content to 0 */
function closeNav() {
    document.getElementById("my-off-canvas").style.width = "0";
    document.getElementById("intro").style.marginLeft = "12.5%";
    document.getElementById("hamburger").style.cssText = "margin-left: 22%; display: visible";
    document.body.style.backgroundColor = "#e1ef2d";
}

/*
 * Display the tiless on the page
 *   - shuffle the list of tiles using the provided "shuffle" method below
 *   - loop through each tile and create its HTML
 *   - add each tile's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    let currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }
    return array;
}

document.body.onload = letsPlay();
function letsPlay(){
    tiles = shuffle(tiles);
    for (let i = 0; i< tiles.length; i++) {
      group.innerHTML = "";
       [].forEach.call(tiles, function (item) {
           group.appendChild(item);
       });
    tiles[i].classList.remove("show", "open", "match", "disabled");
/*to empty the array*/    
    openedTiles.length = 0;
}
    moves = 0;
    counter.innerHTML = `${moves} move`;

    for (let i=0; i<stars.length; i++){
        stars[i].style.color = "#330505";
        stars[i].style.visibility = "visible";
    }

    second = 0;
    minute = 0;
    hour = 0;
    let timer = document.querySelector(".timer");
    timer.innerHTML = "0 mins 0 secs";
    clearInterval(interval);
}

let displayTile = function (){
    this.classList.toggle("open");
    this.classList.toggle("show");
    this.classList.toggle("disabled");
};

function disable(){
    Array.prototype.filter.call(tiles, function(tile){
        tile.classList.add('disabled');
    });
}

function enable(){
    Array.prototype.filter.call(tiles, function(tile){
        tile.classList.remove('disabled');
        for(let i = 0; i < matchedTile.length; i++){
            matchedTile[i].classList.add("disabled");
        }
    });
}

function matched(){
    openedTiles[0].classList.add("match", "disabled");
    openedTiles[1].classList.add("match", "disabled");
    openedTiles[0].classList.remove("show", "open", "no-event");
    openedTiles[1].classList.remove("show", "open", "no-event");
    openedTiles = [];
}


function unmatched(){
    openedTiles[0].classList.add("unmatched");
    openedTiles[1].classList.add("unmatched");
    disable();
    setTimeout(function(){
        openedTiles[0].classList.remove("show", "open", "no-event","unmatched");
        openedTiles[1].classList.remove("show", "open", "no-event","unmatched");
        enable();
        openedTiles = [];
    },1000);
}

function tileOpen(){
    openedTiles.push(this);
    let len = openedTiles.length;
    if(len===2){
        moveCounter();
        if(openedTiles[0].type === openedTiles[1].type){
            matched();
        } else {
            unmatched();
        }
    }
};

// @description count player's moves
function moveCounter(){
    moves++;
    counter.innerHTML = `${moves} move`;
    //start timer on first click
    if(moves == 1){
        second = 0;
        minute = 0; 
        hour = 0;
        startTimer();
    }
    if (moves > 1){
        counter.innerHTML = `${moves} moves`;
    }
    // setting rates based on moves
    if (moves > 12 && moves < 15){
        for(let i= 0; i < 3; i++){
            if(i < 1) {
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 15 && moves < 18){
        for(let i= 0; i < 3; i++){
            if(i == 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 18 && moves < 25){
        for(let i= 0; i < 3; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
    else if (moves >= 25){
        for(let i= 0; i < 4; i++){
            if(i > 1){
                stars[i].style.visibility = "collapse";
            }
        }
    }
}

var second = 0, minute = 0; hour = 0;
var timer = document.querySelector(".timer");
var interval;
function startTimer(){
    interval = setInterval(function(){
        timer.innerHTML = `${minute} mins ${second} secs `;
        second++;
        if(second == 60){
            minute++;
            second=0;
        }
        if(minute == 60){
            hour++;
            minute = 0;
        }
    },1000);
}


// @description congratulations when all tiles match, show modal and moves, time and rating
function congratulations(){
    if (matchedTile.length == 16){
        clearInterval(interval);
        finalTime = timer.innerHTML;

        // show congratulations modal
        modal.classList.add("show");

        // declare star rating variable
        var starRating = document.querySelector(".rank").innerHTML;

        //showing move, rating, time on modal
        document.getElementById("totalMoves").innerHTML = moves;
        document.getElementById("starRating").innerHTML = starRating;
        document.getElementById("totalTime").innerHTML = finalTime;

        //closeicon on modal
        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        letsPlay();
    });
}


// @desciption for user to play Again 
function playAgain(){
    modal.classList.remove("show");
    letsPlay();
}


// loop to add event listeners to each tile
for (let i = 0; i < tiles.length; i++){
    tile = tiles[i];
    tile.addEventListener("click", displayTile);
    tile.addEventListener("click", tileOpen);
    tile.addEventListener("click", congratulations);
};