
import {  useState } from 'react';
import { RawStateInit } from 'ton';
import { boc } from './App';
import { BocResult } from './BocResult';
import BN from "bn.js";

type BocResult = {
    
}

export const BocInfo = (props: {boc: boc, onClear: any, estimateBoc: any}) => {
    const { boc, onClear, estimateBoc } = props;

    const [results, setResults] = useState({} as BocResult);
    const runBoc = async () => {
        //@ts-ignore
        let x = await estimateBoc(boc.rawData );
        
        
        setResults(JSON.parse(x));
    }
    
    const stateInit = boc.init ? (<>
        <div className='title '>Message State Init: </div>
        <div className="mini-header">Code</div>
        <pre className='pre-body'>Code:{boc.init?.code.toString()}</pre>
        <div className="mini-header">Data</div>
        <pre className='pre-body'>Data:{boc.init?.data.toString()}</pre>
    </>) : null;
    
    console.log('boc.body',boc.bodyCell);
    //@ts-ignore
    

    return (
        <div>  
            <div>
                <div className='title'>Source Wallet: </div>
                <div className='addr'>{boc.wallet}</div>
            </div>
            <div>
                <div className='title'>Destination Address: </div>
                <div className='addr'>{boc.destination}</div>
            </div>
            <div>
                <div className='title'>Transfer Amount: </div>
                <div className='addr'>{boc.amount} TON 💎</div>
            </div>
                <div>
                    <div className='title'>Internal Flags: </div>
                <div className='addr'>Bounce:{boc.bounce}</div>
            </div>
            <div>
                <div className='title'>Message Body: </div>
                {/* <pre className='pre-body'> StateInit{(boc.stateInit!! as RawStateInit).code?.toString()} {(boc.stateInit!! as RawStateInit).data?.toString()}</pre> */}
                <div>Cell</div>
                <pre className='pre-body'>{boc.body?.toString()}</pre>
                <div>Base64</div>
                <pre className='pre-body'>{boc.bodyCell?.toBoc().toString("hex")}</pre>
            </div>
            <div>{stateInit}</div>
            <br/>
            <div className='btn btn-cancel' onClick={onClear}>Clear</div>
            <div className='btn btn-deploy' onClick={runBoc}>Estimate BOC</div>

            <BocResult messageList={results} />
        </div>
        )
    };
    