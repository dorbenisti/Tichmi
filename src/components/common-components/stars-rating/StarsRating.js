import React, { Component } from "react";
import PropTypes from "prop-types";
import StarsRating from 'react-stars-rating';
import classNames from "classnames";

import styles from "./StarsRating.css";

export default class CustomStarsRating extends Component {
    render() {
        const { rating, disabled, onChange, className, ...rest } = this.props;

        const classes = [
            styles['custom-stars-rating'],
            {
                [styles['disabled']]: disabled
            }
        ];

        return (
            <div className={classNames(classes, className || [])} {...rest}>
                <StarsRating rating={rating} disabled={disabled} onRatingClick={onChange}/>
            </div>
        );
    }

    static propTypes = {
        rating: PropTypes.number.isRequired,
        onChange: PropTypes.func,
        disabled: PropTypes.bool,
    };

    static defaultProps = {
        disabled: false,
        onChange: () => {},
    };
}