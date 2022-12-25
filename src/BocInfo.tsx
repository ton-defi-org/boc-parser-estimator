
import {  useState } from 'react';
import { RawStateInit } from 'ton';
import { boc } from './App';
import { BocResult } from './BocResult';
import BN from "bn.js";
import { ShareQrCode } from './ShareQrCode';

type BocResult = {
    
}

export const BocInfo = (props: {boc: boc, bocName:string, onClear: any, estimateBoc: any, publishBoc: any}) => {
    const { boc, onClear, estimateBoc, bocName, publishBoc } = props;

    const [results, setResults] = useState({} as BocResult);
    const [isLoading, setIsLoading] = useState(false);
    const [isPublishingBoc, setPublishingBoc] = useState(false);
    const [shareUrl, setShareUrl] = useState("");

    const [loadingTime, setLoadingTime] = useState("");
    const runBocEmulator = async () => {
        //@ts-ignore
        setIsLoading(true);
        let now = Date.now();
        let bocResultResponse = await estimateBoc(boc.rawData);
        setLoadingTime( `🚌 execution took ${((Date.now()- now) /1000).toFixed(2)}s` )
        setIsLoading(false);
        
        setResults(JSON.parse(bocResultResponse));
    }

    const publishBocClick = async () => {
        //@ts-ignore
        setPublishingBoc(true);
        
        let bocResultResponse = await publishBoc(boc.rawData);
        
        setPublishingBoc(false);
        
        console.log(bocResultResponse);
        
    }

    const shareClick =async () => {
        const url = `https://ton-defi-org.github.io/boc-parser-estimator/#${boc.rawData}`
        setShareUrl(url)
    }
    
    const stateInit = boc.init ? (<>
        <div className='mini-title'>Message State Init: </div>
        <div className="mini-header">Code</div>
        <pre className='pre-body'>Code:{boc.init?.code.toString()}</pre>
        <div className="mini-header">Data</div>
        <pre className='pre-body'>Data:{boc.init?.data.toString()}</pre>
    </>) : null;
    
    console.log('boc.body',boc.bodyCell);
    //@ts-ignore
    let externalStateInit;
    try {
        externalStateInit = (<div>
            <div className="mini-header">External State Init</div>
            <pre className='pre-body'>{(boc.stateInit as RawStateInit).code?.toString()}</pre>
        </div>)
    } catch (e) {
        console.log(e);
        
    }

    let buttonClass = (isLoading ? `is-loading` : ``)+ ` button is-info`

    return (
        <div>
            <div className='title'>{bocName}</div>
            <div>
                <div className='mini-title'>Source Wallet: </div>
                <div className='addr'>{boc.wallet}</div>
            </div>
            <div>
                <div className='mini-title'>Destination Address: </div>
                <div className='addr'>{boc.destination}</div>
            </div>
            <div>
                <div className='mini-title'>Transfer Amount: </div>
                <div className='addr'>{boc.amount} TON 💎</div>
            </div>
                <div>
                    <div className='mini-title'>Internal Flags: </div>
                <div className='addr'>Bounce:{boc.bounce}</div>
            </div>
            <div>
                {externalStateInit}
                <div>Cell</div>
                <pre className='pre-body'>{boc.body?.toString()}</pre>
                <div>Base64</div>
                <pre className='pre-body'>{boc.bodyCell?.toBoc().toString("hex")}</pre>
            </div>
            <div>{stateInit}</div>
            <br/>
            <button className='button is-danger' onClick={onClear}>❌ Clear</button>
            <span className='p-10'></span>
            <button className={buttonClass} onClick={runBocEmulator}>🎬 Estimate BOC</button>
            <span className='p-10'></span>
            <button className={`button is-primary ${isPublishingBoc ? 'is-loading' : ''}`} onClick={publishBocClick}>🚀 Publish BOC</button>
            <span className='p-10'></span>
            <button className={`button is-primary }`} onClick={shareClick}>🚀 Share Boc</button>
            <br></br>
            <BocResult messageList={results} loadingTime={loadingTime} />
            <ShareQrCode shareUrl={shareUrl} />
        </div>
        )
    };
    