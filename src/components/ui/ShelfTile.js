import React, { Component } from 'react'
import PropTypes from 'prop-types';


const tileKindObj = {
  ORIGINAL: 0,
  EXPANDED: 1,
  FOCUSED: 2,
  MED_BLOOMED: 3,
  LG_BLOOMED: 4
};
const tileSizeArr = [
  [320, 180],	//0.303 of the largest
  [375, 211],	//0.355 (375x211) of the largest
  [590, 332],	//.559 of the largest
  [782, 440],	//.741 of the largest
  [1056, 594]
];
const waitToLargeBloomDuration	= 4;

// const initX       = 200;
// const maxTileIndex= 6;


class ShelfTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tileKind: tileKindObj.ORIGINAL,
			tileWidth: tileSizeArr[tileKindObj.ORIGINAL][0],
			tileHeight: tileSizeArr[tileKindObj.ORIGINAL][1],
			titleVisibility: 'hidden'
		}
		this.showTitle = this.showTitle.bind(this)
		this.hideTitle = this.hideTitle.bind(this)
		this.backToOrg = this.backToOrg.bind(this)
		this.toExpanded = this.toExpanded.bind(this)
	}

	componentWillMount() {
		//const startX = (props.index < 6)? initX : (initX - )
		this.style = {
			left: this.props.leftX + 'px'
		}
	}

	showTitle = () => {this.setState({titleVisibility: 'visible'})}

	hideTitle = () => {this.setState({titleVisibility: 'hidden'})}

	backToOrg = () => {
		this.hideTitle()
	}

	toExpanded = () => {
		this.showTitle()
	}

	toFocused = () => {}

	toMedBloomed = () => {}

	toLargeBloomed = () => {}

	update = (tileKind) => {
		this.setState({
			tileKind: tileKind,
			tileWidth: tileSizeArr[tileKind][0],
			tileHeight: tileSizeArr[tileKind][1]
		})
	}

	render() {
		return (
			<div className="ShelfTile" style={this.style}>
				<div className="tileImageContainer">
					<img src={this.props.imageURL} width={this.state.tileWidth} height={this.state.tileHeight} alt='tileImage'></img>
				</div>
				<div className="tileTitleContainer" style={{visibility: this.state.titleVisibility}}>
					{this.props.showTitle} 
					<span className="baseEpisodeID">{this.props.episodeID}</span>
				</div>
			</div>
		)
	}

}

ShelfTile.propTypes = {
	leftX: PropTypes.number
};

ShelfTile.defaultProps = {
	leftX: 0
};

export default ShelfTile
