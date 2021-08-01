/* eslint-disable jsx-a11y/anchor-is-valid */
import React from "react";
import { createPopper } from "@popperjs/core";
import {
  addNetwork,
  isDeployed,
  getNetworkName,
  sameNetwork,
  wait,
} from "../utils/interaction_blockchain";

const Dropdown = ({ color }) => {
  // dropdown props
  const [dropdownPopoverShow, setDropdownPopoverShow] = React.useState(false);
  const btnDropdownRef = React.createRef();
  const popoverDropdownRef = React.createRef();
  const openDropdownPopover = () => {
    createPopper(btnDropdownRef.current, popoverDropdownRef.current, {
      placement: "bottom-end",
    });
    setDropdownPopoverShow(true);
  };
  const closeDropdownPopover = () => {
    setDropdownPopoverShow(false);
  };
  async function changeNet(id) {
    //se sale del bucle hasta que la red the metamask y la llave network en localstorage son identicas
    localStorage.setItem("network", id);
    while (!(await sameNetwork())) {
      //espera 200 milisegundo para volver a llamar addNetwork evita que no se muestre el modal de metamask
      wait(200);
      await addNetwork(id).catch();
    }
    window.location.reload();
  }
  // bg colors
  let bgColor;
  color === "yellow"
    ? (bgColor = "bg-yellow-600")
    : (bgColor = "bg-" + color + "-500");
  return (
    <>
      <div className="flex flex-wrap">
        <div className="w-auto  sm:w-6/12 md:w-4/12 px-4">
          <div className="absolute inline-block align-middle w-full">
            <button
              className={
                "text-black font-bold  uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg   focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150 " +
                bgColor
              }
              type="button"
              ref={btnDropdownRef}
              onClick={() => {
                dropdownPopoverShow
                  ? closeDropdownPopover()
                  : openDropdownPopover();
              }}
            >
              {getNetworkName()}
              <i className="fa fa-caret-down opacity-75 uppercase mr-2 text-md"></i>
            </button>
            <div
              ref={popoverDropdownRef}
              className={
                (dropdownPopoverShow ? "block " : "hidden ") +
                "text-base bg-yellow-600 z-50 float-left py-2 list-none text-left rounded shadow-lg mb-1"
              }
              style={{ minWidth: "12rem" }}
            >
              <a
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-black hover:text-white"
                }
                onClick={async () => {
                  await changeNet(97);
                  closeDropdownPopover();
                  console.log(isDeployed());
                }}
              >
                Binance Smart Chain -Testnet
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              <a
               className={
                "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-black hover:text-white"
              }
                onClick={() => {
                  changeNet(56);
                  closeDropdownPopover();
                }}
              >
                Binance Smart Chain -Mainnet
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              <a
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-black hover:text-white"
                }
                onClick={() => {
                  changeNet(31);
                  closeDropdownPopover();
                }}
              >
                RSK-Testnet
              </a>
              <div className="h-0 my-2 border border-solid border-t-0 border-blueGray-800 opacity-25" />
              <a
                
                className={
                  "text-sm py-2 px-4 font-normal block w-full whitespace-nowrap bg-transparent  text-black hover:text-white"
                }
                onClick={() => {
                  changeNet(30);
                  closeDropdownPopover();
                }}
              >
                RSK-Mainnet (Soon)
              </a>
            </div>
            
          </div>
        </div>
      </div>
    </>
  );
};
export default Dropdown;
