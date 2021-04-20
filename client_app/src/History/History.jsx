import React, { lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
// import MainHistory from './Component/MainHistory';
// import DetailHistory from './Component/DetailHistory';


const MainHistory = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(import("./Component/MainHistory")), 2000);
    });
});

const DetailHistory = lazy(() => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(import("./Component/DetailHistory")), 2000);
    });
});

function History(props) {
    return (
        <Suspense>
            <Switch>
                <Route exact path='/history' component={MainHistory} />
                <Route path='/history/:id' component={DetailHistory} />
            </Switch>
        </Suspense>

    );
}

export default History;