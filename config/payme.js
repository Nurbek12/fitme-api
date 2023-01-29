import fetch from "node-fetch";

async function pay(m, id, a, callback){
    const b64 = Buffer.from(`m=${m};ac.order_id=${id};a=${a*100}`).toString('base64')
    const data = await fetch(`https://checkout.paycom.uz/${b64}`, { method: 'GET' })
    const result = await data.json();
    return callback(result)
}
