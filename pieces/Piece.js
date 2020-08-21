class Piece{
    static WHITE=1;
    static BLACK=0;
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
        //console.log("pathisclear");
        let unitVector=initialPosition.vectorTo(finalPosition).unitVector();
        for(let position=initialPosition.addVector(unitVector);!position.equals(finalPosition);position=position.addVector(unitVector))
        {
            // console.log("pathisclear",initialPosition,finalPosition,position);
            if(board.getSquare(position).piece.color !== Piece.EMPTY) return false;
        }
        let result=(board.getSquare(finalPosition).piece.color!==this.color)
        //console.log(result);
        return result;
    }
    clone()
    {
        return this;
    }
    getInitial(){
        console.error("implemeter getInitial dans "+this.getClassName());
        return "";
    }
    performMove=(board,initialPosition,finalPosition,testOnly=false)=>{
        let cloned = board.clone();
        cloned.setPiece(cloned.getSquare(initialPosition).piece,finalPosition);
        cloned.setPiece(EmptyPiece.getEmpty(),initialPosition);
        cloned.pepPosition=null;
        let success =! cloned.check();
        if(success && !testOnly){
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

    listLegalMoves(board,initialPosition){
        // console.log(this);
        let legalMoves=[];
        for(let move of this.allowedMoves){
            let finalPosition=initialPosition.addVector(move);
            if(finalPosition.isValid() && !finalPosition.equals(initialPosition) && this.moveIsAllowed(board,initialPosition,finalPosition) && this.pathIsClear(board,initialPosition,finalPosition))
            {
                if(this.performMove(board,initialPosition,finalPosition,true).success){
                    legalMoves.push([initialPosition,finalPosition]);
                }
            }
        }
        return legalMoves;
    }
}