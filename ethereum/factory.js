import web3 from './web3';
import CampaignFactory from './build/CampaignFactory.json';

const instance = new web3.eth.Contract(
    JSON.parse(CampaignFactory.interface),
    '0xFd162aFDe20b7a65904d638ab8E37d3c542F3649'
);

export default instance;