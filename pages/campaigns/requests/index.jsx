import React from 'react';
import { Button } from 'semantic-ui-react';
import { Link } from "../../../routes";
import Layout from '../../../components/Layout'

class RequestIndex extends React.Component {
    // Need to be static so that next server can get this method without running the class / function
    static async getInitialProps(props) {
        // props.query.address is available as this page is loaded as a wildcard
        const { address } = props.query;
        
        return { address}
    }

    render() {
        return (
            <Layout>
                <h3>Requests</h3>
                <Link route={`/campaigns/${this.props.address}/requests/new`}>
                    <a>
                        <Button primary>Add Request</Button>
                    </a>
                </Link>
            </Layout>
        )
    }
}

export default RequestIndex;