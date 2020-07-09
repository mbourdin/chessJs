class EmptyPiece extends Piece {
    static empty = null;

    constructor() {
        super(Piece.EMPTY);
        this.img = "";
    }

    static getEmpty() {
        if (EmptyPiece.empty === null) {
            EmptyPiece.empty= new EmptyPiece();
        }
        return EmptyPiece.empty;
    }
    getClassName() {
        return "EmptyPiece";
    }
    getInitial() {
        return "";
    }
}