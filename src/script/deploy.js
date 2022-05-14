require('dotenv').config();
const Web3 = require('web3');
const fs = require('fs');
const solc = require('solc');
const ethers = require('ethers');
const Web3Modal = require('web3modal');
const BigNumber = require('bignumber');

const url = process.env["URL"];
//const infuraUrl = "";
const privateKey = process.env["CREATOR_ADDRESS"];


async function deploy(){
    
    const provider = new ethers.providers.WebSocketProvider(url);        
    var wallet = new ethers.Wallet(privateKey);
    wallet.connect(provider)
    let address = wallet.address;

    // let source = fs.readFileSync("./contracts/Membership.sol").toString();
    // var input = {
    //     language: 'Solidity',
    //     sources: {
    //         "Membership": {
    //             content: source
    //         }
    //     },
    //     settings: {
    //         outputSelection: {
    //             '*': {
    //                 '*': ['*']
    //             }
    //         }
    //     }
    // };
    // console.log("Before Compile");
    // let compiledContract = solc.compile(JSON.stringify(input));
    // console.log(compiledContract);
    // console.log("After Compile");


    const source = fs.readFileSync('./contracts/Membership.sol', 'utf8');

    var solcInput = {
        language: "Solidity",
        sources: { 
            "Membership.sol": {
                "content": source
            },
            "ERC1155.sol": {
                "content": "import \" ./ERC1155.sol" 
            }
         },
        settings: {
            optimizer: {
                enabled: true
            },
            evmVersion: "byzantium",
            outputSelection: {
                "*": {
                  "": [
                    "legacyAST",
                    "ast"
                  ],
                  "*": [
                    "abi",
                    "evm.bytecode.object",
                    "evm.bytecode.sourceMap",
                    "evm.deployedBytecode.object",
                    "evm.deployedBytecode.sourceMap",
                    "evm.gasEstimates"
                  ]
                },
            }
        }
    };
    
    solcInput = JSON.stringify(solcInput);
    var contractObject = solc.compile(solcInput);
    contractObject = JSON.parse(contractObject);
    
    console.log(contractObject);





























    //const membershipContract = new ethers.ContractFactory(abi, bytecode, wallet.address)
    
    // let abi;
    // let bytecode;
    // for (let contractName in compiledContract.contracts) {
    //     console.log(contractName);
    //     // code and ABI that are needed by web3 
    //     // console.log(contractName + ': ' + compiledContract.contracts[contractName].bytecode);
    //     // console.log(contractName + '; ' + JSON.parse(compiledContract.contracts[contractName].interface));
    //     bytecode = compiledContract.contracts[contractName].bytecode;
    //     abi = JSON.parse(compiledContract.contracts[contractName].interface);
    // }
    
    // console.log("abi: ", abi);
    // console.log("bytecode: ", bytecode);

    // async function deploy() {
    //     const contract = await membershipContract.deploy();
    //     console.log(contract.address);
    //     console.log(contract.deployTransaction);
    // }

    // Get Balance Connection Confirmed
    let balance = await provider.getBalance(wallet.address);    
    let value = balance.toString();
    console.log(value);

    // Deployment
    
}

deploy()
