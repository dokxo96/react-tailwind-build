import axios from "axios";
export const baseURL= "http://localhost:5000/";



// TODO: Dummy service - delete this.
export  const  login = (user) => {
    console.log(user);
  
      try {
        axios.post(baseURL+ '/login', {
            username: user.username,
            password: user.password
          })
          .then((response) => {
            window.alert(response.data);
            window.localStorage.setItem("id",response.data.id);
            window.localStorage.setItem("id",response.data.id);
            window.localStorage.setItem("id",response.data.id);

          }, (error) => {
         //   console.log(error);
          });

        
      } catch (error) {
       // console.error( error);
         
      }

  };
  export  const  deltegrup = (id) => {
    console.log(id);
  
      try {
        axios.delete(baseURL+'grupos/delete?id='+id)
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

  export  const  addgrupo = (grupo) => {
   
  
      try {
        axios.post(baseURL+'grupos/add', grupo)
        .then((res) => {
            console.log('grupo agreggado!');
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
      axios.put(baseURL+'grupos/update',o)
      .then((res) => {
          console.log('grupo editado!');
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