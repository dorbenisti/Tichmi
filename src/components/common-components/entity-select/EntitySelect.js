import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from "prop-types";

import ServerDataCache from "./ServerDataCache";

export default class EntitySelect extends Component {
    
    constructor(props) {
        super(props);

        this.state = {
            values: null
        };
    }

    componentDidMount() {
        const { onChange, valuesCache, multiple } = this.props;

        const callback = values => {

            this.setState({
                values
            });

            onChange(multiple ? [] : values[0]);
        };
        
        valuesCache.GetOrFetchData(callback, err => {});
    }

    componentWillReceiveProps(nextProps) {
        const { value, multiple } = nextProps;

        if (value === null) return;

        if (multiple && typeof value === 'number') throw new Error('When multiple=true, value should be number');
        if (!multiple && typeof value !== 'number') throw new Error('When multiple=false, value should be Array<number>');
    }

    render() {

        const { values } = this.state;

        if (!values) return (<div>Loading...</div>);

        const { onChange, value, labelText, multiple } = this.props;

        let currValue;

        if (multiple) {
            currValue = [];
            if (value !== null) {
                currValue = values.filter(e => value.some(v => v === e.id));
            }
        } else {
            currValue = values[0];
            if (value !== null) {
                currValue = values.find(e => e.id === value);
            }
        }

        return (
            <SelectField
                floatingLabelText={labelText}
                value={currValue}
                multiple={multiple}
                selectedMenuItemStyle={{ textDecoration: 'underline', color: '#6495ED' }}
                onChange={(_, __, value) => onChange(value)}>

                { values.map(value => (
                    <MenuItem key={value.id} value={value} primaryText={value.name}/>
                )) }
            </SelectField>
        );
    }

    static propTypes = {
        valuesCache: PropTypes.instanceOf(ServerDataCache),
        labelText: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: PropTypes.oneOfType([PropTypes.arrayOf(PropTypes.number), PropTypes.number]),
        multiple: PropTypes.bool
    };

    static defaultProps = {
        multiple: false,
        value: null
    };
}