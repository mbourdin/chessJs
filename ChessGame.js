class ChessGame{
    constructor() {
        this.statesHistory=[];

        document.getElementById("showCurrentPositionButton").addEventListener("click",this.showCurrent);
    }

    pushBoard(board){
        this.statesHistory.push(board);
    }
    showCurrent=()=>{
        this.viewHistory(this.statesHistory.length-1);
    }
    viewHistory=(n=this.statesHistory[0].currentMoveNumber)=>
    {
        if(n>=this.statesHistory.length){
            return;
        }
        this.statesHistory[n].redrawAll()
        if(n===this.statesHistory.length-1)
        {
            document.getElementById("boardDiv").classList.remove("blockMouseEvents");
        }
        else
        {
            document.getElementById("boardDiv").classList.add("blockMouseEvents");
        }
    }


}