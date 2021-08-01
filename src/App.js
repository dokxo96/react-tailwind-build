 import './App.css';
import { Switch, Route } from 'react-router-dom';

import Register from './pages/Register';

function App() {
  return (
    <>
            
    <div  >
        <Switch>
         
            <Route exact path="/" component={Register} />
 
        </Switch>
        
    </div>
</>
);
}

export default App;
