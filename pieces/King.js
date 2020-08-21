class King extends Piece{
    constructor(color) {
        super(color);
        this.hasMoved=false;
        this.allowedMoves.push(new MoveVector(0,1));
        this.allowedMoves.push(new MoveVector(1,1));
        this.allowedMoves.push(new MoveVector(1,0));
        this.allowedMoves.push(new MoveVector(1,-1));
        this.allowedMoves.push(new MoveVector(0,-1));
        this.allowedMoves.push(new MoveVector(-1,-1));
        this.allowedMoves.push(new MoveVector(-1,0));
        this.allowedMoves.push(new MoveVector(-1,1));
        this.allowedMoves.push(new MoveVector(-2,0));
        this.allowedMoves.push(new MoveVector(2,0));
        if(this.color===Piece.WHITE){
            this.img="WhiteKing.png";
        }
        else
        {
            this.img="BlackKing.png";
        }
    }
    getClassName() {
        return "King";
    }

    clone()
    {
        let cloned=new King(this.color);
        cloned.hasMoved=this.hasMoved;
        return cloned;
    }
    getInitial() {
        return "K";
    }
    performMove=(board,initialPosition,finalPosition,testOnly=false)=>{
        let cloned = board.clone();
        cloned.setPiece(cloned.getSquare(initialPosition).piece,finalPosition);
        cloned.setPiece(EmptyPiece.getEmpty(),initialPosition);
        cloned.pepPosition=null;
        let moveVector=initialPosition.vectorTo(finalPosition);
        if(moveVector.x===2){
            let rookPosition=new Position(7,initialPosition.y);
            let finalRookPosition =new Position(5,initialPosition.y);
            if(this.hasMoved) return {board: cloned,success: false};
            if(cloned.getSquare(rookPosition).piece.hasMoved) return {board: cloned,success: false};
            cloned.getSquare(finalRookPosition).piece=cloned.getSquare(rookPosition).piece;
            cloned.getSquare(rookPosition).piece=EmptyPiece.getEmpty();
        }
        if(moveVector.x===-2) {
            let rookPosition = new Position(0, initialPosition.y);
            let finalRookPosition = new Position(3, initialPosition.y);
            if(this.hasMoved) return {board: cloned,success: false};
            if(cloned.getSquare(rookPosition).piece.hasMoved) return {board: cloned,success: false};
            cloned.getSquare(finalRookPosition).piece=cloned.getSquare(rookPosition).piece;
            cloned.getSquare(rookPosition).piece=EmptyPiece.getEmpty();
        }
            let success = !cloned.check();
        if(success && !testOnly){
            cloned.getSquare(finalPosition).piece.hasMoved=true;
            cloned.switchTurn();
            cloned.redrawAll();
            if(moveVector.x===2){board.specialmove="0-0";}
            else if(moveVector.x===-2){board.specialmove="0-0-0";}
            else {board.specialmove="";}
        }

        return {
            board:cloned,
            success:success,
        };
    }

}