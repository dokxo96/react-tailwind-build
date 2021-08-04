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

import { borrar, añadir, editar, buscar } from "services/APIClientes";

import { baseURL } from 'services/API'

export default function Rutas() {
  const [data, setData] = useState([]);
  const [datainput, setDatainput] = useState({});
  const [idclient, setidclient] = useState();

  const [nomb, setnombre] = useState();
  const [codig, setcodig] = useState();
  const [corre, setCorreo] = useState();
  const [call, setCalle] = useState();
  const [col, setCol] = useState();
  const [ciuda, setCiud] = useState();
  const [codigop, setCodigop] = useState();
  const [rf, setRFC] = useState();
  const [tip, setTypo] = useState();
  const [plazo_p, setPlazop] = useState();
  const [cuantas_n, setCuantas_notas] = useState();
  const [formap, setForma_de_pago_id] = useState();
  const [metodp, setMetodop] = useState();
  const [uso_cf, setUso_cfdi_id] = useState();
  const [inhabili, setInhabilitado] = useState();
  const [cdisid, setCdis] = useState();
  const [activo, setActivo] = useState();


  const [showModal, setShowModal] = React.useState(false);
  const [showEditModal, setShowEditModal] = React.useState(false);

  const [getlistid, setlistid] = useState(window.localStorage.getItem("list"))
  const lista = ["/clientes/getall", "/clientes/getalla"];
  //Modifies


  const Changenombre = (e) => { return setnombre(e.target.value); }
  const Changecodigo = (e) => { return setcodig(e.target.value); }
  const Changecorreo = (e) => { return setCorreo(e.target.value); }
  const Changecalle = (e) => { return setCalle(e.target.value); }
  const Changecol = (e) => { return setCol(e.target.value); }
  const Changeciudad = (e) => { return setCiud(e.target.value); }
  const Changecodigop = (e) => { return setCodigop(e.target.value); }
  const Changerfc = (e) => { return setRFC(e.target.value); }
  const Changetipo = (e) => { return setTypo(e.target.value); }
  const Changeplazo = (e) => { return setPlazop(e.target.value); }
  const Changecuantasn = (e) => { return setCuantas_notas(e.target.value); }
  const Changeformap = (e) => { return setForma_de_pago_id(e.target.value); }
  const Changemetodop = (e) => { return setMetodop(e.target.value); }
  const ChangeusoCfdi = (e) => { return setUso_cfdi_id(e.target.value); }
  const Changeinhabi = (e) => { return setInhabilitado(e.target.value); }
  const Changecdi = (e) => { return setCdis(e.target.value); }


  const Changeactivo = (e) => {
    if (activo) { setActivo(false); }
    else { setActivo(true); }


    return;
  }
  const Changelist = (e) => {


    console.log(window.localStorage.getItem("list"));

    if (window.localStorage.getItem("list") == 1) { window.localStorage.setItem("list", 0); }
    else { window.localStorage.setItem("list", 1); }
    window.location.reload();


    return;
  }
  const reset = () => {

    setnombre();
    setcodig();
    setCorreo();
    setCalle();
    setCol();
    setCiud();
    setCodigop();
    setRFC();
    setTypo();
    setPlazop();
    setCuantas_notas();
    setForma_de_pago_id();
    setMetodop();
    setUso_cfdi_id();
    setInhabilitado();
    setCdis();
    setActivo();

  }
  // methods

  function del(id) {
    borrar(id);
    return;
  }
  function add() {
     var id = parseInt(window.localStorage.getItem("id"), 10);
    var cid = parseInt(window.localStorage.getItem("cdi"), 10);
    const o = {
        
        nombre: nomb,
        codigo: codig,
        correo: corre,
        calle: call,
        colonia: col,
        ciudad: ciuda,
        codigo_postal: codigop,
        rfc: rf,
        tipo: parseInt(tip),
        plazo_pago:parseInt(plazo_p),
        cuantas_notas: parseInt(cuantas_n),
        forma_de_pago_id: parseInt(formap),
        metodo_de_pago_id: parseInt(metodp),
        uso_cfdi_id: parseInt(uso_cf),
        inhabilitado: parseInt(inhabili),
        cdis_id:cid,
        creado_por: id,
        active: 1
        }
    console.log(o);
   añadir(o);
   // reset()
    return;
  }
  function edit() {
    var idu = parseInt(window.localStorage.getItem("id"), 10);;
    var cid = parseInt(window.localStorage.getItem("cdi"), 10);
    const o = {
        id: parseInt(idclient),
        nombre: nomb,
        codigo: codig,
        correo: corre,
        calle: call,
        colonia: col,
        ciudad: ciuda,
        codigo_postal: codigop,
        rfc: rf,
        tipo: parseInt(tip),
        plazo_pago:parseInt(plazo_p),
        cuantas_notas: parseInt(cuantas_n),
        forma_de_pago_id: parseInt(formap),
        metodo_de_pago_id: parseInt(metodp),
        uso_cfdi_id: parseInt(uso_cf),
        inhabilitado: parseInt(inhabili),
        cdis_id:cid,
        modificado_por: idu,
        active: 1
        }
    console.log(o);
    editar(o); 
    //reset();
    return;

  }
  function get(id) {
    try {
      axios.get(baseURL + 'clientes/findbyid?id=' + id)
        .then((res) => {
          var o = res.data;
          console.log(res.data);
          setidclient(o.id);
    setnombre(o.nombre);
    setcodig(o.codigo);
    setCorreo(o.correo);
    setCalle(o.calle);
    setCol(o.colonia);
    setCiud(o.ciudad);
    setCodigop(o.codigo_postal);
    setRFC(o.rfc);
    setTypo(o.tipo);
    setPlazop(o.plazo_pago);
    setCuantas_notas(o.cuantas_notas);
    setForma_de_pago_id(o.forma_de_pago_id);
    setMetodop(o.metodo_de_pago_id);
    setUso_cfdi_id(o.uso_cfdi_id);
    setInhabilitado(o.inhabilitado);
    setCdis(o.cdis_id);
    setActivo(o.active);
        /*   setnombre(o.nombre);
          setnumero_ruta(o.numero_ruta);
          settope_prestamo(o.tope_prestamo);
          setcode_route(o.code_route);
          setpordes(o.pordes);
          settipo_comision_id(o.tipo_comision_id);
          setcdis_id(o.cdis_id);
          setidruta(o.id)
          setactivo(res.data.active); */
          return;
        }).catch((error) => {
          console.log(error);
          return null;
        });


    } catch (error) {
      // console.error( error);

    }

  }

  useEffect(async () => {

    await axios
      .get(baseURL + lista[getlistid])
      .then((response) => {
        console.log(response);
        var d = response.data;
        setData(d);
        return;
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
                <Checkbox color="lightBlue" onChange={Changelist} defaultChecked={window.localStorage.getItem("list")} name="get" id="get" />

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
                            CODIGO
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            NOMBRE
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            CORREO
                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            RFC                          </th>
                          <th className="px-2  text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-center">
                            DIRECCIÓN
                          </th>


                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            TIPO
                          </th>

                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            PLAZO DE PAGO
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            CUANTAS NOTAS
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            FORMA DE PAGO
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            METODO DE PAGO
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            USO DE CDI
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            INHABILITADO
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            CREADO POR
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            ACTIVO
                          </th>
                          <th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            FECHA CREADO
                          </th><th className="px-2 text-purple-500 align-middle border-b border-solid border-gray-200 py-3 text-sm whitespace-nowrap font-light text-left">
                            OPCIONES
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {data.map((item) => (
                          <tr key={item.id}>
                            <td className="px-2 text-sm">{item.id}</td>
                            <td className="px-2 text-sm">{item.codigo}</td>
                            <td className="px-2 text-sm">{item.nombre}</td>
                            <td className="px-2 text-sm">{item.correo}</td>
                            <td className="px-2 text-sm">{item.rfc}</td>
                            <td className="px-2 text-xs">{item.calle + "," + item.colonia + "," + item.codigo_postal + "," + item.ciudad}</td>
                            <td className="px-2 text-sm">{item.tipo}</td>
                            <td className="px-2 text-sm">{item.plazo_pago}</td>
                            <td className="px-2 text-sm"> {item.cuantas_notas}</td>
                            <td className="px-2 text-sm">{item.forma_de_pago_id}</td>
                            <td className="px-2 text-sm">{item.metodo_de_pago_id}</td>
                            <td className="px-2 text-sm">{item.uso_cfdi_id}</td>
                            <td className="px-2 text-sm">  {item.inhabilitado}</td>
                            <td className="px-2 text-sm">{item.creado_por}</td>

                            <td>

                              <Checkbox
                                text=""
                                color="lightBlue"
                                defaultChecked={item.active}
                              />
                            </td>


                            <td className="px-2 text-sm">{item.fecha_creado}</td>


                            <td>
                              <Button onClick={(e) => { get(item.id); setShowEditModal(true); }} size="sm"     >
                                <Icon name="edit" size="2xl" />
                              </Button>
                            </td>
                            <td>
                              <Button onClick={(e) => { del(item.id); }} size="sm" color="red"  >

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

      {<Modal
        size="lg"
        active={showModal}
        toggler={() => setShowModal(false)}
      >
        <ModalHeader toggler={() => setShowModal(false)}>
          Agregar un nuevo cliente
        </ModalHeader>
        <form method="post">
        <ModalBody>
                     
                      <h6>Datos personales</h6>
                      <div class="  md:flex mb-6">
                      
                        <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changenombre} outline={false} placeholder="Nombre" maxlength="80" required value={nomb} />

                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changecodigo} outline={false} placeholder="Codigo"maxlength="10"required value={codig} />

                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changecorreo} outline={false} placeholder="Correo" maxlength="250" required step=".01" value={corre} />

                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changerfc} outline={false} placeholder="RFC" maxlength="13" required step=".01" value={rf} />

                        </div>





                      </div>
                      <h6>Datos de  ubicación</h6>
                      <div class="  md:flex mb-6">
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changecalle} outline={false} placeholder="Calle y número" maxlength="80" required value={call} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changecol} outline={false} placeholder="Colonia" maxlength="80" required value={col} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changeciudad} outline={false} placeholder="Ciudad "maxlength="60" required value={ciuda} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number" color="lightBlue" size="regular" onChange={Changecodigop} outline={false} placeholder="Codigo Postal "  required maxlength="5" value={codigop} />
                        </div>
                      </div>
                      <h6>Datos de compraventa</h6>
                      <div class="  md:flex mb-6">
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changetipo} outline={false} placeholder="Tipo" maxlength="1" required value={tip} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="text" color="lightBlue" size="regular" onChange={Changeplazo} outline={false} placeholder="Plazo"  required value={plazo_p} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number" color="lightBlue" size="regular" onChange={Changecuantasn} outline={false} placeholder="notas " required value={cuantas_n} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number" color="lightBlue" size="regular" onChange={Changeformap} outline={false} placeholder="forma de pago" required value={formap} />
                        </div>
                      </div>
                      <div class="  md:flex mb-6">
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number" color="lightBlue" size="regular" onChange={Changemetodop} outline={false} placeholder="metodo de pago" required value={metodp} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number" color="lightBlue" size="regular" onChange={ChangeusoCfdi} outline={false} placeholder="uso cfdi" required value={uso_cf} />
                        </div>
                        <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                          <Input type="number" color="lightBlue" size="regular" onChange={Changeinhabi} outline={false} placeholder="inhabilitado " required value={inhabili} />
                        </div>
                      
                      </div>
                      
                     
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
            onClick={(e) =>{     e.preventDefault();      add();
            }}
            ripple="light"
          >
            Guardar
          </Button>
          
        </ModalFooter>
        </form>
      </Modal>
      }
      {<Modal
        size="regular"
        active={showEditModal}
        toggler={() => setShowEditModal(false)}
      >
        <ModalHeader toggler={() => setShowEditModal(false)}>
          Editar una ruta
        </ModalHeader>

        <ModalBody>
          <form method="put">

          <ModalBody>
                     
                     <h6>Datos personales</h6>
                     <div class="  md:flex mb-6">
                     
                       <div class="md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changenombre} outline={false} placeholder="Nombre" maxlength="80" required value={nomb} />

                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changecodigo} outline={false} placeholder="Codigo"maxlength="10"required value={codig} />

                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changecorreo} outline={false} placeholder="Correo" maxlength="250" required step=".01" value={corre} />

                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changerfc} outline={false} placeholder="RFC" maxlength="13" required step=".01" value={rf} />

                       </div>





                     </div>
                     <h6>Datos de  ubicación</h6>
                     <div class="  md:flex mb-6">
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changecalle} outline={false} placeholder="Calle y número" maxlength="80" required value={call} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changecol} outline={false} placeholder="Colonia" maxlength="80" required value={col} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changeciudad} outline={false} placeholder="Ciudad "maxlength="60" required value={ciuda} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="number" color="lightBlue" size="regular" onChange={Changecodigop} outline={false} placeholder="Codigo Postal "  required maxlength="5" value={codigop} />
                       </div>
                     </div>
                     <h6>Datos de compraventa</h6>
                     <div class="  md:flex mb-6">
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changetipo} outline={false} placeholder="Tipo" maxlength="1" required value={tip} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="text" color="lightBlue" size="regular" onChange={Changeplazo} outline={false} placeholder="Plazo"  required value={plazo_p} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="number" color="lightBlue" size="regular" onChange={Changecuantasn} outline={false} placeholder="notas " required value={cuantas_n} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="number" color="lightBlue" size="regular" onChange={Changeformap} outline={false} placeholder="forma de pago" required value={formap} />
                       </div>
                     </div>
                     <div class="  md:flex mb-6">
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="number" color="lightBlue" size="regular" onChange={Changemetodop} outline={false} placeholder="metodo de pago" required value={metodp} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="number" color="lightBlue" size="regular" onChange={ChangeusoCfdi} outline={false} placeholder="uso cfdi" required value={uso_cf} />
                       </div>
                       <div class="mt-2 md:w-1/2 px-3 mb-6 md:mb-0">
                         <Input type="number" color="lightBlue" size="regular" onChange={Changeinhabi} outline={false} placeholder="inhabilitado " required value={inhabili} />
                       </div>
                       <div className=" mt-4 px-4 bg-bb">
                         <Checkbox color="lightBlue" onChange={Changeactivo} checked={activo} name="eactivo" text="activo" id="eactivo" />
                       </div>
                     </div>
                     
                    
       </ModalBody>

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
            onClick={(e) => { edit(); return; }}
            ripple="light"
          >
            Actualizar
          </Button>
        </ModalFooter>

      </Modal>
      }  </>
  );
}
