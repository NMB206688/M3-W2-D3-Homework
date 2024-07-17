// On page load -> generate game board
window.onload = () => {
    console.log("Page Loaded");
    setRandomTileOrder(12);
    setTiles();
}

// Global variable
let i = 0;
let clicks;
let timeScore;

// Start button initiates game and starts counter
// Initiates game start on button press
const startButton = document.getElementById("startGame");
startButton.addEventListener("click", startGame);

const startGame = () => {
    tiles.forEach(tile => tile.addEventListener("click", displayTile));
    resetTiles();
    startButton.disabled = true;
    console.log(randomOrderArray);
    startTimer();
}

// End button stops the game
document.getElementById('endGame').addEventListener("click", endGame);

const endGame = () => {
    const endTimer = () => {
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

// Create random number function
// Creates random number which will later be assigned an icon
// Creates an array of 12 random numbers
let randomOrderArray = [];
const setRandomTileOrder = (numberOfTiles) => {
    while (randomOrderArray.length < numberOfTiles) {
        let randomNum = Math.random();
        randomNum = randomNum * (numberOfTiles - 1);
        randomNum = Math.round(randomNum) + 1;

        if (randomOrderArray.includes(randomNum)) {
            continue;
        } else {
            randomOrderArray.push(randomNum);
        }
    }
}

// Set tiles variable for use throughout code
const tiles = document.querySelectorAll(".gametile");

const setTiles = () => {
    for (const tile of tiles) {
        tile.innerHTML = randomOrderArray[i];
        i++;
        // Replace numerical values with icon pairs
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

// Timer Function -> starts timer when game is started end when game is complete or game is cancelled
let count;
let timer;

const startTimer = () => {
    clearInterval(timer); // Clears timer before timer starts. This fixes issue if timer is triggered again when already running.
    count = 0;
    timer = setInterval(() => {
        count++;
        document.getElementById("timer").firstChild.innerText = count;

        // End timer when timer reaches -1, This displays 0.
        if (count === 60) {
            clearInterval(timer);
            document.getElementById("timer").firstChild.innerText = "Game Over";
        }
    }, 1000);
}

// Icon assign function -> replaces random numbers with icon pairs
// When icon assigned, tile is also assigned an attribute icon variables
const football = `<i class="fas fa-football-ball"></i>`;
const mask = `<i class="fas fa-ufo"></i>`;
const pizza = `<i class="fas fa-pizza-slice"></i>`;
const lightning = `<i class="far fa-bolt"></i>`;
const bulb = `<i class="fal fa-lightbulb"></i>`;
const rocket = `<i class="fas fa-rocket"></i>`;
const bacteria = `<i class="fas fa-bacterium"></i>`;
const kiwi = `<i class="fas fa-kiwi-bird"></i>`;
const cocktail = `<i class="fas fa-cocktail"></i>`;

let selectedTile = '';
let tileIcon;
let tileIcons = [];
let tileIds = [];

// Display tile -> function which listens for click event and displays tile value on click
tiles.forEach(tile => tile.addEventListener("click", displayTile));
let n = 0;

const displayTile = (e) => {
    // Reveal tile by changing bg color and changing font-size from 0 to 3em
    e.target.classList.remove("hideTile");
    e.target.classList.add("displayTile");

    // Logs the value of the tile's icon and Id
    tileIcon = e.target.getAttribute("icon");
    tileIcons.push(tileIcon);
    const tileId = e.target.getAttribute("id");
    tileIds.push(tileId);

    // This counts number of clicks
    countMoves();

    if (tileIcons.length % 2 === 0) {
        checkMatch(tileIcons, tileIds, n);
        n += 2;
    }
}

const checkMatch = (tileIcons, tileIds, n) => {
    console.log(n);
    console.log(n + 1);
    if (tileIcons[n] !== tileIcons[n + 1]) {
        console.log("no match");
        setTimeout(() => {
            document.getElementById(tileIds[n + 1]).classList.remove("displayTile");
            document.getElementById(tileIds[n]).classList.remove("displayTile");
        }, 1000);
    } else {
        console.log("match");
        console.log(n);
        document.getElementById(tileIds[n]).style.backgroundColor = "green";
        document.getElementById(tileIds[n + 1]).style.backgroundColor = "green";
        document.getElementById(tileIds[n]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n + 1]).setAttribute("guess", "correct");
        document.getElementById(tileIds[n]).removeEventListener("click", displayTile);
        document.getElementById(tileIds[n + 1]).removeEventListener("click", displayTile);
    }
}

// CountClicks -> calculates number of user clicks -> needed to calculate score
const countMoves = () => {
    clicks = n;
    document.getElementById("clicks").firstChild.innerHTML = clicks;
}

// ClearTiles -> Clear tiles when new game is started
const clearTiles = () => {
    for (let n = 0; n < tiles.length; n++) {
        tiles[n].style.fontSize = "0em";
        tiles[n].style.backgroundColor = "#44445a";
    }
}

// Match tiles -> when one tile is clicked and displayed, check if next tile clicked has the same attribute value
// If match icons remain displayed and correctly guessed tiles become disabled

// CountCorrectAnswers -> count the number of tiles with value correct. Each time a pair of tiles are matched, add 1 to the countCorrectAnswers value

// CompleteGame -> When the number of correct answers == the number of cells the game can end

// CalculateScore -> adds number of clicks and elapsed time to calculate score & displays score upon game completion
const calculateScore = () => {
    timeScore = parseInt(timeScore);
    const calculatedScore = (timeScore + clicks);
    console.log(calculatedScore);
    document.querySelector("#score").firstChild.innerHTML = calculatedScore;
}

// Refresh/reset -> click button, invokes endGame() then reset tiles values, and return their default styling

// Additional levels of difficulty

let newRGB;

const generateRGBVal = () => {
    const generateRandomColor = () => {
        let r = Math.random();
        r = r * 255;
        r = Math.round(r);
        return r;
    }

    const rgbValue = [];
    for (let i = 0; i <= 2; i++) {
        const singleVal = generateRandomColor();
        rgbValue.push(singleVal);
    }
    newRGB = `rgb(${rgbValue[0]},${rgbValue[1]},${rgbValue[2]})`;
    return newRGB;
}

// Additional iterations/Future development
// Publish leaderboard;
// Use API to generate random icon or picture

const resetTiles = () => {
    for (const tile of tiles) {
        tile.style.backgroundColor = "#44445a";
        tile.removeAttribute("state");
        tile.classList.remove("hideTile");
        tile.classList.remove("displayTile");
    }
}
