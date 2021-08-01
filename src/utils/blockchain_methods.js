import Web3 from "web3";
import {useState} from 'react' 
const ipfsClient = require("ipfs-http-client");

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
  ],
  nets = Object.assign(
    ...nets.map(({ chainId, data }) => ({ [chainId]: data }))
  );

export var nets;

/**
 *nos permite inicializar la instancia de web3, ipfs etc
 * @returns regresa true si tiene metamask si no es asi regresa false
 */
 export function init() {
    try {
      if (window.ethereum || window.web3) {
        window.web3 = new Web3(window.ethereum);
        window.ipfs = ipfsClient({
          host: "ipfs.infura.io",
          port: 5001,
          protocol: "https",
        });
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
 * agrega o cambia la red con el chainid que le mandes
 * si se le manda el chainid de la red que tiene el usario seleccionada no hace nada
 * @param {int} id es el chainid de la blockchain
 */

 export async function addNetwork(id) {
    try {
       //obtener el arreglo con los datos de la red
    let networkData = nets[id];
    if (!networkData) return "no existe esa red";
    // agregar red o cambiar red
    return window.ethereum.request({
      method: "wallet_addEthereumChain",
      params: networkData,
    });
    } catch (error) {
      console.error(error);
    }
   
  }

/**
 * agrega o cambia la red con el chainid que le mandes
 * si se le manda el chainid de la red que tiene el usario seleccionada no hace nada
 * @param {int} id es el chainid de la blockchain
 */

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
                  window.location.href = "/dashboard";
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
  