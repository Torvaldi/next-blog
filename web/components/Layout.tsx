import { FunctionComponent } from 'react';
import Head from 'next/head';
import Navbar from './Navbar';
import Footer from './Footer';
import CookieBanner from 'components/CookieBanner';


const Layout: FunctionComponent = (props) => {
    return(
        <div>
            <Head>
                <title>web app</title>
                <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap" />
            </Head>
            <Navbar />
            <div>
                {props.children}
            </div>
            <Footer />
            <CookieBanner />
        </div>
    )
}

export default Layout;