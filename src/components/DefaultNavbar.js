import { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@material-tailwind/react/Navbar';
import NavbarContainer from '@material-tailwind/react/NavbarContainer';
import NavbarWrapper from '@material-tailwind/react/NavbarWrapper';

import logo from 'assets/img/vitere50.png';

export default function DefaultNavbar() {
    const [openNavbar, setOpenNavbar] = useState(false);

    return (
        <Navbar color="blue" navbar>
            <NavbarContainer>
                <NavbarWrapper>
                    <a>
                        <img src={logo}></img>
                         
                    </a>
                     
                </NavbarWrapper>

               
            </NavbarContainer>
        </Navbar>
    );
}
