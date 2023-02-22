import { parseMessage, parseStateInit, Cell, Slice, Address, RawCommonMessageInfo, RawCurrencyCollection, TonClient } from "ton";
import BN from "bn.js";
import base64url from "base64url"

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
    endpoint: "https://mainnet.tonhubapi.com/jsonRPC",
});

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

export function u8ToBase64Str(u8: any) {
    let url = base64url.fromBase64(btoa(String.fromCharCode.apply(null, u8)));
    
    return url 
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
