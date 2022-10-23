

export async function estimateBoc(message: any) {
    let res = await fetch(`http://localhost:8080/sendBoc`, { 
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: `{ "boc": "${message}" }`,
    });
    let data = await res.text();
    return data;
}