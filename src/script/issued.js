const ethers = require('ethers');
const config = require('../config.json');

const erc_json = require('../build/Membership.json');

//const provider = ethers.getDefaultProvider(config['network']);
const provider = new ethers.providers.JsonRpcProvider("http://localhost:7545");

const wallet = new ethers.Wallet(config['private_key'] , provider);

const address = config["Membership"];
const abi = erc_json.abi;

erc1155 = new ethers.Contract(address ,abi ,wallet );

(async()=>{
    let tx = await erc1155.functions.publish("First round", "10");
    await tx.wait();
    console.log(tx);
})();
