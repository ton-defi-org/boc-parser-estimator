import { parseMessage, parseStateInit, Cell, Slice, Address, RawCommonMessageInfo, RawCurrencyCollection, TonClient } from "ton";
import BN from "bn.js";

type RawCommonMessageInfoInternal = {
    type: "internal";
    ihrDisabled: boolean;
    bounce: boolean;
    bounced: boolean;
    src: Address | null;
    dest: Address | null;
    value: RawCurrencyCollection;
    ihrFee: BN;
    fwdFee: BN;
    createdLt: BN;
    createdAt: number;
};

const client = new TonClient({
    endpoint: "https://ton.access.orbs.network/44A1c0ff5Bd3F8B62C092Ab4D238bEE463E644A1/1/mainnet/toncenter-api-v2/jsonRPC",
});
// curl --location 'https://toncenter.com/api/v2/jsonRPC' \
//   --header 'Accept: application/json' \
//   --header 'Content-Type: application/json' \
//   --data '{
//     "jsonrpc": "2.0",
//     "id": 1,
//     "method": "runGetMethod",
//     "params": {
//       "address": "0:bf200ee64eb42d909d55cd6501a3b6d646ec1b00a392a3c83952966fe8a6da12",
//       "method": "seqno",
//       "stack": []
//     }
//   }
export async function getSeqno2(walletAddr: string): Promise<number> {
    const response = await fetch('https://toncenter.com/api/v2/jsonRPC', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        jsonrpc: '2.0',
        id: 1,
        method: 'runGetMethod',
        params: {
          address: walletAddr,
          method: 'seqno',
          stack: []
        }
      })
    });
  
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    const res = await response.json();
  
    // the stack comes back as [ [ "num", "0x1a" ], … ]
    const [, rawValue] = res.result.stack[0];
    // if it's hex, you can parse it explicitly:
    return rawValue.startsWith('0x')
      ? parseInt(rawValue, 16)
      : Number(rawValue);
  }

export function parseQuery(queryString: string) {
    var query = {};
    var pairs = (queryString[0] === "?" ? queryString.substr(1) : queryString).split("&");
    for (var i = 0; i < pairs.length; i++) {
        var pair = pairs[i].split("=");

        //@ts-ignore
        query[decodeURIComponent(pair[0])] = decodeURIComponent(pair[1] || "");
    }
    return query;
}

async function getSeqno(walletAddr: string) {
 
    var options = {
      'method' : 'post',
      'payload' : `{"address": "${walletAddr}", "method": "seqno", "stack": []}`,
      contentType: 'application/json'
    };
    
    var response = await fetch('https://toncenter.com/api/v2/runGetMethod', options);  
    var res = await response.json();
    return Number(res.result.stack[0][1]);
  }

export function u8ToBase64Str(u8: any) {
    return  btoa(String.fromCharCode.apply(null, u8));
}

export function base64ToArrayBuffer(base64: string) {
    var binary_string = atob(base64);
    var len = binary_string.length;
    var bytes = new Uint8Array(len);
    for (var i = 0; i < len; i++) {
        bytes[i] = binary_string.charCodeAt(i);
    }
    return bytes.buffer;
}

export async function parseBoc(base64Boc: string) {
    let c = Cell.fromBoc(Buffer.from(base64Boc, "base64"));

    let externalMessage = parseMessage(c[0].beginParse());

    let message = externalMessage.body.refs[0];
    if (!message) {
        return {
            from: externalMessage.info.dest,
            to: externalMessage.info.dest,
            externalStateInit: externalMessage.init,
            seqno: 0,
            msgSeqno: 0,
            validUntil: Date.now(),
        };
    }
    let slice = message.beginParse();
    let innerMessage = parseMessage(slice);
    const innerInfo = innerMessage.info as RawCommonMessageInfoInternal;

    
    const externalMessageBody = externalMessage.body.beginParse();
    externalMessageBody.skip(512); // skip signature
    const subWalletId = externalMessageBody.readUint(32);
    const validUntil = externalMessageBody.readUint(32);
    const msgSeqno = externalMessageBody.readUint(32);

    let seqno = -1;
    try {
        seqno = await getSeqno2((externalMessage.info.dest as Address).toString());
        let seqnoRes = (await client.callGetMethod(externalMessage.info.dest as Address, "seqno"))
        seqno = new BN(seqnoRes.stack[0][1].replace('0x', ''), 16).toNumber()
    } catch (e) {
        
    }

    return {
        bounce: innerInfo.bounce,
        from: externalMessage.info.dest,
        to: innerMessage.info.dest,
        init: innerMessage.init,
        body: innerMessage.body,
        value: innerInfo.value.coins,
        seqno: seqno,
        msgSeqno: msgSeqno.toNumber(),
        validUntil: validUntil.toNumber(),
        subWalletId: subWalletId.toNumber()
    };
}

export function readInternalMessage2(slice: Slice) {
    let _tag = slice.readUint(1); //tag
    const ihrDisabled = slice.readBit();
    const bounce = slice.readBit();
    const bounced = slice.readBit();
    const src = slice.readAddress();
    const destination = slice.readAddress();
    const value = slice.readCoins();
    const ihrFee = slice.readCoins();
    const fwdFee = slice.readCoins();
    const createdLt = slice.readUint(64);
    const createdAt = slice.readUintNumber(32);
    return {
        type: "internal",
        ihrDisabled,
        bounce,
        bounced,
        src,
        dest: destination,
        destination,
        value,
        ihrFee,
        fwdFee,
        createdLt,
        createdAt,
    };
}

export function addressFromJson(arg: { workchain: number; hash: any }) {
    const buffer = Buffer.from(arg.hash);
    return new Address(arg.workchain, buffer);
}

export function bnToStr(arg: { workchain: number; hash: any }) {}

export function strEllipsis(str: string, len: number) {
    if (str.length < len) {
        return str;
    }
    return `${str.substring(0, len)}...`;
}

export function addressEllipsis(address: string) {
    return address.substring(0, 6) + "..." + address.substring(42, 48);
}
