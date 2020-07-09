class Rook extends Piece{
    constructor(color) {
        super(color);
        this.hasMoved=false;
        for(let i=-7;i<=7;i++)
        {   if (i!==0)
        {
            this.allowedMoves.push(new MoveVector(i,0));
            this.allowedMoves.push(new MoveVector(0,i));

        }
        }
        if(this.color===Piece.WHITE){
            this.img="WhiteRook.png";
        }
        else
        {
            this.img="BlackRook.png";
        }
    }
    getClassName() {
        return "Rook";
    }
    clone()
    {
        let cloned=new Rook(this.color);
        cloned.hasMoved=this.hasMoved;
        return cloned;
    }
    getInitial() {
        return "R";
    }
    performMove=(board,initialPosition,finalPosition)=>{
        let cloned = board.clone();
        cloned.setPiece(cloned.getSquare(initialPosition).piece,finalPosition);
        cloned.setPiece(EmptyPiece.getEmpty(),initialPosition);
        cloned.pepPosition=null;
        let success =! cloned.check();
        if(success){
            cloned.getSquare(finalPosition).piece.hasMoved=true;
            cloned.switchTurn();
            cloned.redrawAll();
        }

        return {
            board:cloned,
            success:success,
        };
    }
}