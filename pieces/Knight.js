class Knight extends Piece{
    constructor(color) {
        super(color);

        this.allowedMoves.push(new MoveVector(1,2));
        this.allowedMoves.push(new MoveVector(2,1));
        this.allowedMoves.push(new MoveVector(1,-2));
        this.allowedMoves.push(new MoveVector(-2,1));
        this.allowedMoves.push(new MoveVector(-1,-2));
        this.allowedMoves.push(new MoveVector(-2,-1));
        this.allowedMoves.push(new MoveVector(-1,2));
        this.allowedMoves.push(new MoveVector(2,-1));
        if(this.color===Piece.WHITE){
            this.img="WhiteKnight.png";
        }
        else
        {
            this.img="BlackKnight.png";
        }
    }
    getClassName() {
        return "Knight";
    }
    getInitial() {
        return "N";
    }
    pathIsClear(board,initialPosition,finalPosition)
    {
        return (board.getSquare(finalPosition).piece.color!==this.color)
    }
}