let boxes=document.querySelectorAll(".box")
let reset=document.querySelector("#restart")
const popup = document.getElementById("popup");
const winnerMsg = document.getElementById("winnermsg");
const newGameBtn = document.getElementById("newGame");
const xWinsE=document.getElementById("xWins")
const oWinsE=document.getElementById("oWins")
const drawsE=document.getElementById("draws")
const turnIndicator = document.getElementById("turnIndicator");


let xWins=0;
let oWins=0;
let draws=0;
let firstTurn=true;
let turnx=true; //track player X (true for x, false for o)

const winPatterns=[
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6],
]

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        console.log("Box is clicked")
        if(turnx){
            box.innerText="X";
            turnx=false;
        }else{
            box.innerText="O";
            turnx=true;
        }
        box.disabled=true;
        turnIndicator.innerText = `Turn: ${turnx ? "X" : "O"}`;
        checkWinner();
    })
});

const disableBox=()=>{
    for(let box of boxes){
        box.disabled=true;
    }
}

const enableBox=()=>{
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
}

const showWinner=(winner)=>{
    if(winner === "draw"){
        winnerMsg.innerText="It's a Draw!";
        draws++;
        drawsE.innerText=draws;
    }else{
        winnerMsg.innerText=`Winner: ${winner}`;
        if(winner === "X"){
            xWins++;
            xWinsE.innerText=xWins;
        }else{
            oWins++;
            oWinsE.innerText=oWins;
        }
    }
    popup.style.display="flex";
    disableBox();
}

const checkWinner=()=>{
    let winnerFound=false;
    for(let pattern of winPatterns){

        let pos1=boxes[pattern[0]].innerText;
        let pos2=boxes[pattern[1]].innerText;
        let pos3=boxes[pattern[2]].innerText;

        if(pos1 !== "" && pos2 !=="" && pos3 !== ""){
            if(pos1 === pos2 && pos2 ===pos3){
                disableBox();
                console.log("Winner",pos1);
                showWinner(pos1);
                winnerFound=true;
                return;
            }
        }
    }

    let filled=true;
    boxes.forEach((box)=>{
        if(box.innerText===""){
            filled=false;
        }
    });

    if(!winnerFound && filled){
        console.log("Draw");
        showWinner("draw");
    }
}

const resetGame=()=>{
    enableBox();
    firstTurn=!firstTurn;
    turnx=firstTurn;
    turnIndicator.innerText=`Turn: ${turnx ? "X" : "O"}`;
};

reset.addEventListener("click",resetGame);
newGameBtn.addEventListener("click",()=>{
    resetGame();
    popup.style.display="none";
})