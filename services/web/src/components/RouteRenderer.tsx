import React from 'react'
import { Switch, Route } from 'react-router-dom'
import routes from '../helpers/routes'

function RouteRenderer() {
    return (
        <Switch>
            {routes.map((route) => (
                <Route exact path={route.path}>
                    <route.component />
                </Route>
            ))}
        </Switch>
    )
}

export default RouteRenderer
