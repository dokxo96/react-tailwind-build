import { useLocation } from 'react-router-dom';
import Button from '@material-tailwind/react/Button';
import Icon from '@material-tailwind/react/Icon';
import NavbarInput from '@material-tailwind/react/NavbarInput';
import Image from '@material-tailwind/react/Image';
import Dropdown from '@material-tailwind/react/Dropdown';
import DropdownItem from '@material-tailwind/react/DropdownItem';
import UploadIcon from '../assets/img/image.png';
import ProfilePicture from '../assets/img/team-1-800x800.jpg';
import Card from '@material-tailwind/react/Card';
import Input from '@material-tailwind/react/Input';

import CardBody from '@material-tailwind/react/CardBody';
import Web3 from "web3";
import NftSM from "../contracts/NFTx.json";
import {
  init,
  addNetwork,
  wait,
  sameNetwork,
} from "../utils/interaction_blockchain";

import React, { useState,useEffect } from "react";
import Modal from "@material-tailwind/react/Modal";
import ModalHeader from "@material-tailwind/react/ModalHeader";
import ModalBody from "@material-tailwind/react/ModalBody";
import ModalFooter from "@material-tailwind/react/ModalFooter";

import Tab from "@material-tailwind/react/Tab";
import TabList from "@material-tailwind/react/TabList";
import TabItem from "@material-tailwind/react/TabItem";
import TabContent from "@material-tailwind/react/TabContent";
import TabPane from "@material-tailwind/react/TabPane";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

import ImageForm from '../components/Forms/ImageForm';
import CardHeader from '@material-tailwind/react/CardHeader';
const { create } = require('ipfs-http-client');
//const ipfsClient = require("ipfs-http-client");
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' });

 

//Using the Pinata SDK with dokxo apikeys
const pinataSDK = require("@pinata/sdk");
const pinata = pinataSDK(
  "f191570b29fdf42d624a",
  "0f1a2afbbb6c4350310ed7d842f4716b495f545dd851498668bfce4977684f12"
);

export default function AdminNavbar({ showSidebar, setShowSidebar }) {
    const location = useLocation().pathname;
    const [showModal, setShowModal] = React.useState(false);
    const [Tipo, setTipo] = React.useState();
    const [openTab, setOpenTab] = useState(0);

    const [initialBc, setInitialBc] = useState({
        Hash: "",
        contract: null,
        buffer: null,
        web3: null,
        account: null,
        file: null,
        showHidebutton: false,
        showHideCharge: false,
        showHideProgress: false,
        showHideFile: true,
        showImg: true,
      });    
      const [buffer, setBuffer] = useState("");
      const [ipfss, setIpfs] = useState("");
      const [sm, setSm] = useState([]);
//data
const [filetype, setfiletype] = React.useState();
const [filecharge, setfilecharge] = React.useState();

const [price, setprice] = React.useState();
const [amountt, setAmount] = React.useState();

const [title, settitle] = React.useState();
const [desc, setdesc] = React.useState();
const [cat, setcat] = React.useState();

    const changeModal = (e) =>{
        setShowModal(e)
    }
    const changeTipo = (e) =>{
        setTipo(e)
    }
    const handletitle = (e) =>{ settitle(e.target.value); }
    const handledes = (e) =>{ setdesc(e.target.value); }

    const handlecat = (e) =>{ setcat(e.target.value); }
    const handleprice = (e) =>{ setprice(e.target.value); }
    const handleamount = (e) =>{ setAmount(e.target.value); }

    //Methods
    useEffect(() => {
      (async () => {
        try {
          init();
          if (!init()) {
            setInitialBc({
              show: true,
              success: false,
              message:
                "No cuentas con metamask,te estamos redireccionando al sitio oficial para que procedas con la descarga",
            });
            setTimeout(() => {
              window.location.replace("https://metamask.io/download");
            }, 5000);
          }
        } catch (error) {
          console.error(error);
        }
  
        //Testing if Validafy is conected to Pinata.
        pinata
          .testAuthentication()
          .then((result) => {
            //handle successful authentication here
            console.log(result);
          })
          .catch((err) => {
            //handle error here
            console.log(err);
          });
        /////
        //console.log("mycomi"+mycomision.getItem("payed"))
        try {
          window.ethereum._metamask.isUnlocked().then(function(value) {
            if (value) {
              console.log("Abierto");
            } else {
              console.log("Cerrado");
              window.location.href = "/";
            }
          });
        } catch (error) {
          console.log("e" + error);
        }
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
  
          //get the useraccounts
          let useraccounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          //get the actual networkid or chainid
          let ActualnetworkId = await window.ethereum.request({
            method: "net_version",
          });
  
          // sm address
          let tokenNetworkData = NftSM.networks[ActualnetworkId];
          if (!tokenNetworkData) {
            // window.alert("Ese smartcontract no se desplego en esta red");
            setShowModal({
              ...initialBc,
              show: true,
              success: false,
              message: "!Advertencia!  cambia de red",
            });
  
            return;
          }
          //instantiate the contract object
          let contract = new window.web3.eth.Contract(
            NftSM.abi,
            tokenNetworkData.address
          );
          setSm({ contr: contract, useraccount: useraccounts[0] });
        }
        
      })();
    }, []);

    //upload
    const ValidaHub = async (event) => {
        event.preventDefault();
        //unhideCharge(true);
        ///browser detection
        if (window.ethereum) {
          window.web3 = new Web3(window.ethereum);
    
          try {
            //tratamos de cargar el documento que el usuario eligio
           
            if (!event.target.files) {
              throw "No agrego ningun archivo";
            }
            const file = event.target.files[0];
            setfilecharge(event.target.files[0])
            //cambiar red
            const web3 = window.web3;
            const networkId = await web3.eth.net.getId();
            if (!(await sameNetwork())) {
              setInitialBc({
                ...initialBc,
                show: true,
                success: false,
                message: "Selecciona la red e intentalo de nuevo",
                disabled: true,
              });
    
              //se sale del bucle hasta que la red the metamask y la llave network en localstorage son identicas
    
              while (!(await sameNetwork())) {
                //espera 200 milisegundo para volver a llamar addNetwork evita que no se muestre el modal de metamask
                wait(200);
                await addNetwork(parseInt(localStorage.getItem("network"))).catch();
              }
            }
             //get the useraccounts
            let useraccounts = await window.ethereum.request({
              method: "eth_requestAccounts",
            });
            //get the actual networkid or chainid
            let ActualnetworkId = await window.ethereum.request({
              method: "net_version",
            });
            // sm address
            let tokenNetworkData = NftSM.networks[ActualnetworkId];
            //instantiate the contract object
            let contract = new window.web3.eth.Contract(
              NftSM.abi,
              tokenNetworkData.address
            );
            setSm({ contr: contract, useraccount: useraccounts[0] });
    
            //nos permite cargar el archivo
              const reader = new window.FileReader();
              reader.readAsArrayBuffer(file);
              reader.onloadend = () => {
                //obtener el hash de ipfs ,una vez que cargo el archivo
                window.alert("into ipfsgethash...")
                 IpfsGetHashFile(reader);
              };
          } catch (err) {
            console.log(err);
            setShowModal({
              ...initialBc,
              show: true,
              success: false,
              message: "!Hubo un error!.  ",
            });
            setInitialBc({ ...initialBc, showHideCharge: false });
            // window.alert(err.message || err);
            return;
          }
        } else {
          //no tiene metamask lo mandamos a la pagina oficial de descarga
    
          window.open("https://metamask.io/download", "_blank");
        }
    };

    const IpfsGetHashFile =async (reader) => {
      console.log("ipfsget ...");

      try {
        ipfs
                .add(Buffer(reader.result), { onlyHash: true })
                .then(async (result) => {

                  console.log(result);
                   
                  //comprobar si el hash se encuetra dentro de algun tokenuri
              /*     let ishashed = await contract.methods
                    .IsHashed(result[0].hash)
                    .call();
                  //console.log(result[0].hash);
                  if (ishashed) {
                    setShowModal({
                      ...initialBc,
                      show: true,
                      success: false,
                      message: "!Error!.\nContenido No Original",
                    });
                    //window.location.reload();
                    setTimeout(function() {
                      window.location.reload(1);
                    }, 5000);
                    return;
                  } */
    
                  //si no se encuentra el hash dentro de algun tokenuri los estampamos
    
                  //comision
                  const comision = window.web3.utils.toWei("0.00022", "ether");
                  window.alert("into ipfsPinfile...")

                  IpfsPinFile(reader);
                 
                });

      } catch (error) {
        
      }

    }
    const IpfsPinFile =async (reader) => {
      console.log("ipfsFile...");

        try {

           //guardar el archivo a ipfs
           ipfs.add(Buffer(reader.result)).then((result) => {
            //Pinata Options
            const options = {
              pinataMetadata: {
                name: title,
               
              },
            };
            
            //Adds a hash to Pinata's pin queue to be pinned asynchronously
            pinata
              .pinByHash(result.path ,options)
              .then((result) => {
                //handle results here
              
                window.alert("into mintoken...")

                MintToken(result)
               
                //
              })
              .catch((err) => {
                //handle error here
                console.log(err);
              });
          });

        } catch (error) {

        }

    }    
   
    const MintToken =async (e) => {
      console.log("mintoken...");
      try {
        var address = sm.useraccount;
        var type =openTab;
        var amount=amountt;
        var data ="0x"+  Buffer.from(e.ipfsHash, 'utf8').toString('hex'); 
        var comision = window.web3.utils.toWei("0.0033", "ether");
       
       console.log(e.ipfsHash);
       console.log({address,type,amount, data});
        
       sm.contr.methods
       .createItem(e.ipfsHash)
       .send({
         from: sm.useraccount,
         value: comision,
       })
                  .once("receipt", (receipt) => {
                    console.log(receipt);

                    
                     IpfsPinMetadata (receipt,e.ipfsHash);

                 
                  })
                  .catch((err) => {
                    console.log(err);

                    setShowModal({
                      ...initialBc,
                      show: true,
                      success: false,
                      message: err.stack,
                    });
                    setInitialBc({ ...initialBc, showHideCharge: false });
                  }); 

      } catch (error) {
        
      }
    }

    const IpfsPinMetadata =async (receipt,ipfs) => {
     try {
       console.log("ipfsmetadata-.....")
       console.log(receipt)
      const metadata = {
        name: title,
        keyvalues: {
          descripcion:desc,
          category:cat,
          cost:price,
          tokenid:receipt.events.Transfer.returnValues.tokenId,
          creator: receipt.from,
          owner: receipt.from,
          txHash: receipt.transactionHash,
        },
      };

      console.log(metadata);
      console.log(ipfs);
       
      pinata
        .hashMetadata(ipfs, metadata)
        .then((result) => {
          //handle results here
          console.log(result + " aqui");

          window.location.reload();

          //quitar la imagen de carga
          setInitialBc({
            ...initialBc,
            showHideCharge: false,
          });
        })
        .catch((err) => {
          //handle error here
          console.log(err);
        });

     } catch (error) {
       
     }


    }
    function convertToHex(str) {
      var hex = '';
      for(var i=0;i<str.length;i++) {
          hex += ''+str.charCodeAt(i).toString(16);
      }
      return hex;
  }
  function ConvertStringToHex(str) {
    var arr = [];
    for (var i = 0; i < str.length; i++) {
           arr[i] = ("00" + str.charCodeAt(i).toString(16)).slice(-4);
    }
    return "\\u" + arr.join("\\u");
}

    return (
        <nav className="bg-yellow-600 md:ml-64 py-6 px-3">
            <div className="container max-w-full mx-auto flex items-center justify-between md:pr-8 md:pl-10">
                <div className="md:hidden">
                    <Button
                        color="red"
                        buttonType="link"
                        size="lg"
                        iconOnly
                        rounded
                        ripple="light"
                        onClick={() => setShowSidebar('left-0')}
                    >
                        <Icon name="menu" size="2xl" color="white" />
                    </Button>
                    <div
                        className={`absolute top-2 md:hidden ${
                            showSidebar === 'left-0' ? 'left-64' : '-left-64'
                        } z-50 transition-all duration-300`}
                    >
                        <Button
                            color="transparent"
                            buttonType="link"
                            size="lg"
                            iconOnly
                            rounded
                            ripple="light"
                            onClick={() => setShowSidebar('-left-64')}
                        >
                            <Icon name="close" size="2xl" color="white" />
                        </Button>
                    </div>
                </div>

                <div className="flex justify-between items-center w-full">
                    <h4 className="uppercase text-black text-sm tracking-wider mt-1">
                        {location === '/'
                            ? 'DASHBOARD'
                            : location.toUpperCase().replace('/', '')}
                    </h4>

                    

                    <div className="flex">
                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-12">
                                        <Image src={UploadIcon} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            >
                                <DropdownItem color="lightBlue">
                                    <Button onClick={(e) => {changeTipo('una imagen'); setShowModal(true); setOpenTab(0); }}   size="sm"     >
                                        <Icon name="image" size="2x1" /> Imagen
                                    </Button>
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    <Button onClick={(e) => {changeTipo('un video');setShowModal(true); setOpenTab(1);}}   size="sm"     >
                                        <Icon name="image" size="2x1" /> Video
                                    </Button>
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    <Button onClick={(e) => {changeTipo('una encuesta');setShowModal(true); setOpenTab(2);}}   size="sm"     >
                                        <Icon name="list" size="2xl" /> Encuesta
                                    </Button>
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    <Button onClick={(e) => {changeTipo('un post');setShowModal(true); setOpenTab(3);}}   size="sm"     >
                                        <Icon name="list" size="2xl" /> Post
                                    </Button>
                                </DropdownItem>
                            </Dropdown>
                        </div>

                        <NavbarInput className="text-black" placeholder="Search" />

                        <div className="-mr-4 ml-6">
                            <Dropdown
                                color="transparent"
                                buttonText={
                                    <div className="w-12">
                                        <Image src={ProfilePicture} rounded />
                                    </div>
                                }
                                rounded
                                style={{
                                    padding: 0,
                                    color: 'transparent',
                                }}
                            >
                                <DropdownItem color="lightBlue">
                                    Action
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    Another Action
                                </DropdownItem>
                                <DropdownItem color="lightBlue">
                                    Something Else
                                </DropdownItem>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </div>
            {<Modal size="regular" active={showModal} toggler={() => setShowModal(false)}>
                <ModalHeader className="w-full" toggler={() => setShowModal(false)}>
                <CardHeader color="purple" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Añade {Tipo}</h2>
                    <Button
                        color="transparent"
                        buttonType="link"
                        size="lg"
                        style={{ padding: 0 }}
                    >
                    </Button>
                </div>
                </CardHeader>
                    
                </ModalHeader>

                <ModalBody>
                {/* <Tab>     */}
                <TabContent>
                  <TabPane active={openTab === 0 ? true : false}>
                      <Card className="-mt-8">
                        <CardBody>
                            <form>
                                <h4 className="text-purple-500 text-sm mt-.5 mb-6 font-light uppercase">
                                    Descripción de la Imagen
                                </h4>
                                <div className="flex flex-wrap mt-10">
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder="Titulo"
                                            onChange={handletitle}
                                            name="titulo"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder="Descripción"
                                            onChange={handledes}
                                            name="descripcion"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder="Categoría"
                                            onChange={handlecat}
                                            name="categoria"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="number"
                                            color="purple"
                                            placeholder="Costo"
                                            onChange={handleprice}
                                            name="costo"
                                            required
                                        />
                                    </div>
                                 
                                    
                                    
                                </div>

                                
                                <div className="flex flex-wrap mt-10">
                                    <div className="w-full lg:w-12/12 mb-10 font-light">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg  tracking-wide uppercase  cursor-pointer ">
                                                <svg
                                                  className="w-8 h-8 text-pink-600"
                                                  fill="currentColor"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                </svg>
                                                <span className="mt-2 text-base leading-normal">
                                                  Selecciona una imagen
                                                </span>

                                                <input
                                                  type="file"
                                                  className="hidden"
                                                  accept='.png,.jpg'
                                                  onChange={ValidaHub}
                                                  required
                                                />
                                              </label>
                                    </div>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane active={openTab === 1 ? true : false}>
                <Card className="-mt-8">
                        <CardBody>
                            <form>
                                <h4 className="text-purple-500 text-sm mt-.5 mb-6 font-light uppercase">
                                    Descripción del Video
                                </h4>
                                <div className="flex flex-wrap mt-10">
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder="Titulo"
                                            onChange={handletitle}
                                            name="titulo"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder="Descripción"
                                            onChange={handledes}
                                            name="descripcion"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                                        <Input
                                            type="text"
                                            color="purple"
                                            placeholder="Categoría"
                                            onChange={handlecat}
                                            name="categoria"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                        <Input
                                            type="number"
                                            color="purple"
                                            placeholder="Costo"
                                            onChange={handleprice}
                                            name="costo"
                                            required
                                        />
                                    </div>
                                    <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                                    <Input
                                        type="number"
                                        color="purple"
                                        placeholder="Cantidad"
                                        onChange={handleamount}
                                        name="cantidad"
                                        required
                                    />
                                </div>
                                    
                                    
                                </div>

                                
                                <div className="flex flex-wrap mt-10">
                                    <div className="w-full lg:w-12/12 mb-10 font-light">
                                    <label className="w-full flex flex-col items-center px-4 py-6 bg-white rounded-lg  tracking-wide uppercase  cursor-pointer ">
                                                <svg
                                                  className="w-8 h-8 text-pink-600"
                                                  fill="currentColor"
                                                  xmlns="http://www.w3.org/2000/svg"
                                                  viewBox="0 0 20 20"
                                                >
                                                  <path d="M16.88 9.1A4 4 0 0 1 16 17H5a5 5 0 0 1-1-9.9V7a3 3 0 0 1 4.52-2.59A4.98 4.98 0 0 1 17 8c0 .38-.04.74-.12 1.1zM11 11h3l-4-4-4 4h3v3h2v-3z" />
                                                </svg>
                                                <span className="mt-2 text-base leading-normal">
                                                  Selecciona un Video
                                                </span>

                                                <input
                                                  type="file"
                                                  className="hidden"
                                                  accept='.mp4,.h.264,.mov,.mkv'
                                                  onChange={ValidaHub}
                                                  required
                                                />
                                              </label>
                                    </div>
                                </div>
                            </form>
                        </CardBody>
                    </Card>
                </TabPane>
                <TabPane active={openTab === 2 ? true : false}>
                <ImageForm></ImageForm>
                </TabPane>
            </TabContent>
            {/* </Tab> */}
                </ModalBody>
                 </Modal>}
        </nav>
    );
}
