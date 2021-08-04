import axios from "axios";
import {baseURL} from 'services/API'



  export  const  borrar = (id) => {
    console.log(id);
  
      try {
        axios.delete(baseURL+'producto_sat/delete?id='+id)
        .then((res) => {
            console.log('Producto_Sat eliminado!');
             window.location.reload()
        }).catch((error) => {
            console.log(error)
        });

        
      } catch (error) {
       // console.error( error);
         
      }

  };

  export  const  añadir = (grupo) => {
   
  window.alert(grupo)
      try {
        axios.post(baseURL+'producto_sat/add', grupo)
        .then((res) => {
            console.log('producto_sat agreggado!');
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
  export  const  editar = (o) => {
   
  
    try {
      axios.put(baseURL+'producto_sat/update',o)
      .then((res) => {
          console.log('producto_sat editado!');
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
      axios.delete(baseURL+'producto_sat/findbyid?id='+id)
      .then((res) => {
          console.log('producto_sat eliminado!');
           window.location.reload()
      }).catch((error) => {
          console.log(error)
      });

      
    } catch (error) {
     // console.error( error);
       
    }

};