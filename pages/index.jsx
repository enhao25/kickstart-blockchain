import React from 'react';
import { Card, Button } from 'semantic-ui-react'
import { Link } from "../routes";

import factory from "../ethereum/factory"
import Layout from "../components/Layout"

class CampaignIndex extends React.Component {
    // Need to be static so that next server can get this method without running the class / function
    static async getInitialProps() {
        const campaigns = await factory.methods.getDeployedCampaigns().call();
        return { campaigns }
    }

    renderCampaigns() {
        const items = this.props.campaigns.map(address => {
            return {
                header: address,
                description: <Link route={`/campaigns/${address}`}><a>View Campaign</a></Link>,
                fluid: true
            }
        })

        return <Card.Group items={items} />
    }

    render() {
        return (
            <Layout>
                <div>
                    <h3>Open Campaigns</h3>
                    {/* Primary changes the button to blue */}
                    <Link route="/campaigns/new"><a>
                        <Button content='Create Campaign' floated="right" icon='add' primary />
                    </a></Link>
                    {this.renderCampaigns()}
                </div>
            </Layout>
        )
    }
}

export default CampaignIndex;