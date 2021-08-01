import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import NavbarCollapse from '@material-tailwind/react/NavbarCollapse';
import Nav from '@material-tailwind/react/Nav';
import NavLink from '@material-tailwind/react/NavLink';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import Icon from '@material-tailwind/react/Icon';
import Button from '@material-tailwind/react/Button';
import { useEffect} from 'react';
import {isUnlocked }from '../utils/blockchain_methods'
import logo from '../assets/img/nfthub25.png'
export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [loginbuttontext, setloginbuttontext] = useState("Login");

    useEffect(() => {
        (async () => {
        
            try {
                window.ethereum._metamask.isUnlocked().then(function(value) {
                  if (value) {
                    console.log("Abierto");
                    setloginbuttontext("Mi dash") ;
                  } else {
                    console.log("Cerrado");
                    setloginbuttontext("Login") ;
                  }
                });
              } catch (error) {
                console.log("e" + error);
              }
      /*    await isUnlocked();
     if(!localStorage.getItem("isunlocked")){
         console.log(localStorage.getItem("isunlocked"))
         setloginbuttontext("Login") ;
     }else  setloginbuttontext("Mi dash") ; */
        
        })();
      }, []);
    
  const    submit = (e) => {
e.preventDefault();
    try {
        window.ethereum._metamask.isUnlocked().then(function(value) {
          if (loginbuttontext==="Login") {
            console.log("al login");
            window.location.href="/login"
             
          } else window.location.href="/dashboard"
        });
      } catch (error) {
        console.log("e" + error);
      }

      }
    return (
        <Navbar color="black" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a
                        href="https://material-tailwind.com?ref=mtk"
                        target="_blank"
                        rel="noreferrer"
                    >
                        <NavbarBrand><img src={logo}></img></NavbarBrand>
                    </a>
                    <NavbarToggler
                        onClick={() => setOpenNavbar(!openNavbar)}
                        color="white"
                    />
                </NavbarWrapper>

                <NavbarCollapse open={openNavbar}>
                    <Nav>
                        <div className="flex flex-col z-50 lg:flex-row lg:items-center">
                              <div className="text-white">
                                <Dropdown
                                    color="transparent"
                                    size="sm"
                                    buttonType="link"
                                    buttonText={
                                        <div className="py-2.5 font-medium flex items-center">
                                            <Icon
                                                name="view_carousel"
                                                size="2xl"
                                                color="white"
                                            />
                                            <span className="ml-2">
                                                Templates
                                            </span>
                                        </div>
                                    }
                                    ripple="light"
                                >
                                    <Link to="/">
                                        <DropdownItem color="lightBlue">
                                            Landing
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/profile">
                                        <DropdownItem color="lightBlue">
                                            Profile
                                        </DropdownItem>
                                    </Link>
                                    <Link to="/dashboard">
                                        <DropdownItem color="lightBlue">
                                            dashboard
                                        </DropdownItem>
                                    </Link>
                                     
                                    <Link to="/register">
                                        <DropdownItem color="lightBlue">
                                            Register
                                        </DropdownItem>
                                    </Link>
                                </Dropdown>
                            </div>
                           
                            <a>
                                <Button
                                    color="transparent"
                                    className="bg-yellow-600 text-black ml-4"
                                    ripple="dark"
                                    onClick={submit}
                                >
                                           {loginbuttontext} 
                                </Button>
                            </a>
                        </div>
                    </Nav>
                </NavbarCollapse>
            </NavbarContainer>
        </Navbar>
    );
}
