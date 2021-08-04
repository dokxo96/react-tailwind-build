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
 import { del,add,edit } from "services/APISubgrupos";

 import {baseURL} from 'services/API'

export default function Subgrupos() {
  const [data, setData] = useState([]);
  const [grupodesc, setgruposdesc] = useState();
  const [desc, setdesc] = useState();
  const [danon, setdanone] = useState(false);
  const [activo, setactivo] = useState();
  const [savesubgrupo, setsavesubgrupo] = useState();

  const [idgrupo, setidgrupo] = useState("");
  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);
  
  const [getlistid,setlistid] = useState(window.localStorage.getItem("list"))
 const lista=["/subgrupos/getall","/subgrupos/getalla"];
 const [selectoptions, setSelectoptions] = useState([]);
  
const reset =()=>{
  setData("")
  setgruposdesc("")
  setdesc("")
  setdanone("")
  setactivo("")
  setsavesubgrupo("")
  setidgrupo("")
}
 //Modifies
 const handleChange = (e) => {
    console.log(desc);
    setdesc( e.target.value );
    
    return;
  }
  const Change = (e) => {
    
    setsavesubgrupo( e.target.value );
    console.log(savesubgrupo)
    return;
  }
  const handledanoneChange = (e) => {
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
  const fillList = (e) => {
    
    if(activo){ setactivo(false);}
    else{setactivo(true);}

   
    return;
  }
  
  // methods

  
  function addnew() {
    var id=    parseInt(window.localStorage.getItem("id"), 10); 
    var gid = parseInt(savesubgrupo);
    const grupo= {
      descripcion:desc,
      danone:danon,
      grupos_id:gid,
      creado_por: id ,
      active:1

    }
    console.log(grupo);
   add(grupo);
   reset();
    return  ;
  }
  function editar() {
    var idu=    parseInt(window.localStorage.getItem("id"), 10); ;
    var gid= parseInt( savesubgrupo)
    const grupo= {
      id:idgrupo,
      grupos_id:gid,
      descripcion:desc,
      danone:danon,
      modificado_por: idu ,
      active:activo

    }
    console.log(grupo);
   edit(grupo);
return;

  }
  const  get =async(id) => {
    try {
      axios.get(baseURL+'subgrupos/findbyid?id='+id)
      .then((res) => {
         
           console.log(res.data.danone);
           setdesc(res.data.descripcion);
           setdanone(res.data.danone);
           setidgrupo(res.data.id);
           setactivo(res.data.active);
           setsavesubgrupo(res.data.grupos_id)
           return;
      }).catch((error) => {
          console.log(error);
          return null;
      });

      
    } catch (error) {
     // console.error( error);
       
    }
     
  }
  function getgrupo(id) {
    try {
      axios.get(baseURL+'grupos/findbyid?id='+id)
      .then((res) => {
         
           console.log(res.data.descripcion);
           setgruposdesc(res.data.descripcion);
           
           return grupodesc;
      }).catch((error) => {
          console.log(error);
          return null;
      });

      
    } catch (error) {
     // console.error( error);
       
    }
     
  }
  const    getListgrupos  = async ()=> {
    try {
      await  axios.get(baseURL+'grupos/getalla')
      .then((res) => {
       
        var d = res.data;
        setSelectoptions(res.data);
        console.log(selectoptions)
       
           return  ;
      }).catch((error) => {
          console.log(error);
          return null;
      });

      
    } catch (error) {
     // console.error( error);
       
    }
     
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect( async ()  => {
   await getListgrupos();
    axios
      .get(baseURL +lista[getlistid])
      .then((response) => {
         
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
              <Checkbox color="white" onChange={Changelist}  defaultChecked={window.localStorage.getItem("list")}  name="getall"  id="getall" />
          
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
                            Grupo
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            DESCRIPCIÓN
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            ACTIVA
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            DANONE
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
                            <td>{item.id }</td>
                            <td>{item.grupos_id}</td>
                            <td>{item.descripcion}</td>
                            <td>
                              {" "}
                              <Checkbox
                                text=""
                                color="lightBlue"
                                defaultChecked={item.active}
                              />
                            </td>
                            <td>
                              {" "}
                              <Checkbox
                                text=""
                                color="lightBlue"
                                defaultChecked={item.danone}
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
        size="regular"
        active={showModal}
        toggler={() => setShowModal(false)}
      ><form onSubmit={addnew}>
        <ModalHeader toggler={() => setShowModal(false)}>
          Agregar un nuevo sub grupo
        </ModalHeader>
        
        <ModalBody>
         
            <CardBody>
              <div className="    ">
              <Textarea
            color="lightBlue"
            size="md"
            outline={false}
            placeholder="Descripción"
            onChange={handleChange}
            name="descripcion"
            required
        />
        
          <select className="w-full  " required value={savesubgrupo}  onChange={Change}>
          <option selected >Seleciona un grupo</option>
          {
            selectoptions.map((item) => (
              <option value={item.id} >{item.descripcion}</option>
            ))
          }

          </select>
            </div>
              <div className=" mt-4 px-4 bg-bb">
                <Checkbox color="lightBlue" onChange={handledanoneChange}   name="danone" text="Danone" id="checkbox" />
              </div>
            </CardBody>
        
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
            type="submit"
            ripple="light"
          >
            Guardar
          </Button>
        </ModalFooter>
        </form>
      </Modal>
  } 
   {   <Modal
        size="regular"
        active={showEditModal}
        toggler={() => setShowEditModal(false)}
      >
        <ModalHeader toggler={() => setShowEditModal(false)}>
          Editar un  subgrupo
        </ModalHeader>
      
        <ModalBody>
         
            <CardBody>
              <div className="    ">
              <Textarea
            color="lightBlue"
            size="md"
            outline={false}
            placeholder="Descripción"
            onChange={handleChange}
            name="edescripcion"
            value={desc}
        />
              </div>
              <select className="w-full  " required value={savesubgrupo}  onChange={Change}>
          <option selected value={savesubgrupo}>{savesubgrupo}</option>
          {
            selectoptions.map((item) => (
              <option value={item.id} >{item.descripcion}</option>
            ))
          }

          </select>
              <div className=" mt-4 px-4 bg-bb">
                <Checkbox color="lightBlue" onChange={handledanoneChange} checked={danon}  name="edanone" text="Danone" id="echeckbox" />
              </div>

              
              <div className=" mt-4 px-4 bg-bb">
                <Checkbox color="lightBlue" onChange={Changeactivo} checked={activo}  name="eactivo" text="activo" id="eactivo" />
              </div>
            </CardBody>
        
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
             onClick={(e) =>editar()}
            ripple="light"
          >
            Actualizar
          </Button>
        </ModalFooter>
        
      </Modal>
  }  </>
  );
}
