import React from 'react';
import {Router, Redirect,IndexRoute,HashRouter, Route, Switch} from 'react-router-dom';
import Home from './home';
import Login from '../admin/login';
import Register from '../admin/register';
import Appointment from '../router/visiter/appointment';
import ViewHome from '../router/view/index';
import SignIn from '../router/visiter/signIn'
import SignOff from '../router/visiter/signOff'
import DirectVisit from '../router/visiter/directvisit'


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Home}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={Register}/>
            <Route exact path="/appointment" component={Appointment}/>
            <Route exact path="/directvisit" component={DirectVisit}/>
            <Route exact path="/signIn" component={SignIn}/>
            <Route exact path="/signOff" component={SignOff}/>
            <Route path="/viewhome" component={ViewHome}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;