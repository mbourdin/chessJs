class Pawn extends Piece{
    constructor(color) {
        super(color);
        if(this.color===Piece.WHITE){
            this.img="WhitePawn.png"
            this.allowedMoves.push(new MoveVector(0,1));
            this.allowedMoves.push(new MoveVector(0,2));
            this.allowedMoves.push(new MoveVector(1,1));
            this.allowedMoves.push(new MoveVector(-1,1));
        }
        else
        {
            this.img="BlackPawn.png";
            this.allowedMoves.push(new MoveVector(0,-1));
            this.allowedMoves.push(new MoveVector(0,-2));
            this.allowedMoves.push(new MoveVector(1,-1));
            this.allowedMoves.push(new MoveVector(-1,-1));
        }
    }
    getClassName() {
        return "Pawn";
    }
    getInitial() {
        return "";
    }
    moveIsAllowed(board,initialPosition,finalPosition)
    {   if (this.color!==board.playerToMove)
        {
            return false;
        }
        let attemptedMove=initialPosition.vectorTo(finalPosition);
        for(let move of this.allowedMoves)
        {
            if(attemptedMove.equals(move))
            {   let justAMove=(
                move.equals(new MoveVector(0,1))
                ||
                move.equals(new MoveVector(0,2))
                ||
                move.equals(new MoveVector(0,-1))
                ||
                move.equals(new MoveVector(0,-2))
                );
                if(justAMove)
                {
                    if(move.y===2 && initialPosition.y!==1){return false;}
                    if(move.y===-2 && initialPosition.y!==6){return false;}
                    return (this.pathIsClear(board,initialPosition,finalPosition) && board.getSquare(finalPosition).piece.color===Piece.EMPTY);
                }
                else
                {
                    return (
                        (board.getSquare(finalPosition).piece.color===board.opponent())
                        ||
                        (finalPosition.equals(board.pepPosition))
                    );
                }
            }
        }
        return false;
    };
    performMove=(board,initialPosition,finalPosition)=>{
        let cloned = board.clone();
        cloned.setPiece(cloned.getSquare(initialPosition).piece,finalPosition);
        cloned.setPiece(EmptyPiece.getEmpty(),initialPosition);
        let moveVector=initialPosition.vectorTo(finalPosition);
        if((moveVector.y===2)||(moveVector.y===-2)){
            cloned.pepPosition=new Position(initialPosition.x,(initialPosition.y+finalPosition.y)/2);
        }
        else
        {
            cloned.pepPosition=null;
        }
        if(moveVector.x!==0)
        {
            let position=new Position(finalPosition.x,initialPosition.y);
            cloned.getSquare(position).piece=EmptyPiece.getEmpty();
        }
        let choice;
        if(finalPosition.y===0 || finalPosition.y===7)
        {
            //open modal

            //get choice from user
            choice=new Queen(this.color);
            cloned.getSquare(finalPosition).piece=choice;
        }
        let success = !cloned.check();
        if(success){
            cloned.switchTurn();
            cloned.redrawAll();
            if(finalPosition.y===0 || finalPosition.y===7){
                board.specialmove="="+choice.getInitial();
            }
            else {
                board.specialmove="";
            }
        }
        return {
            board:cloned,
            success:success,
        };
    }
}