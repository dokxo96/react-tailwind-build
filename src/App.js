import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from 'components/Sidebar';
import Dashboard from 'pages/Dashboard';
import Settings from 'pages/Settings';
import Tables from 'pages/Tables';
import Maps from 'pages/Maps';
import Footer from 'components/Footer';
import landing from 'pages/Landing';
import profile from 'pages/Profile';
import Login from 'pages/Login';
import Register from 'pages/Register';
import not404 from 'pages/not404';
import Grupos  from 'pages/Ventas/Capturas/Grupos';
import Subgrupos  from 'pages/Ventas/Capturas/Subgrupos';
import Productos  from 'pages/Ventas/Capturas/Productos_sat';
import Unidad_de_medida from 'pages/Ventas/Capturas/Unidad_de_medida_sat';
import Rutas from 'pages/Ventas/Catalogos/Rutas';
import Clientes from 'pages/Ventas/Catalogos/Clientes';
 // Tailwind CSS Style Sheet
import 'assets/styles/tailwind.css';

 function App() {
    return (
        <>
            
            <div  >
                <Switch>
                    <Route exact path="/" component={Login} />
                    <Route exact path="/register" component={Register} />

                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    <Route exact path="/Ventas/Capturas/Grupos" component={Grupos} />
                    <Route exact path="/Ventas/Capturas/Subgrupos" component={Subgrupos} />
                    <Route exact path="/Ventas/Capturas/Productos" component={Productos} />
 
                    <Route exact path="/Ventas/Capturas/Unidad_de_medida" component={Unidad_de_medida} />
                    <Route exact path="/Ventas/Catalogos/Rutas" component={Rutas} />
                    <Route exact path="/Ventas/Catalogos/Clientes" component={Clientes} />

                    <Route exact path="/profile" component={profile} />
                    <Route  from="/notfound" component={not404} />
                    <Redirect from="*" to="/notfound" />
                </Switch>
               
            </div>
        </>
    );
}

export default App;
