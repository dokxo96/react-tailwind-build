/* eslint-disable import/no-anonymous-default-export */
import axios from "axios";
const URI= "http://localhost:5000/";

 
export default {
  
  login: async (user) => {
    console.log(user);
    const res = await fetch( URI  + "usuarios/login", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    }).then(response => response.json())
    .then(data => {return data;});
    
     
  },
  register: async (user) => {
    console.log(user);
    const res = await fetch({ URI } + "/user/register", {
      method: "post",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await res.json();
    return data;
  },
  logout: async () => {
    const res = await fetch({ URI } + "/user/logout");
    const data = await res.json();
    return data;
  },
  isAuthenticated: async () => {
    const res = await fetch({ URI } + "/user/authenticated");
    if (res.status !== 401) {
      return res.json().then((data) => data);
    } else {
      return { isAuthenticated: false, user: { username: "", role: "" } };
    }
  },
  getUserData: async (username) => {
    console.log(username);
    const res = await fetch({ URI } + "/user/getusername/" + username);
    const data = await res.json();
    return data;
  },
  SetUserData: async (data) => {
    const res = await fetch({ URI } + "/user/userupdate", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    if (res.status !== 401)
      return res.json().then((data_1) => data_1);

    else
      return {
        msgbody: {
          message: "no existe el correo  o es cuenta de red social",
        },
      };
  },
  DoesUserExist: async (username) => {
    console.log(username);
    const res = await fetch({ URI } + "/user/usernameexist/" + username);
    const data = await res.json();
    return data;
  },
  AccountReset: async (username) => {
    const res = await fetch({ URI } + "/user/accountreset/" + username);
    const data = await res.json();
    return data;
  },
  validToken: async (data) => {
    const res = await fetch({ URI } + "/user/reset", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data_1 = await res.json();
    return data_1;
  },

  Activate: async (token) => {
    const res = await fetch({ URI } + "/user/activate/" + token);
    const data = await res.json();
    return data;
  },
  getInmuebles: async () => {
    const res = await fetch({ URI } + "/inmueble/getall");
    const data = await res.json();
    return data;
  },
  deleteInmueble: async (data) => {
    const res = await fetch({ URI } + "/inmueble/delete", {
      method: "delete",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data_1 = await res.json();
    return data_1;
  },
  createInmueble: async (data) => {
    const res = await fetch({ URI } + "/inmueble/create", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data_1 = await res.json();
    return data_1;
  },
  updateInmueble: async (data) => {
    const res = await fetch({ URI } + "/inmueble/update", {
      method: "put",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data_1 = await res.json();
    return data_1;
  },
  getMyInmuebles: async (data) => {
    const res = await fetch({ URI } + "/inmueble/getownerinms", {
      method: "post",
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data_1 = await res.json();
    return data_1;
  },
  getInmForSale: async () => {
    const res = await fetch({ URI } + "/inmueble/inmforsale", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(res);
    const data = await res.json();
    return data;
  },
}   
