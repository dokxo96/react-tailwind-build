/* eslint-disable react-hooks/exhaustive-deps */
import DefaultNavbar from '../components/DefaultNavbar';
import DefaultFooter from '../components/DefaultFooter';
import Header from '../components/landing/Header';
import WorkingSection from '../components/landing/WorkingSection';
import TeamSection from '../components/landing/TeamSection';
import ContactSection from '../components/landing/ContactSection';
import ClosingAlert from "@material-tailwind/react/ClosingAlert";

import React, { useEffect,useContext } from 'react';
 import {init } from '../utils/interaction_blockchain'
export default function Landing() {

  
    const [initialBc, setInitialBc] = React.useState({
        showImg: true,
        openTab: 1,
        show: false,
        Validado: "",
      });
      
    useEffect(async ()  => {
        await init();
        localStorage.setItem("network", 97)
        //incializamos la app, si no tiene metamask lo mandamos a la pagina de descarga
        if (!init()) {
          setInitialBc({
            show: true,
            success: false,
            message:
              "No cuentas con metamask,te estamos redireccionando al sitio oficial para que procedas con la descarga",
          });
          setTimeout(() => {
          //  window.location.replace("https://metamask.io/download");
          }, 5000);
        }
      }, []);
    return (
        <>
            <div className="absolute  bg-black w-full z-20 ">
                <DefaultNavbar />
            </div>
            <main>
           
                <Header />
                <WorkingSection />
                <TeamSection />
              
            </main>
            <DefaultFooter />
        </>
    );
}
