class ChessSquare{
    constructor(i,j) {
        this.position=new Position(i,j);
        this.piece=EmptyPiece.getEmpty();
    }
    toHtml(){
        let img=this.piece.img!=="" ? "<img src='"+this.piece.img+"' alt=''>" : "";
        return ('<td onselectstart="return false;" onmousedown="board.handleClick('+this.position.x+","+this.position.y+')" onmouseup="board.handleRelease('+this.position.x+","+this.position.y+')" id="'+
           this.position.x+this.position.y+
            '" class="square'+(this.position.x+this.position.y)%2+
            '">'
            + img
            +'</td>');
    }
    isAttacked=(byColor,board)=>
    {
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                let square=board[i][j];
                if((square.piece.color===byColor)&&
                    (square.piece.moveIsAllowed(board,square.position,this.position,true)))
                {
                    return true;
                }
            }
        }
        return false;
    }
}