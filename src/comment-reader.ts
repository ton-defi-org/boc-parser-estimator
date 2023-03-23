import { Cell, Slice } from "ton";

export function extractComment(body: Cell | undefined) {
    if (!body) {
        return null
    }
    let s = body.beginParse();

    if (s.remaining < 32) {
        return null
    }
    const op = s.readUint(32);
    if (op.toNumber() !== 0) {
        return null
    }

    return loadStringTail(s)
}


function readBuffer(slice: Slice) {
    // Check consistency
    if (slice.remaining % 8 !== 0) {
        throw new Error(`Invalid string length: ${slice.remaining}`);
    }
    if (slice.remainingRefs !== 0 && slice.remainingRefs !== 1) {
        throw new Error(`invalid number of refs: ${slice.remainingRefs}`);
    }
    if (slice.remainingRefs === 1 && (1023 - slice.remaining) > 7) {
        throw new Error(`invalid string length: ${slice.remaining / 8}`);
    }
    
    // Read string
    let res: Buffer
    if (slice.remaining === 0) {
        res = Buffer.alloc(0);
    } else {
        res = slice.readBuffer(slice.remaining / 8);
    }
    
    // Read tail
    if (slice.remainingRefs === 1) {
        res = Buffer.concat([res, readBuffer(slice.readRef())]);
    }
    
    return res;
}


export function readString(slice: Slice ) {
    return readBuffer(slice).toString();
}


function loadStringTail(s: Slice) {
    return readString(s);
}

/**
* Load maybe string tail
* @returns string or null
*/
function loadMaybeStringTail(s: Slice) {
    if (s.readBit()) {
        return readString(s);
    } else {
        return null;
    }
}

/**
* Load string tail from ref
* @returns string
*/
function loadStringRefTail(s: Slice) {
    return readString(s.readRef());
}

/**
* Load maybe string tail from ref
* @returns string or null
*/
function loadMaybeStringRefTail(s: Slice) {
    const ref = s.readRef();
    if (ref) {
        return readString(ref);
    } else {
        return null;
    }
}

