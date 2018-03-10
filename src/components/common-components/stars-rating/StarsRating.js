import React, { Component } from "react";
import PropTypes from "prop-types";
import StarsRating from 'react-stars-rating';

import styles from "./StarsRating.css";

export default class CustomStarsRating extends Component {
    render() {

        console.log('hey', styles);

        const { rating, disabled, onChange } = this.props;

        return (
            <div className={styles['custom-stars-rating']}>
                <StarsRating rating={rating} disabled={disabled}/>
            </div>
        );
    }

    static propTypes = {
        rating: PropTypes.number.isRequired,
        onChange: PropTypes.func.isRequired,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        disabled: false
    };
}