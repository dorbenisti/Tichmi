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
        
        valuesCache.GetData.then(values => {
            this.setState({
                values
            });

            onChange(multiple ? [] : values[0]);
        });
    }

    // TODO: Move this to proptypes
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
        valuesCache: PropTypes.instanceOf(ServerDataCache).isRequired,
        labelText: PropTypes.string.isRequired,
        onChange: PropTypes.func.isRequired,
        value: ensureValueMatchesMultiple,
        multiple: PropTypes.bool
    };

    static defaultProps = {
        multiple: false,
        value: null
    };
}


function ensureValueMatchesMultiple(props, propName, componentName) {
    const { value } = props;

    if (!value) return;

    if (props.multiple) {
        if (!Array.isArray(value) ||
            value.some(val => typeof val !== 'number')) {
                return new Error(
                    'Invalid prop `' + propName + '` supplied to' +
                    ' `' + componentName + '`. multiple=true and therefore it must be either undefined or array of numbers.'
                  );
            }
    } else {
        if (typeof value !== 'number') {
            return new Error(
                'Invalid prop `' + propName + '` supplied to' +
                ' `' + componentName + '`. multiple=false and therefore it must be either undefined or number.'
              );
        }
    }
}
/*
customProp: function(props, propName, componentName) {
    if (!/matchme/.test(props[propName])) {
      return new Error(
        'Invalid prop `' + propName + '` supplied to' +
        ' `' + componentName + '`. Validation failed.'
      );
    }
  },
*/