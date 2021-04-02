import React from 'react';
import PropTypes from 'prop-types';
import { Switch, Route } from 'react-router-dom'
import MainHistory from './Component/MainHistory';
import DetailHistory from './Component/DetailHistory';

History.propTypes = {

};

function History(props) {
    return (
        <Switch>

            <Route exact path='/history' component={MainHistory} />
            <Route path='/history/:id' component={DetailHistory} />

        </Switch>
    );
}

export default History;