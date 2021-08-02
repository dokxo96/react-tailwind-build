import Web3 from "web3";
import ValidafySM from "../utils/Valid.json";
import { Link } from 'react-router-dom';

const { create } = require('ipfs-http-client');
//contiene todas las redes que puede manejar validafy
var nets = [
    {
      chainId: 56,
      data: [
        {
          chainId: "0x38",
          chainName: "BSCMAINET",
          rpcUrls: ["https://bsc-dataseed1.binance.org"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://bscscan.com/"],
        },
      ],
    },
    {
      chainId: 97,
      data: [
        {
          chainId: "0x61",
          chainName: "BSCTESTNET",
          rpcUrls: ["https://data-seed-prebsc-1-s1.binance.org:8545"],
          nativeCurrency: {
            name: "BINANCE COIN",
            symbol: "BNB",
            decimals: 18,
          },
          blockExplorerUrls: ["https://testnet.bscscan.com/"],
        },
      ],
    },
    {
      chainId: 30,
      data: [
        {
          chainId: "0x1E",

          chainName: "RSK Mainnet",
          rpcUrls: ["https://public-node.rsk.co"],
          nativeCurrency: {
            name: "RBTC",
            symbol: "RBTC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer.rsk.co"],
        },
      ],
    },
    {
      chainId: 31,
      data: [
        {
          chainId: "0x1F",

          chainName: "RSK Testnet",
          rpcUrls: ["https://public-node.testnet.rsk.co"],
          nativeCurrency: {
            name: "tRBTC",
            symbol: "tRBTC",
            decimals: 18,
          },
          blockExplorerUrls: ["https://explorer.rsk.co"],
        },
      ],
    },
  ],
  nets = Object.assign(
    ...nets.map(({ chainId, data }) => ({ [chainId]: data }))
  );

export var nets;
/**
 * agrega o cambia la red con el chainid que le mandes
 * si se le manda el chainid de la red que tiene el usario seleccionada no hace nada
 * @param {int} id es el chainid de la blockchain
 */

export async function addNetwork(id) {
  //obtener el arreglo con los datos de la red
  let networkData = nets[id];
  if (!networkData) return "no existe esa red";
  // agregar red o cambiar red
  return window.ethereum.request({
    method: "wallet_addEthereumChain",
    params: networkData,
  });
}
/**
 *nos permite inicializar la instancia de web3, ipfs etc
 * @returns regresa true si tiene metamask si no es asi regresa false
 */
export function init() {
  try {
    if (window.ethereum || window.web3) {
      window.web3 = new Web3(window.ethereum);
      window.ipfs = create({ host: 'ipfs.infura.io', port: '5001', protocol: 'https' })
      if (!localStorage.getItem("network")) localStorage.setItem("network", 97);

      return true;
    } else {
      return false;
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 *
 * @returns {bool} if the current network have been deployed the smart contract will return true otherwise false
 */
export async function isDeployed() {
  try {
    //get the actual networkid or chainid
    let ActualnetworkId = await window.ethereum.request({
      method: "net_version",
    });

    //check if we have the actualnetwork on our validafysm abi
    let nets = Object.keys(ValidafySM.networks);
    return nets.includes(ActualnetworkId.toString());
  } catch (error) {
    console.error(error);
  }
}

export async function sameNetwork() {
  try {
    //get the actual networkid or chainid
    let ActualnetworkId = await window.ethereum.request({
      method: "net_version",
    });

    //check if the stored network is the same as the selected
    return ActualnetworkId == parseInt(localStorage.getItem("network"));
  } catch (error) {}
}

/**
 * with this function we will pause the execution of code , sended as parameter
 * @param {int} miliseconds es el numero de milisegundos a esperar
 */
export function wait(miliseconds) {
  try {
    var start = new Date().getTime();
    for (var i = 0; i < 1e7; i++) {
      if (new Date().getTime() - start > miliseconds) {
        break;
      }
    }
  } catch (error) {
    console.error(error);
  }
}

/**
 * con este metodo podemos obtener el url del explorer
 * @returns {String} es el url de la explorer de esa red
 */

export function getExplorerUrl() {
  try {
    return (
      nets[parseInt(localStorage.getItem("network"))][0].blockExplorerUrls +
      "tx/"
    );
  } catch (error) {
    return console.error(error);
  }
}

export function getNetworkName() {
  return nets[parseInt(localStorage.getItem("network"))][0].chainName;
}
export async function loadweb3() {
    
  try {
    init();
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum);
        if (await window.ethereum.enable()) {
          


          try {
              const web3 = window.web3;
              // Load account
              const accounts = await web3.eth.getAccounts();
              localStorage.setItem("account", accounts[0])
               
               
              const networkId = await web3.eth.net.getId();
        
              if (localStorage.getItem("account") != null) {
                console.log(localStorage.getItem("account"));
        
                //se sale del bucle hasta que agregue la red
                let data = false;
                while (data != null) {
                  wait(200);
                  data = await addNetwork(
                    parseInt(localStorage.getItem("network"))
                  ).catch((err) => {
                    return err;
                  });
                }
                <Link
                to= "/dashboard"
              />
                
              
                
              } else {
                window.alert("Error de red,Selecciona la red de BSC para seguir.");
              }
            } catch (error) {
              //console.error(error)
            }


        }
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider);
      } else {
        window.alert(
          "No se ha detectado un navegador compatible con ethereum,prueba instalando la extension de MetaMask!"
        );
        window.location.href = "https://metamask.io/download";
      }
    } catch (error) {
      console.error(error);
      window.location.reload();
    }
}
export async function isUnlocked() {
 
  try {
    
      window.ethereum._metamask.isUnlocked().then(function(value) {
          
        if (value) {
          console.log("Abierto");
          localStorage.setItem("isunlocked", true);
          
        } else {
          console.log("Cerrado");
          localStorage.setItem("isunlocked", false);

        }
      
      });
    
    } catch (error) {
      console.log("e" + error);
    }
   
}
