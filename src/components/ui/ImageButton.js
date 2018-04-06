import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import {TweenLite} from 'gsap';


// const TL = TweenLite; // eslint-disable-line

class ImageButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
		}
		// this.function = this.function.bind(this)
	}

	componentWillMount() {

	}

	onClick = (e) => {
		console.log("INFO ImageButton :: onClick")
		this.props.onClick(e)
	}

	render() {
		return (
			<button>
				<img src={this.props.imageURL} alt={this.props.id} onClick={this.onClick} />
			</button>
		)
	}//render
}

ImageButton.propTypes = {
	imageURL: PropTypes.string,
	id: PropTypes.string,
	onClick: PropTypes.func
};

ImageButton.defaultProps = {
    onClick: () => {}
};

export default ImageButton