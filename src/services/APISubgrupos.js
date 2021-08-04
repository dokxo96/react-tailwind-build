import axios from "axios";
import {baseURL} from 'services/API'



  export  const  del = (id) => {
    console.log(id);
  
      try {
        axios.delete(baseURL+'subgrupos/delete?id='+id)
        .then((res) => {
            console.log('subgrupo eliminado!');
             window.location.reload()
        }).catch((error) => {
            console.log(error)
        });

        
      } catch (error) {
       // console.error( error);
         
      }

  };

  export  const  add = (grupo) => {
   
  
      try {
        axios.post(baseURL+'subgrupos/add', grupo)
        .then((res) => {
            console.log('subgrupo agreggado!');
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
  export  const  edit = (o) => {
   
  
    try {
      axios.put(baseURL+'subgrupos/update',o)
      .then((res) => {
          console.log('subgrupo editado!');
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
export  const  find = (id) => {
  

    try {
      axios.delete(baseURL+'grupos/findbyid?id='+id)
      .then((res) => {
          console.log('grupo eliminado!');
           window.location.reload()
      }).catch((error) => {
          console.log(error)
      });

      
    } catch (error) {
     // console.error( error);
       
    }

};