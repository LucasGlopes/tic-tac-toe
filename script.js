const Gameboard = (function() {
    const board = document.querySelector('#board');

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

    function resetGame(){
        spots.forEach(spot => {
            spot.textContent = "";
            spotsMarked = 0;
            turn = 1;
        })
    }

    return {
        createBoard,
        markSpot,
        resetGame,
    };
})();

const Player = (choice) => {
    let score = 0;

    const setScore = () => {
        score++;
    };

    const getScore = () => score;
    
    const getChoice = () => choice;


    return{
        setScore,
        getScore,
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
        return (spot.textContent == 'X' || spot.textContent == 'O');
    }

    function checkWinner(spots, combinations, choice, spotsMarked){
        const xScore = document.querySelector("#xScore");
        const oScore = document.querySelector("#oScore");
        for(let i = 0; i < combinations.length; i++){
            if(spots[combinations[i][0]].textContent == choice && spots[combinations[i][1]].textContent == choice && spots[combinations[i][2]].textContent == choice){
                if(choice == xPlayer.getChoice()){
                    xPlayer.setScore();
                    xScore.textContent = `${xPlayer.getScore()}`;
                }else{
                    oPlayer.setScore();
                    oScore.textContent = `${oPlayer.getScore()}`;
                }
                Gameboard.resetGame();
            }else if(spotsMarked == 9){
                Gameboard.resetGame();
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
var xPlayer = Player('X');
var oPlayer = Player('O');

Gameboard.markSpot(xPlayer.getChoice(),oPlayer.getChoice());