# M3-W2-D3-Homework
Sure, here's a detailed explanation of the code in your Memory Tile Game:

## Code Explanation

### Page Load Event

```javascript
window.onload = function() {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
};
```

- **`window.onload`**: This function is executed when the page fully loads.
- **`setRandomTileOrder(12)`**: Calls a function to create an array of 12 unique random numbers.
- **`setTiles()`**: Calls a function to set the tiles on the game board based on the random order array.

### Global Variables

```javascript
let i = 0;
let clicks;
let timeScore;
```

- **Global variables** used throughout the game to track the state.

### Start Button Event Listener

```javascript
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);
```

- **`startButton`**: Selects the start button from the DOM.
- **`startButton.addEventListener`**: Adds a click event listener to the start button that initiates the game.

### Start Game Function

```javascript
function startGame() {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
}
```

- **`startGame`**: Function that starts the game.
- **`tiles.forEach(tile => tile.addEventListener("click", displayTile))`**: Adds a click event listener to each tile to display the tile when clicked.
- **`resetTiles()`**: Resets the game tiles to their initial state.
- **`startButton.disabled = true`**: Disables the start button to prevent restarting the game while it’s running.
- **`startTimer()`**: Starts the game timer.

### End Button Event Listener

```javascript
document.getElementById('endGame').addEventListener("click", endGame);
```

- **End Game Button**: Adds a click event listener to the end game button to stop the game.

### End Game Function

```javascript
function endGame() {
    function endTimer() {
        timeScore = document.getElementById("timer").innerText;
        console.log(timeScore);
        clearInterval(timer);
    }
    randomOrderArray = [];
    startButton.innerText = "New Game";
    startButton.disabled = false;
    endTimer();
    calculateScore();
}
```

- **`endGame`**: Function that stops the game.
- **`endTimer()`**: Stops the timer and logs the time score.
- **`randomOrderArray = []`**: Resets the random order array.
- **`startButton.innerText = "New Game"`**: Changes the start button text to "New Game".
- **`startButton.disabled = false`**: Enables the start button.
- **`calculateScore()`**: Calculates and displays the final score.

### Random Tile Order Function

```javascript
let randomOrderArray = [];
function setRandomTileOrder(numberOfTiles) {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random() * (numberOfTiles - 1);
        randomNum = Math.round(randomNum) + 1;

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    } 
}
```

- **`setRandomTileOrder`**: Function to generate an array of unique random numbers.
- **`randomOrderArray`**: Stores the random order of tiles.

### Tile Setup Function

```javascript
let tiles = document.querySelectorAll(".gametile");

function setTiles() {
    for (let tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;
        // replace numerical values with icon pairs
        if (tile.innerText < 3) {
            tile.innerHTML = rocket;
            tile.setAttribute("icon", "rocket");
        } else if (tile.innerHTML < 5) {
            tile.innerHTML = bacteria;
            tile.setAttribute("icon", "bacteria");
        } else if (tile.innerHTML < 7) {
            tile.innerHTML = cocktail;
            tile.setAttribute("icon", "cocktail");
        } else if (tile.innerHTML < 9) {
            tile.innerHTML = football;
            tile.setAttribute("icon", "football");
        } else if (tile.innerHTML < 11) {
            tile.innerHTML = pizza;
            tile.setAttribute("icon", "pizza");
        } else if (tile.innerHTML < 13) {
            tile.innerHTML = kiwi;
            tile.setAttribute("icon", "kiwi");
        } else {
            console.log("Error: too many tiles");
        }
    }
}
```

- **`setTiles`**: Assigns icons to the tiles based on the random order array.

### Timer Function

```javascript
let count;
function startTimer() {
    clearInterval(timer); //clears timer before timer starts. This fixes issue if timer is triggered again, when already running. 
    count = 0;
    timer = setInterval(function() {
        count++;
        document.getElementById("timer").firstChild.innerText = count;

        //end timer when timer reaches -1, This displays 0.
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
}
```

- **`startTimer`**: Starts the game timer and updates the timer display every second.

### Icon Variables

```javascript
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;
```

- **Icon variables**: Define the HTML for different icons used in the game.

### Display Tile Function

```javascript
let selectedTile = '';
let tileIcon;
let tileIcons = [];
let tileIds = [];
tiles.forEach(tile => tile.addEventListener("click", displayTile));
let n = 0;

function displayTile(e) {
    // reveal tile by changing bg color and changing font-size from 0 to 3em;
    this.classList.remove("hideTile");
    this.classList.add("displayTile");
        
    // logs the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    let tileId = e.target.getAttribute("id");
    tileIds.push(tileId);
   
    // this counts number of clicks
    countMoves();
    
    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n += 2;
    }
}
```

- **`displayTile`**: Reveals the tile when clicked and checks for matches if two tiles are selected.

### Check Match Function

```javascript
function checkMatch(tileIcons, tileIds, n) {
    if (tileIcons[n] !== tileIcons[n + 1]) {
        setTimeout(function() {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);  
    } else {
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");   
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");   
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile); 
    }
}
```

- **`checkMatch`**: Compares the icons of two selected tiles and updates the game state based on whether they match.

### Count Moves Function

```javascript
function countMoves() {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}
```

- **`countMoves`**: Counts the number of moves and updates the click counter display.

### Clear Tiles Function

```javascript
function clearTiles() {
    for (let n = 0; n < tiles.length; n++) {
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
}
```

- **`clearTiles`**: Resets the tiles to their initial hidden state.

### Calculate Score Function

```javascript
function calculateScore() {
    timeScore = parseInt(timeScore);
    const calculatedScore = (timeScore + clicks);
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
}
```

- **`calculateScore`**: Calculates the final score based on the time and number of clicks and displays it.

### Generate RGB

 Values Function

```javascript
function generateRGBvalues() {
    return `rgb(${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)}, ${Math.round(Math.random() * 255)})`;
}
```

- **`generateRGBvalues`**: Generates random RGB values for dynamic styling.

### Reset Tiles Function

```javascript
function resetTiles() {
    tiles.forEach(tile => {
        tile.classList.add("hideTile");
        tile.classList.remove("displayTile");
        tile.style.backgroundColor = generateRGBvalues();
    });
}
```

- **`resetTiles`**: Resets the tiles to their initial hidden state and assigns a random background color.

This explanation covers the key functionalities and how they interact with each other to create the memory tile game.