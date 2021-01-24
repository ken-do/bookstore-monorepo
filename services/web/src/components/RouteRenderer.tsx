import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../helpers/routes'

const RouteRenderer = () => {
    return (
        <Switch>
            {routes.map((route, index) => (
                <Route key={index} exact path={route.path}>
                    <route.component />
                </Route>
            ))}
        </Switch>
    )
}

export default RouteRenderer
