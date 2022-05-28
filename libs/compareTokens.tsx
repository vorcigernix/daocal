export default function compareTokens(dao: any){
    const token = '0x7b39917f9562c8bc83c7a6c2950ff571375d505d'; //LeaugeDAO
    //console.log(dao.tokens);
    return dao.tokens.includes(token) || dao.tokens.length === 0;
}