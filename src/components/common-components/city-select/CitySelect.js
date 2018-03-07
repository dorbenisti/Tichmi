import React, { Component } from 'react';
import axios from 'axios';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import PropTypes from "prop-types";

var CITIES = null;

export default class CitySelect extends Component {

    constructor(props) {
        super(props);

        this.state = {
            cities: CITIES
        }
    }

    componentDidMount() {
        if (this.state.cities) {
            this.props.onChange(this.state.cities[0]);
            return;
        }

        axios.get('/api/cities').then(res => {
            CITIES = res.data;

            this.setState({
                cities: CITIES
            });

            this.props.onChange(CITIES[0]);
        });
    }

    render() {
        const { cities } = this.state;
        const { onChange, value } = this.props;

        if (!cities) return (<div>Loading...</div>)

        let currValue = cities[0];
        if (typeof value === 'number') {
            currValue = cities.find(c => c.id === value);
        }

        return (
            <SelectField
                floatingLabelText="עיר"
                value={currValue}
                onChange={(_, __, value) => onChange(value)}>

                { cities.map(city => (
                    <MenuItem key={city.id} value={city} primaryText={city.name}/>
                )) }
            </SelectField>
        );
    }

    static propTypes = {
        onChange: PropTypes.func.isRequired,
        value: PropTypes.number
    };
}