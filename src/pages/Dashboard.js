import StatusCard from '../components/StatusCard';
  import PageVisitsCard from '../components/PageVisitsCard';
import TrafficCard from '../components/TrafficCard';
import Sidebar from '../components/Sidebar';
import {useEffect} from 'react';
const { create, urlSource  } = require('ipfs-http-client')
const ipfs = create({ host: 'ipfs.infura.io', port: '5001', apiPath: '/ipfs/api/v0' })
export default function Dashboard() {
    
   

    useEffect(() => {
        (async () => {
        
            try {
                window.ethereum._metamask.isUnlocked().then(function(value) {
                  if (value) {
                    console.log("Abierto");
                     
                  } else {
                    console.log("Cerrado");
                    window.location.href = "/";
                  }
                });
              } catch (error) {
                console.log("e" + error);
              }

              const file = await ipfs.get("QmUBMFa55ETskbqpYLEW2CWXvsLy6Vu5pAAuaWzAtoXqWo")
              console.log(file)
/* 
              ipfs
              .add(Buffer("reader.result"), { onlyHash: true })
              .then(async (result) => {
               console.log(result);
               
              }); */
      /*    await isUnlocked();
     if(!localStorage.getItem("isunlocked")){
         console.log(localStorage.getItem("isunlocked"))
         setloginbuttontext("Login") ;
     }else  setloginbuttontext("Mi dash") ; */
        
        })();
      }, []);
    return (
        <><Sidebar/>
            <div className="md:ml-64"> 
                    <div className="bg-primary px-3 md:px-8 h-40" />

                    <div className="px-3 md:px-8 -mt-24">
                        <div className="container mx-auto max-w-full">
                            <div className="grid grid-cols-1 xl:grid-cols-5">
                                <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                                    
                                </div>
                                <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                                  
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="px-3 md:px-8">
                        <div className="container mx-auto max-w-full">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-4 mb-4">
                                <StatusCard
                                    color="pink"
                                    icon="trending_up"
                                    title="Traffic"
                                    amount="350,897"
                                    percentage="3.48"
                                    percentageIcon="arrow_upward"
                                    percentageColor="green"
                                    date="Since last month"
                                />
                                <StatusCard
                                    color="orange"
                                    icon="groups"
                                    title="New Users"
                                    amount="2,356"
                                    percentage="3.48"
                                    percentageIcon="arrow_downward"
                                    percentageColor="red"
                                    date="Since last week"
                                />
                                <StatusCard
                                    color="purple"
                                    icon="paid"
                                    title="Sales"
                                    amount="924"
                                    percentage="1.10"
                                    percentageIcon="arrow_downward"
                                    percentageColor="orange"
                                    date="Since yesterday"
                                />
                                <StatusCard
                                    color="blue"
                                    icon="poll"
                                    title="Performance"
                                    amount="49,65%"
                                    percentage="12"
                                    percentageIcon="arrow_upward"
                                    percentageColor="green"
                                    date="Since last month"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="px-3 md:px-8 h-auto">
                <div className="container mx-auto max-w-full">
                    <div className="grid grid-cols-1 xl:grid-cols-5">
                        <div className="xl:col-start-1 xl:col-end-4 px-4 mb-14">
                            <PageVisitsCard />
                        </div>
                        <div className="xl:col-start-4 xl:col-end-6 px-4 mb-14">
                            <TrafficCard />
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </>
    );
}
