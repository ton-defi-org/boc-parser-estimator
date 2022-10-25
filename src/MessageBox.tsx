import { Address, fromNano } from "ton";
import { addressEllipsis, addressFromJson, strEllipsis } from "./utils";
import { toSvg } from "jdenticon";


const AddressAvatar = ({ address, size }: any) => {
    const content = toSvg(address, size);

    return <span className="address-avatar" dangerouslySetInnerHTML={{ __html: content }}></span>;
    
}

const AddressLinkAndAvatar = ({ address }: any) => {
    
    const link = `https://tonscan.org/address/${address.toFriendly()}`;
    return (<div className="message-address">
        <a href={link}>
            <AddressAvatar size={32} address={address.toFriendly()} />
            {addressEllipsis(address.toFriendly())}
        </a>
    </div>);
}

export const MessageBox = ( { message }: any) => {

    if (!message) {
        return <div>empty</div>
    }
    const { inMessage, from, contractAddress, actions } = message;
    const fromAddress = addressFromJson(from);
    const myAddress = addressFromJson(contractAddress);
    
    const tonValue = fromNano(inMessage.value.toString());
    
    // const actionList = actions.map((it: any, i: number) => {
    //     return <MessageAction action={it} index={i} key={i} />
    // })
    return (
        <>
            <div className='message-item'>
                <AddressLinkAndAvatar address={myAddress} />
                {/* <div className="message-address"><AddressAvatar  size={32} address={myAddress.toFriendly()}/> {addressEllipsis(myAddress.toFriendly())}</div> */}
                <div className='message-item-body'>
                    <div>✉️</div>
                    {/* <div><b className='message-item-row'>from:</b>{addressEllipsis(fromAddress.toFriendly())}</div> */}
                    <div className="message-box-value">{tonValue}💎</div>
                    <div>
                        <pre className="message-body-pre">{strEllipsis(inMessage.body.toString(), 16)}</pre>
                    </div>
                    <br />
                    <div>🎬 <b className='message-item-row'>actions</b>: {actions.length}</div>
                    <br />
                    {/* <div>{actionList}</div> */}
                </div>
            </div>
        </>)
}