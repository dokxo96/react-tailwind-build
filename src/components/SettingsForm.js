import Card from '@material-tailwind/react/Card';
import CardHeader from '@material-tailwind/react/CardHeader';
import CardBody from '@material-tailwind/react/CardBody';
import Button from '@material-tailwind/react/Button';
import Input from '@material-tailwind/react/Input';
import Textarea from '@material-tailwind/react/Textarea';
import {useEffect,useState } from 'react'
import axios from 'axios'
import {baseURL} from 'services/API'


export default function SettingsForm() {

    const [data,setData] = useState({
        id:"", 
        first_name:"",
        last_name:"",
        username:"",
        password:"",
        roles:"",
        permissions:"",
    });
                useEffect(() => {
                   axios.get(baseURL+'usuarios/findUser',{ params: { id: localStorage.getItem('id') } })
                    .then(response => {
                    console.log(response.data)
                    var d=response.data;
                        setData({
                            id:d.id,
                            first_name:d.first_name,
                            last_name:d.last_name,
                            username:d.username,
                            password:d.password,
                            roles:d.roles,
                            permissions:d.permissions
                        })
                    })
                    .catch(e => {
                    // Capturamos los errores
                    })
            },[])

    return (
        <Card>
            <CardHeader color="blue" contentPosition="none">
                <div className="w-full flex items-center justify-between">
                    <h2 className="text-white text-2xl">Mi cuenta</h2>
                   
                </div>
            </CardHeader>
            <CardBody>
                <form>
                    <h6 className="text-purple-500 text-sm mt-3 mb-6 font-light uppercase">
                        Información de usuario
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Usuario"
                                value={data.username}
                                
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="password"
                                color="purple"
                                placeholder="Contraseña"
                                value={data.password}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="First Name"
                                value={data.first_name}
                            />
                        </div>
                        <div className="w-full lg:w-6/12 pl-4 mb-10 font-light">
                            <Input
                                type="email"
                                color="purple"
                                placeholder="Last Name"
                                value={data.last_name}
                            />
                        </div>
                    </div>

                    <h6 className="text-purple-500 text-sm my-6 font-light uppercase">
                        Acessos
                    </h6>
                    <div className="flex flex-wrap mt-10">
                        <div className="w-full lg:w-12/12 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Rol"
                                value={data.roles}
                            />
                        </div>
                        <div className="w-full lg:w-4/12 pr-4 mb-10 font-light">
                            <Input
                                type="text"
                                color="purple"
                                placeholder="Permisos"
                                value={data.permissions}
                            />
                        </div>
                        
                    </div>

                    
                </form>
            </CardBody>
        </Card>
    );
}
