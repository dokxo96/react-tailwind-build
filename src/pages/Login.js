import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import CardFooter from '@material-tailwind/react/CardFooter';
import H5 from '@material-tailwind/react/Heading5';
import InputIcon from '@material-tailwind/react/InputIcon';
 
import Button from '@material-tailwind/react/Button';
import DefaultNavbar from 'components/DefaultNavbar';
import Footer from 'components/Footer';
import Page from 'components/login/Page';
import Container from 'components/login/Container';
import AuthService from 'services/AuthService'
import {useState,useRef,useContext} from 'react';
import {baseURL} from 'services/API'

import axios from "axios";
import Alert from "@material-tailwind/react/Alert";
export default function Login() {
    const buttonRef = useRef();
   
   var  data = window.localStorage;
    
    const [usern, setUser] = useState("");
    const [passw, setPassword] = useState("");
    const [popup, setpopup] = useState(false);

    const unhicepopup = (e) => {
        return setpopup(e);
      };
   const handleuserChange = (event) => {
        setUser( event.target.value );
        console.log(usern)
      }
      const handlpassChange = (event) => {
        setPassword( event.target.value );
        console.log(passw)

      }
    const  onSubmit = async e => {
        e.preventDefault();
        var user={
            username:usern,
            password:passw
        };
        
        axios.post(baseURL+'usuarios/login', {
            username:user.username,
            password:user.password
          })
          .then((response) => {
            if(response.status===200){
                unhicepopup(false);
                
                
                window.localStorage.setItem("id",response.data.id);
                window.localStorage.setItem("name",response.data.first_name +" "+response.data.last_name);
                window.localStorage.setItem("user",response.data.username );
                window.localStorage.setItem("role",response.data.roles );
                window.localStorage.setItem("cdi",response.data.cdis_id );
                window.location.href="/dashboard"
            }
          }, (error) => {
             
            unhicepopup(true);
          
          });
    
      }
    const handleSubmit = async event => {
        event.preventDefault();
        var user={
            username:usern,
            password:passw
        };
        
        try {
            axios.post(baseURL+'usuarios/login', {
                username:user.username,
                password:user.password
              })
              .then((response) => {
                  console.log(response)
                data.setItem("id",response.data.id);
                data.setItem("active",response.data.active);
                data.setItem("rol",response.data.roles);
                data.setItem("cdi",response.data.cdis_id);

                data.setItem("name",response.data.first_name+" "+response.data.last_name);
                if(response.status===200){
                    
                    unhicepopup(false);
                // window.location.href="/dashboard"
                }
              }, (error) => {
                 
                unhicepopup(true);
              
              });
          } catch (error) {
            //console.error( error);
             
          }
       
      
          
            
       

    }

    return (
        <Page>
            <DefaultNavbar />
            <Container>
                <Card >
                    <CardHeader color="lightBlue" ref={buttonRef}>
                        <H5 color="white " ref={buttonRef}  >
                            Iniciar sesion
                        </H5>
                    </CardHeader>
                    <form onSubmit={onSubmit}>
                        <CardBody>
                            <div className="mb-8 px-4 bg-bb">
                                <InputIcon
                                     
                                    color="lightBlue"
                                    placeholder="Correo"
                                    iconName="email"
                                    onChange={handleuserChange}
                                />
                            </div>
                            <div className=" px-4">
                                <InputIcon
                                    type="password"
                                    color="lightBlue"
                                    placeholder="Contraseña"
                                    iconName="lock"
                                    onChange={handlpassChange}                                />
                            </div>
                        
                        </CardBody>
                        <CardFooter>
                        <div className="flex justify-center  ">
                            <Button
                                color="lightBlue"
                                buttonType="link"
                                size="lg"
                                ripple="dark"
                                type="submit"
                                
                               
                            >
                                Entrar
                            </Button>
                                 
                        </div>
                    </CardFooter>
                    {popup && (
                    <Alert color="deepOrange">Usuario o Contraseña no validos</Alert>
                    )}
                    </form>
                </Card>
            </Container>
            <Footer />
        </Page>
        
    );
}
