const Gameboard = (function() {
    const board = document.querySelector('#board');

    //const spots = Array.from({length: 9});
    const spots = [];
    const winningCombinations = [
        [0, 1 , 2],
        [3, 4 , 5],
        [6, 7 , 8],
        [0, 3 , 6],
        [1, 4 , 7],
        [2, 5 , 8],
        [0, 4 , 8],
        [2, 4 , 6]
    ];
    let turn = 1;
    let spotsMarked = 0;
    function createBoard(){
        for(let i = 0; i < 9; i++){
            spots[i] = document.createElement('div');
            spots[i].classList.add('spots');
            board.append(spots[i]);
        }
    }

    function markSpot(player1Choice, player2Choice){
        spots.forEach((spot) => {
            spot.addEventListener('click', () => {
                if(!Validations.isSpotMarked(spot)){
                    spot.textContent = ((turn % 2) ? player1Choice : player2Choice);
                    turn++;
                    spotsMarked++;
                }
                if(spotsMarked >= 3){
                    Validations.checkWinner(spots, winningCombinations, spot.textContent, spotsMarked);
                }
            });
        });
    }

    function clearSpots(){
        spots.forEach(spot => {
            spot.textContent = "";
            spotsMarked = 0;
            turn = 1;
        })
    }

    return {
        createBoard,
        markSpot,
        clearSpots,
    };
})();

const Player = (name, choice) => {
    let score = 0;

    const setScore = () => {
        score++;
    };

    const getScore = () => score;
    
    const getName = () => name;

    const getChoice = () => choice;


    return{
        setScore,
        getScore,
        getName,
        getChoice,
    };
}

const Validations = (() => {

    function checkName(name){
        if(name.isEmpty()){
            alert("Write a name!");
            return true;
        }else {
            return false;
        }   
    }

    function isSpotMarked(spot){
        if(spot.textContent == 'X' || spot.textContent == 'O'){
            alert("Spot Marked. Choose Another one!");
            return true;
        }else{ 
            return false;
        }
    }

    function checkWinner(spots, combinations, choice, spotsMarked){
        const scoreBoard = document.querySelector("#scoreHeader");
        const xScore = document.querySelector("#xScore");
        const oScore = document.querySelector("#oScore");
        for(let i = 0; i < combinations.length; i++){
            if(spots[combinations[i][0]].textContent == choice && spots[combinations[i][1]].textContent == choice &&
                spots[combinations[i][2]].textContent == choice){
                    //scoreBoard.textContent = `${choice} won!!!`;
                    (choice == xPlayer.getChoice()) ? xPlayer.setScore() : oPlayer.setScore();
                    console.log(xPlayer.getScore());
                    xScore.textContent = `${xPlayer.getScore()}`;
                    oScore.textContent = `${oPlayer.getScore()}`;
                    Gameboard.clearSpots();
            }else if(spotsMarked == 9){
                Gameboard.clearSpots();

            }
        }
    }

    return{
        checkName,
        isSpotMarked,
        checkWinner,
    };
}
)();

Gameboard.createBoard();
var xPlayer = Player('lucas','X');
var oPlayer = Player('luca', 'O');

//currentPlayer = xPlayer.getChoice();
//spots.markSpot(currentPlayer);
Gameboard.markSpot(xPlayer.getChoice(),oPlayer.getChoice());