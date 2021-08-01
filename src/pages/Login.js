import { useState } from 'react';
import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5'; 
import Button from '@material-tailwind/react/Button';
import DefaultNavbar from '../components/DefaultNavbar';
import SimpleFooter from '../components/SimpleFooter';
import Page from '../components/login/Page';
import Container from '../components/login/Container';
import Web3 from "web3";
import logo from "../assets/img/metamask.png";
import {loadweb3} from '../utils/interaction_blockchain'
import {useContext} from 'react'
 export default function Login() {

    const [account, setAccount] = useState("");
     return (
        <Page>
           
            <Container>
                <Card>
                    <CardHeader color="yellow">
                        <H5 color="black" style={{ marginBottom: 0 }}>
                        Iniciar sesion
                       
                        </H5>
                    </CardHeader>

                    <CardBody>
                    <div className="flex justify-center">
                        <img style={{ height: 100 }} src={logo} alt="metamask logo" />
                      </div>
                    </CardBody>
                    <CardFooter>
                        <div className="flex justify-center ">
                            <Button
                                color="yellow"
                                buttonType="link"
                                size="lg"
                                ripple="yellow"
                                onClick={loadweb3}
                            >
                                Get Started
                            </Button>
                        </div>
                    </CardFooter>
                </Card>
            </Container>
         
        </Page>
    );
}
