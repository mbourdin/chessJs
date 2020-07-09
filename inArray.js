function inArray(object,array)
{
    for(let o of array)
    {
        if(object.equals(o)){return true;}
    }
    return false;
}