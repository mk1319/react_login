import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Switch,  
  Redirect
} from "react-router-dom";
import './App.css'

import Logout from './componet/logut'
import LoginPage from './componet/LoginComponent'
import Admin from './componet/admin'
import autent from './componet/auth'







const ProtectedRouter=({component:Component,...rest})=>(
  
<Route {...rest} render={(props)=>(
  autent.isLogin===true?<Component  {...props}/>:<Redirect to="/" />
)}/>)



function App() {
  return (
    <div className="App">
    <Router>
        <Switch>
       
          <Route path="/" exact  component={LoginPage}/>
          <ProtectedRouter path="/logout"  component={Logout}/>
          <ProtectedRouter path="/admin" component={Admin} />
          </Switch>
    </Router>
    </div>
  );
}

export default App



