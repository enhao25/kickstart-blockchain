import Web3 from 'web3';

let web3;

if (typeof window !== 'undefined' && typeof window.web3 !== 'undefined') {
    // Code is in the browser and running metamask
    web3 = new Web3(window.web3.currentProvider);
} else {
    // Code is in the next server OR the user is not running metamask
    // Create a new provider using infura
    const provider = new Web3.providers.HttpProvider(
        'https://rinkeby.infura.io/v3/39c513ed58d6483ca3323b789152bbfa'
    );
    // Use the provider to create a new instance of web3
    web3 = new Web3(provider)
}

export default web3;