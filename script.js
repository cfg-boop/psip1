const selectBox = document.querySelector(".select-box");
const selectBtnX = selectBox.querySelector(".options .playerX");
const selectBtnO = selectBox.querySelector(".options .playerO");
const playBoard = document.querySelector(".play-board");
const players = document.querySelector(".players");
const allBox = document.querySelectorAll("section span");
const resultBox = document.querySelector(".result-box");
const wonText = resultBox.querySelector(".won-text");
const replayBtn = resultBox.querySelector("button");

window.onload = () => {
    allBox.forEach(box => {
        box.onclick = () => clickedBox(box);
    });
}

selectBtnX.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
}

selectBtnO.onclick = () => {
    selectBox.classList.add("hide");
    playBoard.classList.add("show");
    players.classList.add("active", "player");
}

let playerXIcon = "fas fa-times";
let playerOIcon = "far fa-circle";
let playerSign = "X";
let runBot = true;

function clickedBox(element) {
    if (players.classList.contains("player")) {
        playerSign = "O";
        element.innerHTML = `<i class="${playerOIcon}"></i>`;
        players.classList.remove("active");
    } else {
        element.innerHTML = `<i class="${playerXIcon}"></i>`;
        players.classList.add("active");
    }
    element.setAttribute("id", playerSign);
    element.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "none";
    selectWinner();
    setTimeout(() => {
        bot();
    }, Math.random() * 1000 + 200);
}

function bot() {
    if (!runBot) return;

    let emptyBoxes = Array.from(allBox).filter(box => !box.childElementCount);
    if (emptyBoxes.length === 0) return;

    let randomBox = emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
    playerSign = players.classList.contains("player") ? "X" : "O";
    randomBox.innerHTML = `<i class="${playerSign === "X" ? playerXIcon : playerOIcon}"></i>`;
    randomBox.setAttribute("id", playerSign);
    randomBox.style.pointerEvents = "none";
    playBoard.style.pointerEvents = "auto";

    if (playerSign === "X") {
        players.classList.add("active");
    } else {
        players.classList.remove("active");
    }

    playerSign = "X";
    selectWinner();
}

function getIdVal(classname) {
    return document.querySelector(".box" + classname).id;
}

function checkIdSign(val1, val2, val3, sign) {
    return getIdVal(val1) === sign && getIdVal(val2) === sign && getIdVal(val3) === sign;
}

function selectWinner() {
    const winPatterns = [
        [1, 2, 3], [4, 5, 6], [7, 8, 9],
        [1, 4, 7], [2, 5, 8], [3, 6, 9],
        [1, 5, 9], [3, 5, 7]
    ];

    if (winPatterns.some(pattern => checkIdSign(...pattern, playerSign))) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.innerHTML = `Gracz <p>${playerSign}</p> wygral.`;
        }, 700);
    } else if (Array.from(allBox).every(box => box.id)) {
        runBot = false;
        setTimeout(() => {
            resultBox.classList.add("show");
            playBoard.classList.remove("show");
            wonText.textContent = "Remis!";
        }, 700);
    }
}

replayBtn.onclick = () => {
    window.location.reload();
}
