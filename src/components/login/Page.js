import { useState } from 'react';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';
import NavbarBrand from '@material-tailwind/react/NavbarBrand';
import NavbarToggler from '@material-tailwind/react/NavbarToggler';
import logo from '../../assets/img/nfthub25.png'
export default function Page({ children }) {
    const [openNavbar, setOpenNavbar] = useState(false);
    const [loginbuttontext, setloginbuttontext] = useState("Login");
    return (
        <>
        <div className="bg-black z-50">
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
                     
                </NavbarWrapper>

               </NavbarContainer>
        </Navbar>
  
        </div>
  
        <div className="bg-black   bg-center -mt-8 w-screen h-screen relative flex flex-col justify-between">
            {children}
        </div>

        <div className="static bg-yellow-600 flex-wrap items-center md:justify-between bg-primary justify-center">
                        <div className="w-full md:w-4/12 px-4 mx-auto text-center">
                            <div className="text-sm text-white font-medium py-1">
                                Copyright © {new Date().getFullYear()} NTFx by{' '}
                                <a
                                    href=""
                                    className="textwhite hover:text-gray-900 transition-all"
                                >
                                   CLoudMex
                                </a>
                                .
                            </div>
                        </div>
                    </div>
    </>
    );
}
