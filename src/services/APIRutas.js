import axios from "axios";
import {baseURL} from 'services/API'



  export  const  borrar = (id) => {
    console.log(id);
  
      try {
        axios.delete(baseURL+'rutas/delete?id='+id)
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

  export  const  añadir = (grupo) => {
   
  
      try {
        axios.post(baseURL+'rutas/add', grupo)
        .then((res) => {
            console.log('rutas agreggado!');
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
 
     await  axios.put(baseURL+'rutas/update',o)
      .then((res) => {
          console.log('ruta editado!');
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