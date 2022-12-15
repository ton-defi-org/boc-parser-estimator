

const BOC_BACKEND = process.env.REACT_APP_BOC_BACKEND || 'https://tvm-bus-server.herokuapp.com';

export async function estimateBoc(message: any) {
    let res = await fetch(`${BOC_BACKEND}/sendBoc`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{ "boc": "${message}" }`,
    });
    let data = await res.text();
    return data;
}