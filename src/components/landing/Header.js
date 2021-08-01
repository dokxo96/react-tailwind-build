import H2 from '@material-tailwind/react/Heading2';
import LeadText from '@material-tailwind/react/LeadText';
import ClosingAlert from "@material-tailwind/react/ClosingAlert";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
import React from 'react';
export default function Header() {
    const [showModal, setShowModal] = React.useState(true);
    return (
        <> 
           <Modal  size="sm" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => window.location.href= "https://www.google.com.mx/"}>
                Advertencia
                </ModalHeader>
                <ModalBody>
                    <a className="text-base leading-relaxed text-gray-600 font-normal">
                    Está a punto de ingresar a NFTx. Este sitio web contiene contenido para adultos.
                 confirma que tiene al menos 18 años .
                    </a>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => window.location.href= "https://www.google.com.mx/"}
                        ripple="dark"
                    >
                        bye
                    </Button>

                    <Button
                        color="green"
                        onClick={(e) => setShowModal(false)}
                        ripple="light"
                    >
                        Aceptar
                    </Button>
                </ModalFooter>
            </Modal>
      
        <div className="relative bg-yellow-600 pt-16 pb-32 flex content-center items-center justify-center h-screen">
            
            <div className=" bg-secondary bg-cover bg-center absolute top-0 w-full h-full" >
            
            <div  />
            
            <div className="container mt-24  max-w-8xl relative mx-auto">
                <div className="items-center flex flex-wrap">
                    <div className="w-full lg:w-6/12 mt-24 px-4 ml-auto mr-auto text-left">
                        <H2 color="black">Atrevete a hacer valer tu arte.</H2>
                        <div className="text-gray-600">
                            <LeadText color="gray-400">
                                Permite que tu arte genere una comunidad de fans que apoyen tu arte digital,atravez de los NFTx
                            </LeadText>
                        </div>
                    </div>
                </div>
            </div>
     
            </div>
             </div>
  </>
         );
}
