import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {TweenLite} from 'gsap';


const TL = TweenLite; // eslint-disable-line
const stdDuration = .5;
// const shortDuration = .3;
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
// const waitToLargeBloomDuration	= 4;
const toExpandedScale = Math.round(tileSizeArr[tileKindObj.EXPANDED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;		//1.17
const toFocusedScale = Math.round(tileSizeArr[tileKindObj.FOCUSED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;		//1.84
//const toMedBloomedScale = Math.round(tileSizeArr[tileKindObj.MED_BLOOMED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;	//2.44
//const toLgBloomedScale = Math.round(tileSizeArr[tileKindObj.LG_BLOOMED][0]*100/tileSizeArr[tileKindObj.ORIGINAL][0])/100;	//3.30
//console.log("INFO ShelfTile toMedBloomedScale ?? " + toMedBloomedScale);
//console.log("INFO ShelfTile toLgBloomedScale ?? " + toLgBloomedScale);



class ShelfTile extends Component {
	constructor(props) {
		super(props)
		this.state = {
			tileKind: tileKindObj.ORIGINAL
		}
		// this.showTitle = this.showTitle.bind(this)
		// this.hideTitle = this.hideTitle.bind(this)
		this.renderTitle = this.renderTitle.bind(this)
		this.updateTileKind = this.updateTileKind.bind(this)

		this.backToOrg = this.backToOrg.bind(this)
		this.toFocused = this.toFocused.bind(this)
		this.toExpanded = this.toExpanded.bind(this)
		this.toMedBloomed = this.toMedBloomed.bind(this)
		this.toLargeBloomed = this.toLargeBloomed.bind(this)
		this.showFocusedContent = this.showFocusedContent.bind(this)
		this.showBloomedContent = this.showBloomedContent.bind(this)
		this.changeXLocTo = this.changeXLocTo.bind(this)
		this.fadeInAt = this.fadeInAt.bind(this)
	}

	componentWillMount() {
		this.style = {
			left: this.props.leftX + 'px'
		}
	}

	// showTitle = () => {
	// 	// this.setState({titleVisibility: 'visible'})
	// }

	// hideTitle = () => {
	// 	// this.setState({titleVisibility: 'hidden'})
	// }

	updateTileKind = (tileKind) => {this.setState({tileKind: tileKind})}

	backToOrg = (targetX) => {
		//console.log("INFO ShelfTile :: backToOrg, index: " + this.props.index)
		this.updateTileKind(tileKindObj.ORIGINAL)
		//this.hideTitle()
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		TL.to(this.imageContainer, stdDuration, {css: { '-webkit-filter': 'brightness(1)', scale: 1 }})
	}

	toExpanded = (targetX) => {
		console.log("INFO ShelfTile :: toExpanded, index: " + this.props.index + ", targetX", targetX)
		this.updateTileKind(tileKindObj.EXPANDED)
		//this.showTitle()
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		// TL.to(this.imageContainer, stdDuration, {scale: toExpandedScale})
		TL.to(this.imageContainer, stdDuration, {css: { '-webkit-filter': 'brightness(1)', scale: toExpandedScale}})
	}

	toFocused = (targetX) => {
		console.log("INFO ShelfTile :: toFocused, targetX: " + targetX)
		this.updateTileKind(tileKindObj.FOCUSED)
		if (targetX) {
			console.log("INFO ShelfTile :: toFocused, targetX is defined : " + targetX)
			TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		}
		TL.to(this.imageContainer, stdDuration, {css: {'-webkit-filter': 'brightness(.7)', scale: toFocusedScale}, onComplete: this.showFocusedContent()})
	}

	toMedBloomed = () => {}

	toLargeBloomed = () => {}

	showFocusedContent = () => {
		TL.to(this.focusedContent, stdDuration, {delay:.2, opacity:1})
	}

	showBloomedContent = () => {
		//TL.to(this.focusedContent, stdDuration, {delay:.2, opacity:1})
	}

	changeXLocTo = (targetX) => {
		// this.style = {
		// 	left: targetX + 'px'
		// }
		TL.to(this.containerDiv, 0, {left: targetX+'px'})
	}

	fadeInAt = (targetX, pDelay) => {
		TL.to(this.containerDiv, 0, {opacity: 0, left: targetX+'px', delay:pDelay})
		TL.to(this.containerDiv, stdDuration, {opacity: 1, delay:pDelay+.1})
	}

	//style={{visibility: this.state.titleVisibility}}
	renderTitle = () => {
		// console.log("INFO ShelfTile :: renderTitle, this.state.tileKind is " + this.state.tileKind)
		switch (this.state.tileKind) {
			case tileKindObj.FOCUSED:
				return (
		         	<div className="focusedTileContent" ref={node => this.focusedContent = node}>
		         		<div className="focusedShowTitle">{this.props.showTitle}</div>
		         		<div className="focusedEpisodeTitle">{this.props.episodeTitle}</div>
		            	<div className="focusedEpisodeID">{this.props.episodeID}</div>
		          	</div>
		      	)
			case tileKindObj.EXPANDED:
				return (
			    	<div className="tileTitleContainer">
						{this.props.showTitle} <span className="baseEpisodeID">{this.props.episodeID}</span>
					</div>
				)
			case tileKindObj.LG_BLOOMED:
				//-- do something here
				return null
			default:
				return null
		}
	}

	render() {
		//if (this.props.homeShelfIndex == 0)
		//console.log("INFO ShelfTile,render, ShelfTile ", this.props.index+ ", shlefIndex is " + this.props.homeShelfIndex)
		return (
			<div className="ShelfTile"	style={{left: this.props.leftX + 'px'}} 
										ref={node => this.containerDiv = node}>
				<div className="tileImageContainer" ref={node => this.imageContainer = node}>
					<img src={this.props.imageURL} width={tileSizeArr[tileKindObj.ORIGINAL][0]} height={tileSizeArr[tileKindObj.ORIGINAL][1]} alt='tileImage'></img>
				</div>
				{this.renderTitle()}
			</div>
		)
	}//render
}

ShelfTile.propTypes = {
	index:  PropTypes.number,
	homeShelfIndex: PropTypes.number,
	showTitle: PropTypes.string,
	episodeTitle: PropTypes.string,
	episodeID: PropTypes.string,
	imageURL: PropTypes.string,
	leftX: PropTypes.number
};

ShelfTile.defaultProps = {
	leftX: 200
};

export default ShelfTile
