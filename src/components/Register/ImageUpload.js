import React, { Component } from "react";
import PropTypes from "prop-types";
import RaisedButton from 'material-ui/RaisedButton';

export default class ImageUpload extends Component {
    constructor(props) {
        super(props);

        this.state = {
            imagePreviewUrl: ''
        };

        this._handleImageChange = this._handleImageChange.bind(this);
    }

    _handleImageChange(e) {
        e.preventDefault();

        let reader = new FileReader();
        let file = e.target.files[0];

        reader.onloadend = () => {
            this.setState({
                imagePreviewUrl: reader.result
            });

            this.props.onChange(file);
        }

        reader.readAsDataURL(file)
    }

    render() {

        const { imagePreviewUrl } = this.state;
        let { style } = this.props;

        const imgStyles = {
            objectFit: 'contain',
            height: '100%',
            width: '200px'
        };

        return (
            <div style={style}>
                <RaisedButton
                    label="בחר תמונה"
                    labelPosition="before"
                    containerElement="label">
                    <input type="file" style={{ display: 'none' }} onChange={this._handleImageChange} />
                </RaisedButton>
                {imagePreviewUrl && <img src={imagePreviewUrl} alt="img" style={imgStyles} />}
            </div>
        );
    }

    static propTyped = {
        onChange: PropTypes.func.isRequired
    };

    static defaultProps = {
        style: {}
    };
}