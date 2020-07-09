class Position{
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
    isValid()
    {
        return(
            (this.x>=0) && (this.y>=0) && (this.x<8) && (this.y<8)
        );
    }
    vectorTo(destPos)
    {
        return new MoveVector(destPos.x-this.x,destPos.y-this.y);
    }
    equals(position)
    {
        return (this.x===position.x && this.y===position.y);
    }
    addVector(moveVector){
        return new Position(this.x+moveVector.x,this.y+moveVector.y);
    }

}