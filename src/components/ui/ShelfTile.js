import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {TweenLite, Power3} from 'gsap';


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
const toExpandedScale = Math.round(tileSizeArr[tileKindObj.EXPANDED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;		//1.17
const toFocusedScale = Math.round(tileSizeArr[tileKindObj.FOCUSED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;		//1.84
const toMedBloomedScale = Math.round(tileSizeArr[tileKindObj.MED_BLOOMED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;	//2.44
const toLgBloomedScale = Math.round(tileSizeArr[tileKindObj.LG_BLOOMED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;	//3.30
console.log("INFO ShelfTile toMedBloomedScale ?? " + toMedBloomedScale);
console.log("INFO ShelfTile toLgBloomedScale ?? " + toLgBloomedScale);



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
		this.toFocused = this.toFocused.bind(this)
		this.toExpanded = this.toExpanded.bind(this)
		this.updateTileKind = this.updateTileKind.bind(this)
		this.renderTitle = this.renderTitle.bind(this)
		this.showFocusedOverlay = this.showFocusedOverlay.bind(this)
	}

	componentWillMount() {
		this.style = {
			left: this.props.leftX + 'px'
		}
	}

	showTitle = () => {this.setState({titleVisibility: 'visible'})}

	hideTitle = () => {this.setState({titleVisibility: 'hidden'})}

	updateTileKind = (tileKind) => {this.setState({tileKind: tileKind})}

	backToOrg = (targetX) => {
		//console.log("INFO ShelfTile :: backToOrg, index: " + this.props.index)
		this.updateTileKind(tileKindObj.ORIGINAL)
		//this.hideTitle()
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		TL.to(this.imageContainer, stdDuration, {css: { '-webkit-filter': 'brightness(1)', scale: 1 }})
	}

	toExpanded = (targetX) => {
		//console.log("INFO ShelfTile :: toExpanded, index: " + this.props.index + ", targetX", targetX)
		this.updateTileKind(tileKindObj.EXPANDED)
		//this.showTitle()
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		TL.to(this.imageContainer, stdDuration, {scale: toExpandedScale})
	}

	toFocused = () => {
		//console.log("INFO ShelfTile :: toFocused, index: " + this.props.index)
		this.updateTileKind(tileKindObj.FOCUSED)
		//-- TODO: render overlay on top of the image
		TL.to(this.imageContainer, stdDuration, {css: {'-webkit-filter': 'brightness(.7)', scale: toFocusedScale}, onComplete: this.showFocusedOverlay()})
	}

	toMedBloomed = () => {}

	toLargeBloomed = () => {}

	showFocusedOverlay = () => {}

	//style={{visibility: this.state.titleVisibility}}
	renderTitle = () => {
		console.log("INFO ShelfTile :: renderTitle, this.state.tileKind is " + this.state.tileKind)
		switch (this.state.tileKind) {
			case tileKindObj.FOCUSED:
				return (
		         	<div className="focusedTileContent">
		         		<div className="focusedShowTitle">{this.props.showTitle}</div>
		         		<div className="focusedEpisodeTitle">{this.props.episodeTitle}</div>
		            	<div className="focusedEpisodeID">{this.props.episodeID}</div>
		          	</div>
		      	)
				break
			case tileKindObj.EXPANDED:
				return (
			    	<div className="tileTitleContainer">
						{this.props.showTitle} <span className="baseEpisodeID">{this.props.episodeID}</span>
					</div>
				)
				break
			default:
		}
	}

	render() {
		//if (this.props.homeShelfIndex == 0)
		//console.log("INFO ShelfTile,render, ShelfTile ", this.props.index+ ", shlefIndex is " + this.props.homeShelfIndex)
		return (
			<div className="ShelfTile"	style={{left: this.props.leftX + 'px'}} 
										ref={node => this.containerDiv = node}>
				<div className="tileImageContainer" ref={node => this.imageContainer = node}>
					<img src={this.props.imageURL} width={this.state.tileWidth} height={this.state.tileHeight} alt='tileImage'></img>
				</div>
				{this.renderTitle()}
			</div>
		)
	}//render
}

/*
<ShelfTile 	key={(i + 1).toString()}
				  		index={i}
				  		showTitle={tileObj.showTitle}
				  		episodeTitle={tileObj.episodeTitle}
				  		episodeID={tileObj.episode}
				  		imageURL={tileObj.imageURL}
				  		leftX={leftX} 
				  		homeShelfIndex={this.props.index}
				  		ref={node => this.tiles.push(node)}>
		    </ShelfTile>
*/

ShelfTile.propTypes = {
	index:  PropTypes.number,
	homeShelfIndex: PropTypes.number,
	leftX: PropTypes.number
};

ShelfTile.defaultProps = {
	leftX: 0
};

export default ShelfTile
