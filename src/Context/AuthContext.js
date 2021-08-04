import React, {createContext,useState,useEffect} from 'react';
import AuthService from '../Services/AuthService';

export const AuthContext = createContext();

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(false);

    useEffect(()=>{
        AuthService.isAuthenticated().then(data =>{
            setUser(data.user);
            setIsAuthenticated(data.isAuthenticated);
            setIsLoaded(true);
        });
    },[]);

    return (
        <div>
            {!isLoaded ? <h1 style={{"margin":"0 auto","textAlign":"center","borderRadius":"10px","border": "1px solid #666666","width": "500px"}}>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}