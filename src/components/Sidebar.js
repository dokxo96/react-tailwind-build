/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import AdminNavbar from './AdminNavbar';
import Icon from '@material-tailwind/react/Icon';
import H6 from '@material-tailwind/react/Heading6';
import Quote from "@material-tailwind/react/Quote";
import axios from "axios";

import logo from 'assets/img/vitere50.png';
import Dropdown from "@material-tailwind/react/Dropdown"
import DropdownItem from "@material-tailwind/react/DropdownItem"
import DropdownLink from "@material-tailwind/react/DropdownLink"
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Button from "@material-tailwind/react/Button";
 import { baseURL } from 'services/API'

export default function Sidebar() {
    const [showSidebar, setShowSidebar] = useState('-left-64');
    const [showModal, setShowModal] = useState(false);
    const [showfileinput, setfileinput] = useState(true);

    const [sdsdds, setfile] = useState( );

    const viewxml =async (e) =>{
       const file = e.target.files[0];
       
       const reader = new window.FileReader();
        reader.readAsBinaryString (file);
        reader.onloadend = () => {
            var bs64=reader.result;
            //console.log(  window.btoa(unescape(encodeURIComponent( Buffer(bs64).toString() )))      );
            var  data64= window.btoa(unescape(encodeURIComponent( Buffer(bs64).toString() ))).toString();
            var str = data64.substring(0, (data64.length));
            console.log(str);
            try {
                axios.post(
                    baseURL+'compras/factura',
                    data64.substring(0, (data64.length)), 
                    {
                        headers: { 
                            'Authorization': 'Basic xxxxxxxxxxxxxxxxxxx',
                            'Content-Type' : 'text/plain' 
                        }
                    }  )
                .then((res) => {
                    console.log('factura cargada agreggado!');
                    
                     return res;
                }).catch((error) => {
                    console.log(error)
                    return;
                });
        
                
              } catch (error) {
               // console.error( error);
                 
              }  
        };

      /*       var reader = new FileReader();
            reader.readAsDataURL(e);
            reader.onload=function(){
                var bs64=reader.result;
                console.log(bs64);
            }
         */

       /*  try {
            axios.post(baseURL+'compras/factura', e.target.files[0])
            .then((res) => {
                console.log('cliente agreggado!');
                
                 return res;
            }).catch((error) => {
                console.log(error)
                return;
            });
    
            
          } catch (error) {
           // console.error( error);
             
          } */
    
    }
     
    return (
        <>
            <AdminNavbar
                showSidebar={showSidebar}
                setShowSidebar={setShowSidebar}
            />
            <div
                className={`h-screen fixed  top-0 md:left-0 ${showSidebar} overflow-y-auto flex-row flex-nowrap overflow-hidden shadow-xl bg-white w-64 z-10 py-4 px-6 transition-all duration-300`}
            >
                <div className="flex-col items-stretch min-h-full flex-nowrap px-0 relative">
                    <a
                         
                        href="/dashboard"
                        rel="noreferrer"
                        className="mt-2 text-center w-full inline-block"
                    >
                                <img src={logo}></img>
                    </a>
                    <div className="flex flex-col">
                        <hr className="my-4 min-w-full" />
                        <Quote color="lightBlue" footer={window.localStorage.getItem("name")} cite={window.localStorage.getItem("role")}>
                        Bienvenido
                        </Quote>
                         
                        
                        <ul className="flex-col mt-4 min-w-full flex list-none">
                            <li className="rounded-lg mb-4">
                                    <Dropdown color="lightBlue"placement="bottom-start"buttonText="ventas"buttonType="link"size="Large Dropdown"
                                    rounded={false}block={false}ripple="light">
                                        
                                        <Dropdown color="lightBlue" placement="bottom-start" buttonText="Capturas" buttonType="link" size="sm" rounded={false}block={false}ripple="light"
                                          > 
                                               <DropdownLink href="/Ventas/Capturas/Grupos" color="lightBlue" ripple="light"  onClick={(e) => { e.preventDefault(); window.location.href="/Ventas/Capturas/Grupos";}}
                                                > Grupos </DropdownLink>
                                                <DropdownLink href="/Ventas/Capturas/Subgrupos" color="lightBlue" ripple="light"  onClick={(e) =>{ e.preventDefault(); window.location.href="/Ventas/Capturas/Subgrupos";}}
                                                > Sub-Grupos </DropdownLink>
                                                <DropdownLink  color="lightBlue" ripple="light"  onClick={(e) =>{ e.preventDefault(); window.location.href="/Ventas/Capturas/Productos";}}
                                                > Productos Sat </DropdownLink>
                                                <DropdownLink  color="lightBlue" ripple="light"  onClick={(e) =>{ e.preventDefault(); window.location.href="/Ventas/Capturas/Unidad_de_medida";}}
                                                > Unidad de medida </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Articulos </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) =>{ e.preventDefault();  setShowModal(true)}}
                                                > Cargar fact. </DropdownLink>
                                          </Dropdown>
                                          
                                        <Dropdown color="lightBlue" placement="bottom-start" buttonText="Reportes" buttonType="link" size="sm" rounded={false}block={false}ripple="light"
                                          ><DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                          > Reporte </DropdownLink> </Dropdown>
                                         <Dropdown color="lightBlue" placement="bottom-start" buttonText="Catálogos" buttonType="link" size="sm" rounded={false}block={false}ripple="light"
                                          > 
                                                <DropdownLink href="/Ventas/Catalogos/Rutas" color="lightBlue" ripple="light"  onClick={(e) => { e.preventDefault(); window.location.href="/Ventas/Catalogos/Rutas";}}
                                                > Rutas </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => { e.preventDefault(); window.location.href="/Ventas/Catalogos/Clientes";}}
                                                > Clientes </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Precios de Lista </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Precios Especiales </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Clientes AFH </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Precios de Lista (AFH) </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Equivalencias e-Route </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Vendedores </DropdownLink>
                                                 <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Usuarios </DropdownLink>
                                                 <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Cdis </DropdownLink>
                                          </Dropdown>
                                         <Dropdown color="lightBlue" placement="bottom-start" buttonText="Utilerias" buttonType="link" size="sm" rounded={false}block={false}ripple="light"
                                          > 
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Importa Objetivos desde Excel </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Verifica Status de Facturas </DropdownLink>
                                                <DropdownLink href="#" color="lightBlue" ripple="light"  onClick={(e) => e.preventDefault()}
                                                > Exporta Facturas a Contpaq </DropdownLink>
                                          </Dropdown>
                                    </Dropdown>
                                    <Dropdown color="lightBlue"placement="bottom-start"buttonText="Proveedores"buttonType="link"size="Large Dropdown"
                                    rounded={false}block={false}ripple="light"></Dropdown>
                                    <Dropdown color="lightBlue"placement="bottom-start"buttonText="Inventarios"buttonType="link"size="Large Dropdown"
                                    rounded={false}block={false}ripple="light"></Dropdown>
                                    <Dropdown color="lightBlue"placement="bottom-start"buttonText="Conciliación"buttonType="link"size="Large Dropdown"
                                    rounded={false}block={false}ripple="light"></Dropdown>
                                    <Dropdown color="lightBlue"placement="bottom-start"buttonText="SAT"buttonType="link"size="Large Dropdown"
                                    rounded={false}block={false}ripple="light"></Dropdown>
                                    <Dropdown color="lightBlue"placement="bottom-start"buttonText="Transferencia"buttonType="link"size="Large Dropdown"
                                    rounded={false}block={false}ripple="light"></Dropdown>
                                   
                            </li>
                            <li className="rounded-lg mb-2">
                                <NavLink
                                    to="/settings"
                                    className="flex items-center gap-4 text-sm text-gray-700 font-light px-4 py-3 rounded-lg"
                                    activeClassName="bg-gradient-to-tr from-light-blue-500 to-light-blue-700 text-white shadow-md"
                                >
                                    <Icon name="settings" size="2xl" />
                                    Mi perfil
                                </NavLink>
                            </li>
                       
                          
                          
                         </ul>

                        
                    </div>
                </div>
            </div>
            <Modal size="lg" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader toggler={() => setShowModal(false)}>
                    Cargar factura
                </ModalHeader>
                <ModalBody>
               {setfileinput && <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg  tracking-wide uppercase  cursor-pointew-full flex flex-col items-center px-4   mtbg-white rounded-lg  tracking-wide uppercase  cursor-pointer ">
                                      
                                        <svg
                                          className="w-8 h-8 text-pink-600"
                                          fill="currentColor"
                                          xmlns="http://www.w3.org/2000/svg"
                                          viewBox="0 0 20 20"
                                        >
                                          <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                        </svg>
                                     
                                      
                                        <span className="mt-2 text-base leading-normal">
                                          Selecciona un archivo
                                        </span>
                                     
                                      <input
                                        type="file"
                                        className="hidden"
                                        accept="file"
                                         onChange={ (e) => {viewxml(e);}}
                                        required
                                         
                                      />
                                    </label>}
                                    <object data={sdsdds}
            type="application/xml"
            width="100%"
            height="100%"
            >
              
            </object>
                </ModalBody>
                <ModalFooter>
                    <Button 
                        color="red"
                        buttonType="link"
                        onClick={(e) => setShowModal(false)}
                        ripple="dark"
                    >
                        Close
                    </Button>

                    <Button
                        color="green"
                        onClick={(e) => setShowModal(false)}
                        ripple="light"
                    >
                        Save Changes
                    </Button>
                </ModalFooter>
            </Modal>
    
        </>
    );
}
