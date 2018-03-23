import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {TweenLite, Power2, Power3} from 'gsap';


const TL = TweenLite; // eslint-disable-line
const stdDuration = .5;
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
		this.toFocused = this.toFocused.bind(this)
		//this.updateToFocused = this.updateToFocused.bind(this)
	}

	componentWillMount() {
		this.style = {
			left: this.props.leftX + 'px'
		}
	}

	showTitle = () => {this.setState({titleVisibility: 'visible'})}

	hideTitle = () => {this.setState({titleVisibility: 'hidden'})}

	backToOrg = () => {
		this.hideTitle()
	}

	toMedBloomed = () => {}

	toLargeBloomed = () => {}

	update = (tileKind) => {
		this.setState({
			tileKind: tileKind,
			tileWidth: tileSizeArr[tileKind][0],
			tileHeight: tileSizeArr[tileKind][1]
		})
	}

	toFocused = () => {
		console.log("INFO ShelfTile :: toFocused, index: " + this.props.index)
		this.setState ({
			tileKind: tileKindObj.FOCUSED,
			tileWidth: tileSizeArr[tileKindObj.FOCUSED][0],
			tileHeight: tileSizeArr[tileKindObj.FOCUSED][1]
		})

		//CHECK!!!! registration point, title location & alpha change
		TL.to(this.imageContainer, stdDuration, {width: this.state.tileWidth + 'px', height: this.state.tileHeight + 'px'})
	}

	toExpanded = (targetX) => {
		console.log("INFO ShelfTile :: toExpanded, index: " + this.props.index + " targetX", targetX)
		this.setState ({
			tileKind: tileKindObj.EXPANDED,
			tileWidth: tileSizeArr[tileKindObj.EXPANDED][0],
			tileHeight: tileSizeArr[tileKindObj.EXPANDED][1]
		})
		this.showTitle()
		//CHECK!!!! registration point, title location & alpha change
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		TL.to(this.imageContainer, stdDuration, {width: this.state.tileWidth + 'px', height: this.state.tileHeight + 'px'})
	}

	render() {
		if (this.props.homeShelfIndex == 0)
		console.log("INFO ShelfTile,render, ShelfTile ", this.props.index+ ", shlefIndex is " + this.props.homeShelfIndex)
		return (
			<div className="ShelfTile"	style={{left: this.props.leftX + 'px'}} 
										ref={node => this.containerDiv = node}>
				<div className="tileImageContainer" ref={node => this.imageContainer = node}>
					<img src={this.props.imageURL} width={this.state.tileWidth} height={this.state.tileHeight} alt='tileImage'></img>
				</div>
				<div className="tileTitleContainer"	ref={node => this.titleContainer = node} 
													style={{visibility: this.state.titleVisibility}}>
					{this.props.showTitle} <span className="baseEpisodeID">{this.props.episodeID}</span>
				</div>
			</div>
		)
	}

}


// <ShelfTile 	key={(i + 1).toString()}
// 				  		index={i}
// 				  		showTitle={tileObj.showTitle}
// 				  		episodeTitle={tileObj.episodeTitle}
// 				  		episodeID={tileObj.episode}
// 				  		imageURL={tileObj.imageURL}
// 				  		leftX={leftX} 
// 				  		ref={node => this.tiles.push(node)}>

ShelfTile.propTypes = {
	index:  PropTypes.number,
	homeShelfIndex: PropTypes.number,
	leftX: PropTypes.number
};

ShelfTile.defaultProps = {
	leftX: 0
};

export default ShelfTile
