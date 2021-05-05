import React from 'react';
import {useDispatch,useSelector} from 'react-redux';
import { Redirect, Route, Switch } from "react-router-dom";
// Routing Component
import { routes } from '../route';


function Container(props) {
    const loginUserInfo=useSelector(state=>state.user.loginUserInfo);
    const loginUserToken=useSelector(state=>state.user.loginUserToken);
    const token=localStorage.getItem('token');
    if(token){
        
    }else{
        props.history.push('/login');
    }

    return (
        <React.Fragment>
            <Switch>
                {routes.map((route, key) => {
                    if (route.exact) {
                        return (
                            <Redirect
                                key={key}
                                exact
                                path={route.path}
                                render={(props) => {
                                    return (
                                        <route.component
                                            {...props}
                                            pageName={route.pageName}
                                        />
                                    );
                                }}
                            />
                        );
                    } else if (route.to) {
                        return (
                            <Redirect
                                key={key}
                                exact
                                path={route.path}
                                to={route.to}
                                render={(props) => {
                                    return (
                                        <route.component
                                            {...props}
                                            pageName={route.pageName}
                                        />
                                    );
                                }}
                            />
                        );
                    } else {
                        return (
                            <Route
                                key={key}
                                exact
                                path={route.path}
                                render={(props) => {
                                    return (
                                        <route.component
                                            {...props}
                                            pageName={route.pageName}
                                        />
                                    );
                                }}
                            />
                        );
                    }
                })}
            </Switch>
        </React.Fragment>
    )
}
export default Container