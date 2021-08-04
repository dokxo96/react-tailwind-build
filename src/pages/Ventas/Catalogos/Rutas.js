import Checkbox from "@material-tailwind/react/Checkbox";

import Card from "@material-tailwind/react/Card";
import CardHeader from "@material-tailwind/react/CardHeader";
import CardBody from "@material-tailwind/react/CardBody";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";
import Sidebar from "components/Sidebar";
import Button from "@material-tailwind/react/Button";
import Icon from "@material-tailwind/react/Icon";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Textarea from "@material-tailwind/react/Textarea";
import Input from "@material-tailwind/react/Input";

 import { borrar,añadir,editar,buscar } from "services/APIRutas";

 import {baseURL} from 'services/API'

export default function Rutas() {
  const [data, setData] = useState([]);
  const [datainput, setDatainput] = useState({});

  const [nomb, setnombre] = useState();
  const [numeroruta, setnumero_ruta] = useState();
  const [tope_presta, settope_prestamo] = useState();
  const [coderoute, setcode_route] = useState();
  const [pordesc, setpordes] = useState();
  const [activo, setactivo] = useState();
  const [cdisid, setcdis_id] = useState();
  const [tipocomisionid, settipo_comision_id] = useState();
  const [codigostate, setcodigostate] = useState();
  const [desc, setdesc] = useState();
  const [danon, setdanone] = useState(false);
  const [idruta, setidruta] = useState();

  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  
  const [getlistid,setlistid] = useState(window.localStorage.getItem("list"))
 const lista=["/rutas/getall","/rutas/getalla"];
 //Modifies
  const Changedescr = (e) => {
    console.log(desc);
    setdesc( e.target.value );
    
    return;
  }
 
 const Changenombre = (e) => { return setnombre( e.target.value ); }
  const Changenumeroruta = (e) => { return setnumero_ruta( e.target.value ); }
  const Changetope = (e) => {return settope_prestamo( e.target.value ); }
  const Changecode = (e) => {return setcode_route( e.target.value ); }
  const Changepordes = (e) => {return setpordes( e.target.value ); }
  const Changecdis = (e) => {return setcdis_id( e.target.value ); }
  const Changetipo = (e) => {return settipo_comision_id( e.target.value ); }
  const Changecodigo = (e) => {
     setcodigostate( e.target.value );
       return;
  }
  const Changedanone = (e) => {
    console.log("dan");
    
    console.log(danon);
    if(danon){ setdanone(false);}
    else{setdanone(true);}

   
    return;
  }
  const Changeactivo = (e) => {
    
    if(activo){ setactivo(false);}
    else{setactivo(true);}

   
    return;
  }
  const Changelist = (e) => {

    
    console.log(window.localStorage.getItem("list"));

    if(window.localStorage.getItem("list")==1){  window.localStorage.setItem("list",0);}
    else{ window.localStorage.setItem("list",1);}
    window.location.reload();
  
   
    return;
  }
  const reset =()=>{
    setData("")
    setcodigostate("")
    setdesc("")
    setdanone("")
    setactivo("")
    
  }
  // methods

  function del(id) {
    borrar(id);
    return;
  }
  function add() {
    var id=    parseInt(window.localStorage.getItem("id"), 10); 
    var cid=    parseInt(window.localStorage.getItem("cdi"), 10); 

    const grupo= {
      cdis_id:cid,
      numero_ruta:parseInt(numeroruta),
      nombre:nomb,
      tope_prestamo:parseInt(tope_presta),
      code_route:coderoute,
      pordes:parseInt(pordesc),
      tipo_comision_id:parseInt(tipocomisionid),
      creado_por: id ,
      active:1

    }
    console.log(grupo);
    añadir(grupo);
    reset()
    return  ;
  }
  function edit() {
    var idu=    parseInt(window.localStorage.getItem("id"), 10); ;
    var cid=    parseInt(window.localStorage.getItem("cdi"), 10); 
    const grupo= {
      id:idruta,
      cdis_id:cid,
      numero_ruta:parseInt(numeroruta),
      nombre:nomb,
      tope_prestamo:parseInt(tope_presta),
      code_route:coderoute,
      pordes:parseInt(pordesc),
      tipo_comision_id:parseInt(tipocomisionid),
      creado_por: idu ,
      active:activo
    }
    console.log(grupo);
   editar(grupo);
   //reset();
return;

  }
  function get(id) {
    try {
      axios.get(baseURL+'rutas/findbyid?id='+id)
      .then((res) => {
           var o =res.data;
           console.log(res.data);
           setnombre(o.nombre);
           setnumero_ruta(o.numero_ruta);
           settope_prestamo(o.tope_prestamo);
           setcode_route(o.code_route);
           setpordes(o.pordes);
           settipo_comision_id(o.tipo_comision_id);
           setcdis_id(o.cdis_id);
           setidruta(o.id)
           setactivo(res.data.active);
           return;
      }).catch((error) => {
          console.log(error);
          return null;
      });

      
    } catch (error) {
     // console.error( error);
       
    }
     
  }

  useEffect(() => {
   
    axios
      .get(baseURL +lista[getlistid])
      .then((response) => {
        console.log(response);
        var d = response.data;
        setData(d);
        return ;
      })
      .catch((e) => {
        // Capturamos los errores
        console.log(e);
        return null;
      });
  }, []);

  return (
    <>
      <Sidebar />
      <div className="  md:ml-64">
        <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4">
            
            </div>
          </div>
        </div>

        <div className="px-3 md:px-8 h-auto -mt-24">
          <div className="container mx-auto max-w-full">
            <div className="grid grid-cols-1 px-4 mb-16">
           <Card>
           <p className="ml-2 text-white">Mostrar todos</p>
              <Checkbox color="lightBlue" onChange={Changelist}  defaultChecked={window.localStorage.getItem("list")}  name="get"   id="get" />
          
                <CardHeader color="blue" contentPosition="right">
                  <div className="w-full">
                    {" "}
                    <h1>Añadir</h1>{" "}
                    <Button
                      contentPosition="right"
                      color="lightBlue"
                      buttonType="filled"
                      size="regular"
                      rounded={true}
                      block={false}
                      iconOnly={true}
                      ripple="light"
                      onClick={(e) => setShowModal(true)}
                    >
                      <Icon name="add" size="sm" />
                    </Button>
                  </div>
                </CardHeader>
                <CardBody>
                  <div className="overflow-x-auto overflow-y-auto">
                    <table className="items-center w-full bg-transparent border-collapse">
                      <thead>
                        <tr>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            ID
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            NOMBRE
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            NÚMERO DE RUTA
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            TOPE DE RUTA
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            CODIGO DE RUTA
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            % DE DESC.
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            TIPO DE COMISION
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            CDI_ID
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            ACTIVA
                          </th>
                         
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            FECHA CREADO
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            OPCIONES
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.numero_ruta}</td>
                            <td>{item.tope_prestamo}</td>
                            <td>{item.code_route}</td>
                            <td>{item.pordes}</td>
                            <td>{item.tipo_comision_id}</td>
                            <td>{item.cdis_id}</td>
                            <td>
                              
                              <Checkbox
                                text=""
                                color="lightBlue"
                                defaultChecked={item.active}
                              />
                            </td>
                            

                            <td>{item.fecha_creado}</td>
                       

                            <td>
                                <Button  onClick={(e) => { get(item.id);  setShowEditModal(true); }}   size="sm"     >
                                  <Icon name="edit" size="2xl" /> 
                                </Button>
                            </td> 
                            <td>
                               <Button  onClick={(e) => { del(item.id); }}  size="sm"  color="red"  >
                                
                                <Icon name="delete" size="2xl" />
                              </Button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardBody>
              </Card>
            </div>
          </div>
        </div>
      </div>
 
   {   <Modal
        size="lg"
        active={showModal}
        toggler={() => setShowModal(false)}
      >
        <ModalHeader toggler={() => setShowModal(false)}>
          Agregar una nueva ruta  
        </ModalHeader>
      
        <ModalBody>
        <form                    method="post">
                
                    <div class="  md:flex mb-6">
                        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                        <Input type="text"   color="lightBlue"  size="regular" onChange={Changenombre}   outline={false} placeholder="Nombre de ruta" maxlength="60" />                            
                          
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                        <Input type="number"   color="lightBlue"  size="regular"onChange={Changenumeroruta}   outline={false} placeholder="Numero de ruta"  />                            
                          
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                        <Input type="number"   color="lightBlue"  size="regular" onChange={Changetope}  outline={false} placeholder="Tope de prestamo"  maxlength="8" step=".01"/>                            
                          
                        </div>
                       
                        
                        
                      

                    </div>
                    <div class="  md:flex mb-6">
                      <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                        <Input type="text"   color="lightBlue"  size="regular" onChange={Changecode}   outline={false} placeholder="Código de ruta" />                            
                        </div>
                      <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number"   color="lightBlue"  size="regular" onChange={Changepordes}  outline={false} placeholder="Porcentaje de desc." />                            
                      </div>
                      <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number"   color="lightBlue"  size="regular" onChange={Changetipo}  outline={false} placeholder="Tipo de comisión " />                            
                      </div>
                       
                    </div>
              </form>
          
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowModal(false)}
            ripple="dark"
          >
            Cancelar
          </Button>

          <Button
            color="green"
            onClick={(e) =>  add()}
            ripple="light"
          >
            Guardar
          </Button>
        </ModalFooter>
        
      </Modal>
  } 
   {   <Modal
        size="regular"
        active={showEditModal}
        toggler={() => setShowEditModal(false)}
      >
        <ModalHeader toggler={() => setShowEditModal(false)}>
          Editar una ruta  
        </ModalHeader>
      
        <ModalBody>
        <form                    method="post">
            
            <div class="  md:flex mb-6">
                <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                <Input type="text"   color="lightBlue"  size="regular" onChange={Changenombre}   outline={false} placeholder="Nombre de ruta" maxlength="60" value={nomb}/>                            
                  
                </div>
                <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                <Input type="number"   color="lightBlue"  size="regular"onChange={Changenumeroruta}   outline={false} placeholder="Numero de ruta" value={numeroruta} />                            
                  
                </div>
                <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                <Input type="number"   color="lightBlue"  size="regular" onChange={Changetope}  outline={false} placeholder="Tope de prestamo"  maxlength="8" step=".01" value={tope_presta}/>                            
                  
                </div>
               
                
                
              

            </div>
            <div class="  md:flex mb-6">
              <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                <Input type="text"   color="lightBlue"  size="regular" onChange={Changecode}   outline={false} placeholder="Código de ruta" value={coderoute} />                            
                </div>
              <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                  <Input type="number"   color="lightBlue"  size="regular" onChange={Changepordes}  outline={false} placeholder="Porcentaje de desc." value={pordesc}/>                            
              </div>
              <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                  <Input type="number"   color="lightBlue"  size="regular" onChange={Changetipo}  outline={false} placeholder="Tipo de comisión " value={tipocomisionid}/>                            
              </div>
               
            </div>
            <div className=" mt-4 px-4 bg-bb">
                <Checkbox color="lightBlue" onChange={Changeactivo} checked={activo}  name="eactivo" text="activo" id="eactivo" />
              </div>
      </form>
        </ModalBody>
        <ModalFooter>
          <Button
            color="red"
            buttonType="link"
            onClick={(e) => setShowEditModal(false)}
            ripple="dark"
          >
            Cancelar
          </Button>

          <Button
            color="green"
             onClick={(e) =>{ edit(); return;}}
            ripple="light"
          >
            Actualizar
          </Button>
        </ModalFooter>
        
      </Modal>
  }  </>
  );
}
