export class Dialog{
    owner;  //Bot or User
    msg;    
    timeStamp; //T1~Tn
    constructor(owner,msg,timeStamp){
        this.owner = owner;
        this.msg = msg;
        this.timeStamp = timeStamp;
    }
}