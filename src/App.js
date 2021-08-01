import { Switch, Route, Redirect } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './pages/Dashboard';
import Posts from './pages/Posts';
import Settings from './pages/Settings';
import Tables from './pages/Tables';
import Maps from './pages/Maps';
import Footer from './components/Footer';
import landing from './pages/Landing';
import profile from './pages/Profile';
import Login from './pages/Login';
import Register from './pages/Register';
import not404 from './pages/not404';
// Tailwind CSS Style Sheet
import './assets/styles/tailwind.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'

function App() {
    return (
        <>
            
            <div  >
                <Switch>
                    <Route exact path="/" component={landing} />
                    <Route exact path="/login" component={Login} />
                    <Route exact path="/register" component={Register} />

                    <Route exact path="/dashboard" component={Dashboard} />
                    <Route exact path="/posts" component={Posts} />
                    <Route exact path="/settings" component={Settings} />
                    <Route exact path="/tables" component={Tables} />
                    
                    <Route exact path="/profile" component={profile} />
                    <Route  from="/notfound" component={not404} />
                    <Redirect from="*" to="/notfound" />
                </Switch>
                
            </div>
        </>
    );
}

export default App;
