import React, { Component } from 'react'
import ShelfTile from './ShelfTile';
import PropTypes from 'prop-types';
import {TweenLite, Power2, Power3} from 'gsap';


const TL = TweenLite; // eslint-disable-line
const stdDuration = .5;

const shelfKindObj	= {
  BASE: 0,
  FOCUSED: 1,
  BLOOMED: 2
};

const initX         =	200;
const tileBaseWidth	= 	[320, 375, 782];                	//shelfTile: 320x180, 375x210, 782x440
const tileBaseHeight= 	[180, 210, 440];                	//shelfTile: 320x180, 375x210, 782x440
const tileBaseOffset= 	[0, 24, 58];                   		//offset between tiles adjacent
const focusedTileWidth	= 590;
const focusedTileHeight	= 332;
const bloomedTileWidth	= 1056;
const bloomedTileHeight	= 594;
// const tileShiftX 	= [0, (375-320), (782-375)]			//as the selected tile (1st in the queue) blooms, the next tiles in the queue shift by tileShiftX
// const tileOffsetX   = tileBaseWidth[shelfKindObj.BASE] + tileBaseOffset[shelfKindObj.BASE];  //distance between the beginning of previous tile to the beginning of next tile
const maxTileIndex	= 	Math.floor(1920/320);				//stageWidth/tileBaseWidth, max number of tiles in a row
// const waitToDetailDuration  =10;



class HomeShelf extends Component {
	constructor(props) {
		super(props)
		this.state = {
			shelfKind: shelfKindObj.BASE,
			isSelected: false,
			topContainerTop: this.props.y
		}
		this.tiles = []					//original tiles
		//-- prevTileIndex: tileIndexQueue[0], currentTileIndex: tileIndexQueue[1], nextTileIndex: tileIndexQueue[2], and so on
		this.tileIndexQueue = [-1]		//tile index array based on current location, from prev, current, to next etc (staring from entering no index for the prev tile)
		this.prevTile = null
		this.currTile = null
		this.nextTile = null
		this.totalTiles = props.shows.length	//-- CHECK???? totalTiles=0 case?????

		this.eachShelfTile = this.eachShelfTile.bind(this)
		this.select = this.select.bind(this)
		this.unselect = this.unselect.bind(this)
		this.opacityChange = this.opacityChange.bind(this)
	}

	componentWillMount() {
		this.topContainerStyle = {
			top: this.props.y + 'px',
			opacity: 1
		}
		//TODO: variable height

		//TODO: title style
		this.titleContainerStyle = {
			left: initX + 'px'
		}
	}

	select = () => {
		console.log("INFO HomeShelf :: select, shelf", this.props.index)
		this.setState({shelfKind: shelfKindObj.FOCUSED, isSelected:true})	//TO CHECK:: topContainerTop
		this.opacityChange(1)
		//update title size and location
		//TL.to(this.titleNode, stdDuration, {})

		//-- show the titles of unselected tiles
		const totalTiles = this.totalTiles
	    //for (var i = 1; i < totalTiles; i++) {
	      //this.tiles[i].toExpanded()
	    //}

	    //-- prev tile
	    const prevTileIndex = this.tileIndexQueue[0]
	    if (prevTileIndex != -1) {
	    	this.prevTile = this.tiles[prevTileIndex]
	    	//console.log("INFO HomeShelf :: select, prevTileIndex != -1 ever??? prevTileIndex is ", prevTileIndex)
	    	//let target = this.tiles[prevTileIndex]
	    	const prevX = initX - tileBaseWidth[shelfKindObj.FOCUSED] - tileBaseOffset[shelfKindObj.FOCUSED]
	    	//console.log("INFO HomeShelf :: select, prevX is ", prevX)
	    	console.log("INFO HomeShelf :: select, this.prevTile is ", this.prevTile)
	    	// TL.to(this.prevTile, stdDuration, {left: prevX+'px', width: tileBaseWidth[shelfKindObj.FOCUSED] + 'px', height: tileBaseHeight[shelfKindObj.FOCUSED] + 'px'})
	    	//TL.to(target, stdDuration, {left: prevX+'px'})
	    	this.prevTile.toExpanded(prevX)
	    }

	    const currTileIndex = this.tileIndexQueue[1]
	    this.currTile = this.tiles[currTileIndex]
	    console.log("INFO HomeShelf :: select, currTileIndex is ", currTileIndex)
	    console.log("INFO HomeShelf :: select, this.currTile is ", this.currTile)
	    this.currTile.toFocused()
	    //-- bloom here

	    let nextTileIndex
	    let nextX 
	    if (this.tileIndexQueue.length > 2) {
		    nextTileIndex = this.tileIndexQueue[2]
		    this.nextTile  = this.tiles[nextTileIndex]
		    nextX = initX + focusedTileWidth + tileBaseOffset[shelfKindObj.FOCUSED]
		    this.nextTile.toExpanded(nextX)

		    //-- the rest (CHECK the last one, when inited)
		    for (var j = 3; j <= totalTiles; j++) {
		    	nextTileIndex = this.tileIndexQueue[j]
		    	console.log("INFO HomeShelf :: select, nextTileIndex is ??? ", nextTileIndex)
		    	let targetTile = this.tiles[nextTileIndex]
		    	nextX += tileBaseWidth[shelfKindObj.FOCUSED] + tileBaseOffset[shelfKindObj.FOCUSED]
		    	targetTile.toExpanded(nextX)
		    }
		}
	}

	unselect = () => {
		console.log("INFO HomeShelf :: unselect, shelf", this.props.index)
		this.opacityChange(.6)
		//update title size and location
		//update each tiles

		const totalTiles = this.totalTiles
		this.tiles[0].backToOrg()
	    for (var i = 1; i < totalTiles; i++) {
	      this.tiles[i].backToOrg()
	    }
	}

	opacityChange = (val) => {
		// console.log("INFO HomeShelf :: opacityChange, opacity is ", val)
		this.topContainerStyle = {
			top: this.state.topContainerTop + 'px',
			opacity: val
		}
		// console.log("INFO HomeShelf :: opacityChange, this.topContainerStyle.opacity is ", this.topContainerStyle.opacity)
	}

	eachShelfTile(tileObj, i) {
		//const totalTiles = this.props.shows.length
		const leftX = ( (i < maxTileIndex) || (i < (this.totalTiles - 1)) )? initX + tileBaseWidth[shelfKindObj.BASE]*i : initX - tileBaseWidth[shelfKindObj.BASE];
		if (leftX < initX) {
			//-- if prev tile exists
			this.tileIndexQueue[0] = i	//-- replace '-1' with 'i'
		} else {
			this.tileIndexQueue.push(i)
		}
		return (
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
		)
	}

	render() {
		return (
			<div className="HomeShelf" 
				 id={"homeShelfContainer" + this.props.index} 
				 style={this.topContainerStyle}>
				<div className="homeShelfTitleContainer" 
					 style={this.titleContainerStyle}
					 ref={node => {this.titleNode = node}}>
					{this.props.title}
				</div>
				<div className="homeShelfTilesContainer" 
					 style={this.tileContainerStyle}>
					{this.props.shows.map(this.eachShelfTile)}
				</div>
			</div>
		)
	}
}

HomeShelf.propTypes = {
	title: PropTypes.string,
	index: PropTypes.number,
	id: PropTypes.string,
	shows: PropTypes.array,
	y: PropTypes.number
};

HomeShelf.defaultProps = {
  	title: "",
	index: 0,
	id: "HomeShelf0",
	shows: [],
	y: 62
};

export default HomeShelf