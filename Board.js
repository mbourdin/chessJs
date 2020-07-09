class Board{
    static init=false;
    constructor(body,game,playerToMove=Piece.WHITE,currentMoveNumber=0){
        this.currentMoveNumber=currentMoveNumber;
        this.body=document.getElementById(body);
        this.game=game;
        this.playerToMove=playerToMove;
        this.pepPosition=null;
        this.view=Piece.WHITE;
        this.squares=new Array(8);
        this.specialmove="";
        for(let i=0;i<8;i++)
        {
            this.squares[7-i]=new Array(8);
            for(let j=0;j<8;j++)
            {
                this.squares[7-i][j]=new ChessSquare(j,i);
            }
        }
        this.currentPosition=null;

        if(Board.init===false) {
            document.getElementById("newGameButton").addEventListener("click",this.setupNewGame);
            document.getElementById("flipViewButton").addEventListener("click",this.flipView);
            Board.init = true;
            let html = "";
            let rowId = 7;
            for (let column of this.squares) {
                html += "<tr id='" + rowId + "'>";
                for (let square of column) {
                    html += square.toHtml();
                }
                html += "</tr>";
                rowId--;
            }
            this.body.innerHTML = html;
        }
    }
    opponent=()=>{return Piece.WHITE+Piece.BLACK-this.playerToMove;}

    flipView=()=>{
        this.view=Piece.WHITE+Piece.BLACK-this.view;
        if(this.view===Piece.BLACK){
            for(let nrow=0;nrow<8;nrow++)
            {   let row =document.getElementById(nrow.toString());
                for(let ncolumn=0;ncolumn<8;ncolumn++)
                {   let square=document.getElementById((7-ncolumn).toString()+(7-nrow).toString());
                    row.appendChild(square);
                }
            }
        }
        else
        {
            for(let nrow=0;nrow<8;nrow++)
            {   let row =document.getElementById(nrow.toString());
                for(let ncolumn=0;ncolumn<8;ncolumn++)
                {   let square=document.getElementById((ncolumn).toString()+(nrow).toString());
                    row.appendChild(square);
                }
            }
        }
    };
    switchTurn(){
        this.playerToMove=this.opponent();
        let playerTurn=document.getElementById("playerTurn");
        if (this.playerToMove===Piece.WHITE)
        {
            playerTurn.classList.add("whiteTurn");
            playerTurn.classList.remove("blackTurn");
        }
        else
        {
            playerTurn.classList.remove("whiteTurn");
            playerTurn.classList.add("blackTurn");
        }
        this.currentMoveNumber++;
        this.game.pushBoard(this);

    }
    setupNewGame=()=>
    {   this.game=new ChessGame();
        this.specialmove="";
        let playerTurn=document.getElementById("playerTurn");
        playerTurn.classList.add("whiteTurn");
        playerTurn.classList.remove("blackTurn");
        this.playerToMove=Piece.WHITE;
        let wrook1 = new Rook(Piece.WHITE);
        this.setPiece(wrook1,new Position(0,0));
        let wrook2 = new Rook(Piece.WHITE);
        this.setPiece(wrook2,new Position(7,0));
        let wqueen = new Queen(Piece.WHITE);
        this.setPiece(wqueen,new Position(3,0));
        let wking = new King(Piece.WHITE);
        this.setPiece(wking,new Position(4,0));
        let wbishop = new Bishop(Piece.WHITE);
        this.setPiece(wbishop,new Position(2,0));
        this.setPiece(wbishop,new Position(5,0));
        let wknight = new Knight(Piece.WHITE);
        this.setPiece(wknight,new Position(1,0));
        this.setPiece(wknight,new Position(6,0));
        let brook1 = new Rook(Piece.BLACK);
        this.setPiece(brook1,new Position(0,7));
        let brook2 = new Rook(Piece.BLACK);
        this.setPiece(brook2,new Position(7,7));
        let bqueen = new Queen(Piece.BLACK);
        this.setPiece(bqueen,new Position(3,7));
        let bking = new King(Piece.BLACK);
        this.setPiece(bking,new Position(4,7));
        let bbishop = new Bishop(Piece.BLACK);
        this.setPiece(bbishop,new Position(2,7));
        this.setPiece(bbishop,new Position(5,7));
        let bknight = new Knight(Piece.BLACK);
        this.setPiece(bknight,new Position(1,7));
        this.setPiece(bknight,new Position(6,7));
        let wpawn = new Pawn(Piece.WHITE);
        let bpawn = new Pawn(Piece.BLACK);
        for(let i=0;i<8;i++)
        {
            this.setPiece(wpawn,{x:i,y:1});
            this.setPiece(bpawn,{x:i,y:6});
        }
        for(let j=2;j<6;j++)
        {
            for(let i=0;i<8;i++)
            {
                this.setPiece(EmptyPiece.getEmpty(),new Position(i,j));
            }
        }
        this.redrawAll();
        this.game.pushBoard(this.clone());
        let movesPlayed=document.getElementById("movesPlayed");
        let startOfGame=document.getElementById('startOfGame');
        let moves=document.getElementById("moves");
        moves.innerHTML="";
        moves.appendChild(movesPlayed);
        moves.appendChild(startOfGame);
    };
    redrawAll(){
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                this.redraw({x:i,y:j});
            }
        }
    }
    check=()=>{
        let kingPosition;
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                if(this.squares[i][j].piece.color===this.playerToMove && this.squares[i][j].piece.getInitial()==="K")
                {
                    kingPosition=new Position(i,j);
                }
            }
        }
        console.log(kingPosition);
        console.log(this);
            let result=this.getSquare(kingPosition).isAttacked(this.opponent(),this);
        console.log(result);
        return result;
    }
    setPiece(piece,position)
    {
        this.squares[position.x][position.y].piece=piece;
    }
    getSquare(position)
    {
        return this.squares[position.x][position.y];
    }
    redraw(position)
    {
        let str=position.x+""+position.y;
        let e=document.getElementById(str);

        if(this.getSquare(position).piece.img!=="")
        {
            e.innerHTML="<img draggable='false' width='60' height='60' src='pieces/"+this.getSquare(position).piece.img+"' alt=''>";
        }
        else
        {
            e.innerHTML="";
        }

    }
    handleClick=(i,j)=>{
        this.currentPosition=new Position(i, j);

    }
    handleRelease=(i,j)=>{
        let position=new Position(i,j);

        if(this.currentPosition &&
            !this.currentPosition.equals(position) &&
            this.getSquare(this.currentPosition).piece.moveIsAllowed(this,this.currentPosition,position)

        )
        {   let result=this.getSquare(this.currentPosition).piece.performMove(this,this.currentPosition,position);
            if(result.success)
            {   this.syncState(result.board);
                let newDiv=document.createElement("div");
                newDiv.classList.add("moveButton");
                let newButton=document.createElement("button");
                newButton.id="move"+this.game.statesHistory.length;
                newButton.classList.add("fullWidth");
                switch (this.specialmove) {
                    case "" :
                        newButton.innerHTML=this.getSquare(position).piece.getInitial()+
                            String.fromCharCode(this.currentPosition.x+97)+
                            (this.currentPosition.y+1)+
                            "-"+
                            String.fromCharCode(position.x+97)+
                            (position.y+1);
                        break;
                    case "0-0-0":
                    case "0-0":
                        newButton.innerHTML=this.specialmove;
                        break ;
                    default ://promotions
                        newButton.innerHTML=
                            String.fromCharCode(this.currentPosition.x+97)+
                            (this.currentPosition.y+1)+
                            "-"+
                            String.fromCharCode(position.x+97)+
                            (position.y+1)+this.specialmove;
                        break;
                }

                let n=this.currentMoveNumber;
                newButton.addEventListener("click",()=>{this.game.viewHistory(n)});
                document.getElementById("moves").appendChild(newDiv);
                newDiv.appendChild(newButton);
            }
            else
            {
                console.log("move rejected");
            }
        }
    }


    clone(){
        let cloned=new Board(this.body,this.game,this.playerToMove,this.currentMoveNumber)
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                cloned.squares[i][j].piece=this.squares[i][j].piece.clone();
            }
        }
        cloned.pepPosition=this.pepPosition;
        return cloned;
    }
    syncState(board){
        for(let i=0;i<8;i++)
        {
            for(let j=0;j<8;j++)
            {
                this.squares[i][j].piece=board.squares[i][j].piece.clone();
            }
        }
        this.currentMoveNumber=board.currentMoveNumber;
        this.playerToMove=board.playerToMove;
        this.pepPosition=board.pepPosition;
    }
}
