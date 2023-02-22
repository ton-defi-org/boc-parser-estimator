import { Cell, fromNano } from "ton"

const WITHDRAW = 0x1000;
const CHANGE_VALIDATOR = 0x1001;

export const BocBody = (props: { body?: Cell }) => {
    if (!props.body) {
        return <div>x{}</div>;
    }
    let parsedBody = parse(props.body)
    if(!parsedBody) {
        return <div>{props.body.toString()}</div>
    }
    return <div>
        <div>Op:{parsedBody.opName} ({parsedBody.op})</div>    
        <div>Withdraw Amount:{parsedBody.amount}</div>    
        <div>op:{parsedBody.newValidator}</div>    
    </div>
}


function parse(body?: any) {
    try {

        
        const s = body.beginParse();
    if(body.bits.length == 0) {
        return {
            op: 0,
            opName: "",
        }
    }
    let op;
    try {
        op = s.readUint(32).toNumber();
    } catch (e) {
        return {
            op: 0,
            opName: "",
        }
    }
    s.readUint(64)
    
    if (op == WITHDRAW) {
        
        let amount = s.readCoins();
        
        return {
            op,
            opName: "Withdraw",
            amount: fromNano(amount)
        }
    }
    
    if (op == CHANGE_VALIDATOR) {
        
        let newValidator = s.readAddress();
        return {
            op,
            opName: "Change Validator",
            newValidator: newValidator?.toFriendly()
        }
    }
} catch(e) {

    
    return {
        op: "",
        opName:"",
    }
}

}