import React from 'react';
import { Form, Input, Message, Button } from 'semantic-ui-react';
import Campaign from '../../../ethereum/campaign';
import web3 from '../../../ethereum/web3';
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout"

class RequestNew extends React.Component {
    state = {
        value:'',
        description: '',
        recipient: '',
        errorMsg: '',
        loading: false
    }
    
    static async getInitialProps(props) {
        const { address } = props.query;

        return { address }
    }

    onSubmit = async event => {
        event.preventDefault();

        const campaign = Campaign(this.props.address);
        const { description, value, recipient } = this.state;

        this.setState({ loading: true, errorMsg: "" })

        try {
            const accounts = await web3.eth.getAccounts();
            await campaign.methods.createRequest(description, web3.utils.toWei(value, 'ether'), recipient)
                .send({ from: accounts[0] })
            
            Router.pushRoutes(`/campaigns/${this.props.address}/requests`)
        } catch (err) {
            this.setState({ errorMsg: err.message })
        }
        // Finished loading
        this.setState({ loading: false })
    }

    handleChange = event => {
        const { name, value } = event.target;
        this.setState({ [name]: value })
    }
    
    render() {
        return (
            <Layout>
                <Link route={`/campaigns/${this.props.address}/requests`}>
                    <a>Back</a>                    
                </Link>
                <h3>Create a Request</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMsg}>
                    <Form.Field>
                        <label>Description</label>
                        <Input name="description" 
                            value={this.state.description}
                            onChange={this.handleChange}      
                        />
                    </Form.Field>
                    <Form.Field>
                        <label>Value in Ether</label>
                        <Input name="value" 
                            value={this.state.value}
                            onChange={this.handleChange}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Recipient</label>
                        <Input name="recipient" 
                            value={this.state.recipient}
                            onChange={this.handleChange}/>
                    </Form.Field>
                    <Message error header="Oops!" content={this.state.errorMsg} />
                    <Button primary loading={this.state.loading}>Create!</Button>
                </Form>
            </Layout>
        )
    }
}

export default RequestNew;