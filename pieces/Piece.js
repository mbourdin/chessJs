class Piece{
    static WHITE=0;
    static BLACK=1;
    static EMPTY=2;
    constructor(color) {
        this.allowedMoves=[];
        this.hasMoved=true;
        this.color=color;
    }
    getClassName(){
        return "Piece";
    }
    moveIsAllowed(board,initialPosition,finalPosition,ignoreTurn=false)
    {   if (this.color!==board.playerToMove && !ignoreTurn)
        {
            return false;
        }
        let attemptedMove=initialPosition.vectorTo(finalPosition);
        for(let move of this.allowedMoves)
        {
            if(attemptedMove.equals(move))
            {
                return this.pathIsClear(board,initialPosition,finalPosition);
            }
        }
        return false;
    };
    pathIsClear(board,initialPosition,finalPosition)
    {

        let unitVector=initialPosition.vectorTo(finalPosition).unitVector();
        for(let position=initialPosition.addVector(unitVector);!position.equals(finalPosition);position=position.addVector(unitVector))
        {
            if(board.getSquare(position).piece.color===this.color) return false;
        }
        return (board.getSquare(finalPosition).piece.color!==this.color);
    }
    clone()
    {
        return this;
    }
    getInitial(){
        console.error("implemeter getInitial dans "+this.getClassName());
        return "";
    }
    performMove=(board,initialPosition,finalPosition)=>{
        let cloned = board.clone();
        cloned.setPiece(cloned.getSquare(initialPosition).piece,finalPosition);
        cloned.setPiece(EmptyPiece.getEmpty(),initialPosition);
        cloned.pepPosition=null;
        let success =! cloned.check();
        if(success){
            this.hasMoved=true;
            cloned.switchTurn();
            cloned.redrawAll();
            board.specialmove="";
        }

        return {
            board:cloned,
            success:success,
        };
    }
}