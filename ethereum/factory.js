import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xe938dEB50cc7ae8eBe3ACdE141e0894579b48306'
);

export default instance;