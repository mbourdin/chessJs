class MoveVector{
    constructor(x,y) {
        this.x=x;
        this.y=y;
    }
    isValid()
    {
        return(this.x>-8 && this.x<8 && this.y>-8 && this.y<8);
    }
    equals(move)
    {
        return(this.x===move.x && this.y===move.y);
    }
    distance()
    {
        return Math.max(Math.abs(this.x),Math.abs(this.y));
    }
    unitVector()
    {   let d=this.distance()
        return new MoveVector(this.x/d,this.y/d);
    }
}