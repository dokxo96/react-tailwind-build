import StatusCard from 'components/StatusCard';
import TableCard from 'components/TableCard';
import Sidebar from 'components/Sidebar';
import not404 from 'components/notfound';
import H2 from '@material-tailwind/react/Heading2';
import LeadText from '@material-tailwind/react/LeadText';
import { useEffect } from 'react';


export default function Dashboard() {

    useEffect(() => {
        (async () => {

            setTimeout(function(){ 
                
                window.location.href = "/";
             }, 5000);
          
        })();
      }, []); 


    return (
        <>
        <Sidebar/>
        <div className="md:ml-64">
            <div className="bg-light-blue-500 pt-14 pb-28 px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    
                    <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
                        <H2 color="white">404</H2>
                        <div className="text-gray-200">
                            <LeadText color="gray-200">
                               Es posible que el enlace esté roto o que se haya eliminado la página. Verifica que el enlace que quieres abrir es correcto.
                            </LeadText>
                       
                    </div>    
                      
                    
                    </div>
                </div>
            </div>
 
            </div>
        </>
    );
}
