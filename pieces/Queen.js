class Queen extends Piece{
    constructor(color) {
            super(color);
        for(let i=-7;i<=7;i++)
        {   if (i!==0)
            {
                this.allowedMoves.push(new MoveVector(i,0));
                this.allowedMoves.push(new MoveVector(0,i));
                this.allowedMoves.push(new MoveVector(i,i));
                this.allowedMoves.push(new MoveVector(i,-i));
            }
        }
        if(this.color===Piece.WHITE){
            this.img="WhiteQueen.png";
        }
        else
        {
            this.img="BlackQueen.png";
        }
    }
    getClassName() {
        return "Queen";
    }
    getInitial() {
        return "Q";
    }
}