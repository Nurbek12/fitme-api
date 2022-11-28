// import TMClient from 'textmagic-rest-client'
// import { smskey, smsusername } from './keys.js'
// import twillo from 'twilio'
// import { twaccsid, twacctoken, twnumber } from './keys.js'
// import fetch, { Headers } from 'node-fetch'
// import { api_key_free } from './keys.js'

// const client = twillo(twaccsid, twacctoken)

export default async (phone, code) => {
    //     var myHeaders = new Headers();
    // myHeaders.append("apikey", "1WVlOD2mXJeu4nZZouyI7JQxTMPsAlTS");

    // var requestOptions = {
    // method: 'GET',
    // redirect: 'follow',
    // headers: myHeaders
    // };

    // await fetch("https://api.apilayer.com/number_verification/countries", requestOptions)
    // .then(response => response.text())
    // .then(result => console.log(result))
    // .catch(error => console.log('error', error));
    // try{
        console.log(phone, code);
    //     client.verify.v2.services('VAXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX')
    //             .verifications
    //             .create({to: phone, channel: 'sms'})
    //             .then(verification => console.log(verification.status));
    // }catch(err){
    //     console.log(err);
    // }
}