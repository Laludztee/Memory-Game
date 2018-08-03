
let tile = document.getElementsByClassName("tile");
let tiles = [...tile];
const group = document.getElementById("tile-group");
let moves = 0;
let counter = document.querySelector(".moves");
const stars = document.querySelectorAll(".fa-star");
let matchedTile = document.getElementsByClassName("match");
let starsList = document.querySelectorAll(".stars li");
let closeicon = document.querySelector(".close");
let modal = document.getElementById("congrats-alert");
let openedTiles = [];

/*
 * Display the tiles on the page
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

document.body.onload = play();
function play(){
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
    counter.innerHTML = `${moves} moves`;

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
    },900);
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


// @description congratulations when all tiles match
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

        closeModal();
    };
}


// @description close icon on modal
function closeModal(){
    closeicon.addEventListener("click", function(e){
        modal.classList.remove("show");
        play();
    });
}


// @desciption play game again 
function playAgain(){
    modal.classList.remove("show");
    play();
}


// add event listeners to each tile
for (let i = 0; i < tiles.length; i++){
    tile = tiles[i];
    tile.addEventListener("click", displayTile);
    tile.addEventListener("click", tileOpen);
    tile.addEventListener("click", congratulations);
};