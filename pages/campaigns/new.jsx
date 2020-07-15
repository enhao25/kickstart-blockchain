import React from 'react';
import Layout from '../../components/Layout';
import { Button, Form, Input, Message } from 'semantic-ui-react';
import { Router } from "../../routes"

import web3 from '../../ethereum/web3';
import factory from "../../ethereum/factory";

class CampaignNew extends React.Component {
    state = {
        mininumContribution: '',
        errorMsg: '',
        loading: false
    };

    inputChange = event => {
        this.setState({ mininumContribution: event.target.value })
    }

    onSumbit = async event => {
        event.preventDefault();
        
        this.setState({ loading: true, errorMsg: "" })

        const accounts = await web3.eth.getAccounts();
        try {
            await factory.methods
                .createCampaign(this.state.mininumContribution)
                .send({
                    from: accounts[0]
                })
            Router.pushRoute("/");
        } catch (err) {
            this.setState({ errorMsg: err.message })
        }

        this.setState({ loading: false })
        
    }

    render() {
        return (
            <Layout>
                <h3>Create a Campaign</h3>
                <Form onSubmit={this.onSumbit} error={!!this.state.errorMsg}>
                    <Form.Field>
                        <label>Minimum Contribution</label>
                        <Input 
                            label='wei' 
                            labelPosition='right'
                            value={this.state.mininumContribution}
                            onChange={this.inputChange}
                        />
                        <Message error header="Oops!" content={this.state.errorMsg} />
                        <Button loading={this.state.loading} primary>Create!</Button>
                    </Form.Field>
                </Form>
            </Layout>
        )
    }
} 

export default CampaignNew;