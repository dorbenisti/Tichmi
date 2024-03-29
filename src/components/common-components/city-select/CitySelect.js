import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import EntitySelect from "../entity-select/EntitySelect";
import ServerDataCache from "../entity-select/ServerDataCache";

var citiesCache = new ServerDataCache('/api/cities');

export default class CitySelect extends Component {
    
    render() {
        const { onChange, value } = this.props;

        return (
            <EntitySelect onChange={onChange} value={value} valuesCache={citiesCache} labelText="עיר"/>
        );
    }

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number
    };
}