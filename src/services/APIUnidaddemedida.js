import axios from "axios";
import {baseURL} from 'services/API'



  export  const  borrar = (id) => {
    console.log(id);
  
      try {
        axios.delete(baseURL+'unidad_de_medida/delete?id='+id)
        .then((res) => {
            console.log('unidad_de_medida eliminado!');
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
        axios.post(baseURL+'unidad_de_medida/add', grupo)
        .then((res) => {
            console.log('unidad_de_medida agreggado!');
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
      axios.put(baseURL+'unidad_de_medida/update',o)
      .then((res) => {
          console.log('unidad_de_medida editado!');
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
      axios.delete(baseURL+'unidad_de_medida/findbyid?id='+id)
      .then((res) => {
          console.log('unidad_de_medida eliminado!');
           window.location.reload()
      }).catch((error) => {
          console.log(error)
      });

      
    } catch (error) {
     // console.error( error);
       
    }

};