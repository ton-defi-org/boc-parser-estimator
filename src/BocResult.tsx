import {  Address, Cell, fromNano } from 'ton';
import { MessageAction } from './MessageAction';
import { MessageBox } from './MessageBox';
import { addressEllipsis, addressFromJson, strEllipsis } from './utils';


export const BocResult = (props: { messageList: any, loadingTime:string }) => {
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
    
    
    
    return (
        <div className='boc-output'>
            <div className='mini-header p-20'>
                {props.loadingTime}
            </div>
            {messagesChain}
            {/* {messages} */}
        </div>
    )
}


const MessagesChain = ({ chain, indent }: any) => {
    const messagesChain = chain.map(  (message: any, index: number) => {
        return <MessageBox message={message} key={index} />
    });
    const _class = `flex indent-${indent}`
    return (<div className={_class}>
        {messagesChain}
    </div>)
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
        return <MessageAction action={it} index={i} key={i} />
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
            </div>
        </>)
}



