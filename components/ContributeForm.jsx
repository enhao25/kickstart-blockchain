import React from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from "../ethereum/campaign";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class ContributeForm extends React.Component {
    state = {
        value: '',
        errorMsg: '',
        loading: false
    };

    inputChange = event => {
        this.setState({ value: event.target.value })
    }

    onSubmit = async event => {
        event.preventDefault();

        this.setState({ loading: true, errorMsg: '' })

        // The campaign function that we created in the ethereum folder takes a address and returns the web3 contract
        const campaign = Campaign(this.props.address);

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.contribute().send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, 'ether')
            });
            // Refersh current page
            Router.replaceRoute(`/campaigns/${this.props.address}`)
        } catch (err) {
            this.setState({ errorMsg: err.message });
        }
        // Reset the state
        this.setState({ loading: false, value: '' })
    }
    
    render() {
        return (
            <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                <Form.Field>
                    <label>Amount to Contribute</label>
                    <Input value={this.state.value} onChange={this.inputChange} label="ether" labelPosition="right" />
                </Form.Field>
                <Message error header="Oops!" content={this.state.errorMsg} />
                <Button primary loading={this.state.loading}>Contribute!</Button>
            </Form>
        )
    }
}

export default ContributeForm;