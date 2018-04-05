import React, { Component } from 'react'
import PropTypes from 'prop-types';
import {TweenLite} from 'gsap';


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
		this.bloomToLargeTimerID = null
		this.renderContent = this.renderContent.bind(this)
		this.updateTileKind = this.updateTileKind.bind(this)

		this.backToOrg = this.backToOrg.bind(this)
		this.toFocused = this.toFocused.bind(this)
		this.toExpanded = this.toExpanded.bind(this)
		this.toMedBloomed = this.toMedBloomed.bind(this)
		this.toLargeBloomed = this.toLargeBloomed.bind(this)
		this.showFocusedContent = this.showFocusedContent.bind(this)
		this.hideFocusedContent = this.hideFocusedContent.bind(this)
		this.showBloomedContent = this.showBloomedContent.bind(this)
		this.waitToLargeBloom = this.waitToLargeBloom.bind(this)
		this.killToLargeBloom = this.killToLargeBloom.bind(this)
		this.changeXLocTo = this.changeXLocTo.bind(this)
		this.fadeInAt = this.fadeInAt.bind(this)
	}

	componentWillMount() {
		this.style = {
			left: this.props.leftX + 'px'
		}
	}

	// showTitle = () => this.setState({titleVisibility: 'visible'})
	// hideTitle = () => this.setState({titleVisibility: 'hidden'})

	updateTileKind = (tileKind) => {
		//console.log("INFO ShelfTile :: updateTileKind, episodeID: " + this.props.episodeID)
		if (tileKind !== this.state.tileKind) this.setState({tileKind: tileKind})
	}

	backToOrg = (targetX) => {
		//console.log("INFO ShelfTile :: backToOrg, index: " + this.props.index)
		this.updateTileKind(tileKindObj.ORIGINAL)
		//this.hideTitle()
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		TL.to(this.imageContainer, stdDuration, {css: { '-webkit-filter': 'brightness(1)', scale: 1 }})
	}//backToOrg

	toExpanded = (targetX, noScale=false, pDuration=stdDuration) => {
		// if (this.props.index <= 3) {
		// 	console.log("INFO ShelfTile :: toExpanded, index: " + this.props.index + ", " + this.props.episodeID + ", x: " + targetX + ", noScale? " + noScale)
		// }
		this.updateTileKind(tileKindObj.EXPANDED)
		//this.showTitle()
		TL.to(this.containerDiv, pDuration, {left: targetX+'px'})
		
		if (noScale) {
			TL.to(this.imageContainer, pDuration, {css: { '-webkit-filter': 'brightness(1)'}})
		} else {
			TL.to(this.imageContainer, pDuration, {css: { '-webkit-filter': 'brightness(1)', scale: toExpandedScale}})
		}
	}//toExpanded

	toFocused = (targetX = undefined) => {
		// if (this.props.index <= 3) {
		// 	console.log("INFO ShelfTile :: toFocused, index: " + this.props.index + ", " + this.props.episodeID + ", x: " + targetX)
		// }
		this.killToLargeBloom()
		this.updateTileKind(tileKindObj.FOCUSED)
		if (targetX !== undefined) {
			TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})
		}
		//.7 to .5
		TL.to(this.imageContainer, stdDuration, {css: {'-webkit-filter': 'brightness(.5)', scale: toFocusedScale}, onComplete: this.showFocusedContent()})
	}//toFocused

	toMedBloomed = (targetX, noScale=false, pDuration=stdDuration) => {
		console.log("INFO ShelfTile :: toMedBloomed")

		this.updateTileKind(tileKindObj.MED_BLOOMED)
		TL.to(this.containerDiv, stdDuration, {left: targetX+'px'})

		if (noScale) {
			TL.to(this.imageContainer, pDuration, {css: { '-webkit-filter': 'brightness(1)'}})
		} else {
			TL.to(this.imageContainer, pDuration, {css: {'-webkit-filter': 'brightness(1)', scale: toMedBloomedScale}})
		}
	}//toMedBloomed

	toLargeBloomed = () => {
		console.log("INFO ShelfTile :: toLargeBloomed, LARGEBLOOMED!!!!!!")

		this.killToLargeBloom()
		this.updateTileKind(tileKindObj.LG_BLOOMED)
		this.props.callBackOnLargeBloomStart()
		TL.to(this.imageContainer, stdDuration, {css: {scale: toLgBloomedScale}, onComplete: this.showBloomedContent()})
	}//toLargeBloomed

	showFocusedContent = () => { TL.to(this.focusedContent, stdDuration, {delay:.2, opacity:1, onComplete: this.waitToLargeBloom()}) }

	hideFocusedContent = () => { TL.to(this.focusedContent, 0, {opacity:0}) }

	showBloomedContent = () => {
		console.log("INFO ShelfTile :: showBloomedContent")
		TL.to(this.bloomedContent, stdDuration, {delay:stdDuration, css: {visibility: 'visible', opacity: 1}})
	}//showBloomedContent

	waitToLargeBloom = () => {
		this.killToLargeBloom()
		this.bloomToLargeTimerID = setTimeout(() => this.toLargeBloomed(), waitToLargeBloomDuration*1000)
	}//waitToLargeBloom

	killToLargeBloom = () => { if (this.bloomToLargeTimerID !== null) clearTimeout(this.bloomToLargeTimerID) }

	changeXLocTo = (targetX) => { TL.to(this.containerDiv, 0, {left: targetX+'px'}) }

	fadeInAt = (targetX, pDelay=0, pDuration=stdDuration) => {
		TL.to(this.containerDiv, 0, {opacity: 0, left: targetX+'px', delay:pDelay})	//CHECK
		TL.to(this.containerDiv, pDuration, {opacity: 1, delay:pDelay+.1})
	}//fadeInAt

	renderContent = () => {
		console.log("INFO ShelfTile :: renderContent, this.state.tileKind is " + this.state.tileKind)
		switch (this.state.tileKind) {
			case tileKindObj.EXPANDED:
				return (
			    	<div className="expandedTileContent">
					{this.props.episodeID}  <span className="baseEpisodeID">{this.props.showTitle}</span>
					</div>
				)
			case tileKindObj.FOCUSED:
				return (
		         	<div className="focusedTileContent" ref={node => this.focusedContent = node}>
		         		<div className="focusedShowTitle">{this.props.showTitle}</div>
		         		<div className="focusedEpisodeTitle">{this.props.episodeTitle}</div>
		            	<div className="focusedEpisodeID">{this.props.episodeID}</div>
		          	</div>
		      	)
			case tileKindObj.LG_BLOOMED:
				//-- do something here
				return (
		         	<div className="bloomedTileContent" ref={node => this.bloomedContent = node}>
		         		<div className="bloomedShowTitle">{this.props.showTitle}</div>
		         		<div className="bloomedEpisodeTitle">{this.props.episodeTitle}</div>
		            	<div className="bloomedEpisodeID">{this.props.episodeID}&nbsp;<span className="bloomedEpisodeDesc">{this.props.episodeDesc}</span></div>
		          	</div>
		      	)
		    case tileKindObj.MED_BLOOMED:
		    	console.log("ever????????????")
		    	break; default:
				return null
		}
	}//renderTitle

	render() {
		return (
			<div className="ShelfTile"	style={{left: this.props.leftX + 'px'}} 
										ref={node => this.containerDiv = node}>
				<div className="tileImageContainer" ref={node => this.imageContainer = node}>
					<img src={this.props.imageURL} width={tileSizeArr[tileKindObj.ORIGINAL][0]} height={tileSizeArr[tileKindObj.ORIGINAL][1]} alt='tileImage'></img>
				</div>
				{this.renderContent()}
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
	episodeDesc: PropTypes.string,
	imageURL: PropTypes.string,
	leftX: PropTypes.number
};

ShelfTile.defaultProps = {
	leftX: 200
};

export default ShelfTile
