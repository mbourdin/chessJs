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
    performMove=(board,initialPosition,finalPosition,testOnly=false)=>{
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
        if(moveVector.x!==0 && board.pepPosition!=null && finalPosition.equals(board.pepPosition))
        {
            let position=new Position(finalPosition.x,initialPosition.y);
            cloned.getSquare(position).piece=EmptyPiece.getEmpty();
        }
        let choice;
        if(finalPosition.y===0 || finalPosition.y===7 )
        {
            //open modal
            let choiceStr;
            if(!testOnly)
            {
                choiceStr=window.prompt("Choisir une piece comme cible de promotion <br>" +
                    "Q : Dame <br> N : Cavalier <br> R : Tour <br> B : Fou <br>", "Q" );

            }
            else{
                choiceStr="Q";
            }

            switch (choiceStr){
                case "N" :
                    choice=new Knight(this.color);
                    break;
                case "R" :
                    choice=new Rook(this.color);
                    break;
                case "B":
                    choice=new Bishop(this.color);
                    break;
                default :
                    choice = new Queen(this.color);
                    break;
            }
            console.log(choiceStr);
            cloned.getSquare(finalPosition).piece=choice;
        }
        let success = !cloned.check();
        if(success && !testOnly){
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