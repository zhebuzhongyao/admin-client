import React from 'react';
import {Switch,Route,BrowserRouter} from 'react-router-dom'
import Login from './pages/login/login';
import Admin from './pages/admin/admin';



export default class App extends React.Component{

render(){
    return(
       <BrowserRouter>
           <Switch>
               <Route path='/' component={Login} />
               <Route path='/admin' component={Admin}/>
           </Switch>
       </BrowserRouter> 
    )
}
}