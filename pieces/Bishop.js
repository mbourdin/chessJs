class Bishop extends Piece{
    constructor(color) {
        super();
        for(let i=-7;i<=7;i++)
        {   if (i!==0)
        {
            
            this.allowedMoves.push(new MoveVector(i,i));
            this.allowedMoves.push(new MoveVector(i,-i));
        }
        }
        this.color=color;
        if(this.color===Piece.WHITE){
            this.img="WhiteBishop.png";
        }
        else
        {
            this.img="BlackBishop.png";
        }
    }
    getClassName() {
        return "Bishop";
    }
    getInitial() {
        return "B"
    }
}