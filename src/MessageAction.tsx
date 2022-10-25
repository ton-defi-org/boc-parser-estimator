import { fromNano } from "ton";
import { addressFromJson } from "./utils";



export const MessageAction = ({ action, index }: any) => {
    console.log(action);

    const { type, mode, message } = action;
    console.log(message.info.value.coins);
    
    const value = fromNano(message.info.value.coins)
    const dest = addressFromJson(message.info.dest);
        
    return (<div className='flex action-line text-3xl font-bold underline text-red-600'>
        
        <div>{index+1})<b className=''> type:</b>{type}</div>
        <div><b className=''>mode:</b>{mode}</div>
        <div><b className=''>value:</b>{value}💎</div>
        <div><b className=''>dest:</b>{dest.toFriendly()}💎</div>
        
        {/* <div><b className='res-property'>from:</b>{fromAddress.toFriendly()}</div>
        <div><b className='res-property'>from:</b>{fromAddress.toFriendly()}</div> */}
    </div>)
}