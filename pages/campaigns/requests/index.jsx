import React from 'react';
import { Button, Table } from 'semantic-ui-react';
import { Link } from "../../../routes";
import Layout from '../../../components/Layout'
import Campaign from '../../../ethereum/campaign';
import RequestRow from "../../../components/RequestRow";

class RequestIndex extends React.Component {
    // Need to be static so that next server can get this method without running the class / function
    static async getInitialProps(props) {
        // props.query.address is available as this page is loaded as a wildcard
        const { address } = props.query;
        const campaign = Campaign(address);
        const requestCount = await campaign.methods.getRequestsCount().call();
        const summary = await campaign.methods.getSummary().call();
        const approversCount = summary[3]
        
        const requests = await Promise.all(
            Array(parseInt(requestCount))
                .fill() //.fill() returns an empty array with length of requestCount 
                .map((element, index) => {
                    // Loop through and see the request from 0 to the requestcount length
                    return campaign.methods.requests(index).call()
                })
        )
        return { address, requests, requestCount, approversCount }
    }

    renderRows() {
        return this.props.requests.map((request, index) => {
            return <RequestRow 
                key={index} 
                id={index} 
                request={request} 
                address={this.props.address} 
                approversCount={this.props.approversCount} 
            />
        })
    }

    render() {
        const { Header, Row, HeaderCell, Body } = Table;
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary floated="right" style={{marginBottom: "10px"}}>Add Request</Button>
                    </a>
                </Link>
                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount</HeaderCell>
                            <HeaderCell>Recipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRows()}
                    </Body>
                </Table>
                <div>Found {this.props.requestCount} requests.</div>
            </Layout>
        )
    }
}

export default RequestIndex;