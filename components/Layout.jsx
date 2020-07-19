import React from 'react';
import { Container } from 'semantic-ui-react';
import Head from "next/head";
import Navbar from './Navbar';

class Layout extends React.Component{
    componentDidMount() {
        // Enable ethereum on the webapge
        window.ethereum.enable();
    }
    
    render() {
        return(
            <Container style={{ marginTop: '10px' }}>
                <Head>
                    {/* Application header */}
                    <link rel="stylesheet" href="//cdn.jsdelivr.net/npm/semantic-ui@2.4.2/dist/semantic.min.css" />
                </Head>
                <Navbar />
                {this.props.children}
                {/* <h1>Im a footer</h1> */}
            </Container>
        )
    }
}

export default Layout;