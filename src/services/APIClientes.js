import axios from "axios";
import {baseURL} from 'services/API'



  export  const  borrar = (id) => {
    console.log(id);
  
      try {
        axios.delete(baseURL+'clientes/delete?id='+id)
        .then((res) => {
            console.log('cliente eliminado!');
             window.location.reload()
        }).catch((error) => {
            console.log(error)
        });

        
      } catch (error) {
       // console.error( error);
         
      }

  };

  export  const  añadir = (grupo) => {
   
   
      try {
        axios.post(baseURL+'clientes/add', grupo)
        .then((res) => {
            console.log('cliente agreggado!');
            window.location.reload();
             return res;
        }).catch((error) => {
            console.log(error)
            return;
        });

        
      } catch (error) {
       // console.error( error);
         
      }

  };
  export  const  editar = async(o) => {
   
  
    try {
 
     await  axios.put(baseURL+'clientes/update',o)
      .then((res) => {
          console.log('cliente editado!');
          window.location.reload();
           return res;
      }).catch((error) => {
          console.log(error)
          return;
      });

      
    } catch (error) {
     // console.error( error);
       
    }

};
export  const  buscar = (id) => {
  

    try {
      axios.delete(baseURL+'rutas/findbyid?id='+id)
      .then((res) => {
          console.log('rutas eliminado!');
           window.location.reload()
      }).catch((error) => {
          console.log(error)
      });

      
    } catch (error) {
     // console.error( error);
       
    }

};