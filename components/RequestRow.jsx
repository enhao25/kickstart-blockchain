import React, { Component } from 'react';
import { Table, Button } from 'semantic-ui-react';
import web3 from "../ethereum/web3";
import Campaign from "../ethereum/campaign";
import { Router } from "../routes";


class RequestRow extends Component {
    state ={
        loadingApprove: false,
        loadingFinalize: false
    }

    onApprove = async () => {
        // Create campaign instance
        const campaign = Campaign(this.props.address);
        // Set Loading
        this.setState({ loadingApprove: true })

        // Get the account and approve the request
        const accounts = await web3.eth.getAccounts();
        try {
            await campaign.methods.approveRequest(this.props.id).send({
                from: accounts[0]
            })
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {

        }
        
        this.setState({ loadingApprove: false })
    };

    onFinalize = async () => {
        // Create campaign instance
        const campaign = Campaign(this.props.address);
        // Set Loading
        this.setState({ loadingFinalize: true })
        
        const accounts = await web3.eth.getAccounts();
        try{
            await campaign.methods.finalizeRequest(this.props.id).send({
                from: accounts[0]
            })
            Router.pushRoute(`/campaigns/${this.props.address}/requests`);
        } catch(err) {

        }
        
        this.setState({ loadingFinalize: false })
    }
    
    render() {
        const { Row, Cell } = Table;
        const { id, request, approversCount } = this.props;
        const { loadingApprove, loadingFinalize } = this.state;
        const readyToFinalize = request.approvalCount > approversCount / 2;

        return (
            <Row disabled={request.complete} positive={readyToFinalize && !request.complete}>
                <Cell>{id}</Cell>
                <Cell>{request.description}</Cell>
                <Cell>{web3.utils.fromWei(request.value, 'ether')}</Cell>
                <Cell>{request.recipient}</Cell>
                <Cell>{request.approvalCount} / {approversCount} </Cell>
                {request.complete ? null : (
                    <Cell><Button color="green" basic onClick={this.onApprove} loading={loadingApprove}>Approve</Button></Cell>
                )}
                {request.complete ? null : (
                    <Cell><Button color="teal" basic onClick={this.onFinalize} loading={loadingFinalize}>Finalize</Button></Cell>
                )}
            </Row>
        )
    }
}

export default RequestRow;