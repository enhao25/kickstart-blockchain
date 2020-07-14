import React from 'react';
import factory from "../ethereum/factory"

class CampaignIndex extends React.Component {
    // Need to be static so that next server can get this method without running the class / function
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    render() {
        return (
            <div>
                {this.props.campaigns[0]}
            </div>
        )
    }
}

export default CampaignIndex;