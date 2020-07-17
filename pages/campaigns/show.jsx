import React from 'react';
import Layout from '../../components/Layout';
import Campaign from '../../ethereum/campaign';

import { Card, Grid } from 'semantic-ui-react';
import web3 from '../../ethereum/web3';
import ContributeForm from '../../components/ContributeForm';

class CampaignShow extends React.Component {
    // Need to be static so that next server can get this method without running the class / function
    static async getInitialProps(props) {
        // props.query.address is available as this page is loaded as a wildcard
        const campaign = Campaign(props.query.address);
        const summary = await campaign.methods.getSummary().call();
        return {
            address: props.query.address,
            minimumContribution: summary[0],
            balance: summary[1],
            requestsCount: summary[2],
            approversCount: summary[3],
            manager: summary[4]
        };
    }

    renderCards() {
       const { balance, manager, minimumContribution, requestsCount, approversCount} = this.props;
       const items = [
            {
               header: manager, 
               meta: 'Address of Manager',
               description: 'The manager created this campaign and can create requests to withdraw money',
               style: { overflowWrap: 'break-word' }
            },
            {
                header: minimumContribution, 
                meta: 'Minimum Contribution (wei)',
                description: 'You must contribute at least tis much wei to become an approver',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: requestsCount, 
                meta: 'Number of Requests',
                description: 'A request tries to withdraw money from the contract. Requests must be approved by apporvers.',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: approversCount, 
                meta: 'Number of Approvers',
                description: 'Number of people who have already donated to this campaign',
                style: { overflowWrap: 'break-word' }
            },
            {
                header: web3.utils.fromWei(balance, 'ether'), 
                meta: 'Campaign Balance (ether)',
                description: 'The balance is how much money this campaign has left to spend.',
                style: { overflowWrap: 'break-word' }
            },
       ];
       return <Card.Group items={items} />
    }

    render() {
        return(
            <Layout>
                <h3>Campaign Show</h3>
                <Grid>
                    <Grid.Column width={12}>
                        {this.renderCards()}
                    </Grid.Column>
                    <Grid.Column width={4}>
                        <ContributeForm address={this.props.address} />
                    </Grid.Column>
                </Grid>
            </Layout>
        )
    }
}

export default CampaignShow;