import React, {createContext,useState,useEffect} from 'react';

export const AuthContext = createContext();

// eslint-disable-next-line import/no-anonymous-default-export
export default ({ children })=>{
    const [user,setUser] = useState(null);
    const [networkstate,setnetworkstate] = useState(97);

    const [isAuthenticated,setIsAuthenticated] = useState(false);
    const [isLoaded,setIsLoaded] = useState(true);

     

    return (
        <div>
            {!isLoaded ? <h1 style={{"margin":"0 auto","textAlign":"center","borderRadius":"10px","border": "1px solid #666666","width": "500px"}}>Loading</h1> : 
            <AuthContext.Provider value={{user,setUser,isAuthenticated,setIsAuthenticated,networkstate,setnetworkstate}}>
                { children }
            </AuthContext.Provider>}
        </div>
    )
}