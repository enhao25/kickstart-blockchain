// Used to deploy the contract to the network (node deploy.js)
const HDWalletProvider = require('truffle-hdwallet-provider');
const Web3 = require('web3');
const compiledFactory = require('./build/CampaignFactory.json');

const provider = new HDWalletProvider(
    'smile gorilla movie lazy pig below attitude jealous multiply picture involve moment',
    'https://rinkeby.infura.io/v3/39c513ed58d6483ca3323b789152bbfa'
);

const web3 = new Web3(provider);

const deploy = async () => {
    // The mnenonic generates all the accounts.
    const accounts = await web3.eth.getAccounts();
    console.log("Attempting to deploy from account", accounts[0]);
    
    const result = await new web3.eth.Contract(JSON.parse(compiledFactory.interface))
        .deploy({ data: '0x' + compiledFactory.bytecode }) // add bytecode
        .send({ from: accounts[0] }); // remove gas
    
    console.log('Contract deployed to: ', result.options.address);
}

deploy();

//0xFd162aFDe20b7a65904d638ab8E37d3c542F3649
