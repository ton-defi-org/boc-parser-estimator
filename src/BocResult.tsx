import {  Address, Cell, fromNano } from 'ton';
import { addressEllipsis, addressFromJson, strEllipsis } from './utils';


export const BocResult = (props: { messageList: any }) => {
    console.log(props);
    
    const { messageList } = props;
    console.log(messageList);
    if (!messageList || Object.keys(messageList).length == 0) {
        return <div></div>
    }
    const messages = messageList.messageList.map(  (message: any, index: number) => {
        return <Message message={message} key={index} />
    });

    const { chain } = messageList; 
    const messagesChain = [];
    let chainCounter = 0;
    for(const key in chain) {
        messagesChain.push( <MessagesChain chain={chain[key]} key={key} indent={chainCounter++} />)
    }
    
    
    
    return (<div>
        <div className='header-boc-output'>
            Messages Output
        </div>
        {messagesChain}
        {/* {messages} */}
    </div>)
}


const MessagesChain = ({ chain, indent }: any) => {
    const messagesChain = chain.map(  (message: any, index: number) => {
        return <MessageShort message={message} key={index} />
    });
    const klass = `flex indent-${indent}`
    return (<div className={klass}>
        {messagesChain}
    </div>)
}


const MessageShort = ( { message }: any) => {

    if (!message) {
        return <div>empty</div>
    }
    const { inMessage, from, contractAddress, actions } = message;
    const fromAddress = addressFromJson(from);
    const myAddress = addressFromJson(contractAddress);
    
    const val = fromNano(inMessage.value.toString());
    
    const actionList = actions.map((it: any, i: number) => {
        return <Action action={it} index={i} key={i} />
    })
    return (
        <>
            <div className='message-item'>
                <div>{addressEllipsis(myAddress.toFriendly())}</div>
                <br></br>
                <div><b className='message-item-row'>from:</b>{addressEllipsis(fromAddress.toFriendly())}</div>
                <div><b className='message-item-row'>value:</b>{val}💎</div>
                <div><pre>{strEllipsis(inMessage.body.toString(), 16)}</pre></div>
                <div><b className='message-item-row'>actions</b>: {actions.length}</div>
                {/* <div>{actionList}</div> */}
    </div></>)
}


const Message = ( { message }: any) => {

    if (!message) {
        return <div>empty</div>
    }
    const { inMessage, from, contractAddress, actions } = message;
    const fromAddress = addressFromJson(from);
    const myAddress = addressFromJson(contractAddress);
    
    const val = fromNano(inMessage.value.toString());
    
    const actionList = actions.map((it: any, i: number) => {
        return <Action action={it} index={i} key={i} />
    })
    return (
        <>
            <div className='header-boc-output'>Boc's Messages output</div>
            <div className='message-result'>
                <div><b className='res-property'>from:</b>{fromAddress.toFriendly()}</div>
                <div><b className='res-property'>value:</b>{val}💎</div>
                <div><b className='res-property'>To:</b>{myAddress.toFriendly()}</div>
                <div><b className='res-property'>body:</b><pre>{strEllipsis(inMessage.body.toString(), 50)}</pre></div>
                <div><b className='res-property'>actions</b>: {actions.length}</div>
                <div>{actionList}</div>
    </div></>)
}



const Action = ({ action, index }: any) => {
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