import React, { Component } from 'react'
import PropTypes from 'prop-types';
// import {TweenLite} from 'gsap';


// const TL = TweenLite; // eslint-disable-line

class ImageButton extends Component {
	constructor(props) {
		super(props)
		this.state = {
			isSelected: this.props.isSelected
		}
		// this.function = this.function.bind(this)
	}

	componentWillMount() {

	}

	onClick = (e) => {
		console.log("INFO ImageButton :: onClick")
		this.setState({isSelected: !this.state.isSelected})
		this.props.onClick(e)
	}

	render() {
		return (
			<span style={{position:'absolute', top:this.props.top + 'px', left:this.props.left + 'px'}}>
				<img 	src={(this.state.isSelected === true) ? this.props.selectedImageURL : this.props.imageURL}
						alt={this.props.id} 
						onClick={this.onClick} />
			</span>
		)
	}//render
}

ImageButton.propTypes = {
	imageURL: PropTypes.string,
	selectedImageURL: PropTypes.string,
	id: PropTypes.string,
	onClick: PropTypes.func,
	top: PropTypes.number,
	left: PropTypes.number,
	isSelected: PropTypes.bool
};

ImageButton.defaultProps = {
    onClick: () => {}
};

export default ImageButton