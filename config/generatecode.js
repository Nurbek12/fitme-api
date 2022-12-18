import url from 'url'

export default () => {
    let code = '';
    for(let i=0;i<4;i++){
        code += Math.floor(Math.random()*10).toString();
    }
    return code;
}

export const fileurl = (req, file) => `${url.format({ protocol: req.protocol, host: req.get('host') })}/${file}`