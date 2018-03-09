import React, { Component } from 'react';
import axios from 'axios';
import PropTypes from "prop-types";

import EntitySelect from "../entity-select/EntitySelect";
import ServerDataCache from "../entity-select/ServerDataCache";

var subjectsCache = new ServerDataCache('/api/subjects');

export default class SubjectSelect extends Component {
    
    render() {
        const { onChange, value } = this.props;

        return (
            <EntitySelect onChange={onChange} value={value} valuesCache={subjectsCache} labelText="נושאים" multiple={true} />
        );
    }

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.arrayOf(PropTypes.number)
    };
}